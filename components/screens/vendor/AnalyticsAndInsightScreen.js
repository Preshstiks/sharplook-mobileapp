import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-gifted-charts";
import { HttpClient } from "../../../api/HttpClient";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";
import { EmptyData } from "../../reusuableComponents/EmptyData";
import { formatAmount } from "../../formatAmount";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = Array.from({ length: 11 }, (_, i) => 2020 + i); // 2020-2030

export default function AnalyticsAndInsightScreen({ navigation }) {
  const [showPicker, setShowPicker] = useState(false);
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1
  ); // getMonth() is 0-indexed
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [tempMonth, setTempMonth] = useState(currentDate.getMonth() + 1);
  const [tempYear, setTempYear] = useState(currentDate.getFullYear());

  const { user } = useAuth();
  const vendorId = user.id;

  // Skeleton animation
  const shimmerAnim = new Animated.Value(0);

  useEffect(() => {
    const startShimmer = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    if (loading) {
      startShimmer();
    }
  }, [loading, shimmerAnim]);

  const handleOpenPicker = () => {
    setTempMonth(selectedMonth);
    setTempYear(selectedYear);
    setShowPicker(true);
  };

  const handleDone = () => {
    setSelectedMonth(tempMonth);
    setSelectedYear(tempYear);
    setShowPicker(false);
  };

  const prepareChartData = () => {
    if (!analytics?.recentEarnings || analytics.recentEarnings.length === 0) {
      // Return default/empty data when no earnings
      return [
        { value: 0, label: "" },
        { value: 0, label: "" },
        { value: 0, label: "" },
        { value: 0, label: "" },
        { value: 0, label: "" },
        { value: 0, label: "" },
      ];
    }

    // Group earnings by day/week/month depending on your needs
    const chartData = analytics.recentEarnings.map((earning, index) => ({
      value: earning.amount / 1000, // Convert to thousands for better chart display
      label: "",
    }));

    // If you want to show daily totals for the last 10 days
    return chartData.slice(0, 10); // Limit to 10 data points
  };

  // Alternative: If your API returns daily/monthly revenue data
  const prepareChartDataFromRevenue = () => {
    if (!analytics?.dailyRevenue || analytics.dailyRevenue.length === 0) {
      return Array.from({ length: 10 }, (_, i) => ({
        value: 0,
        label: (i + 1).toString(),
      }));
    }

    return analytics.dailyRevenue.map((day, index) => ({
      value: day.revenue / 1000,
      label: day.day || (index + 1).toString(),
    }));
  };
  const windowWidth = Dimensions.get("window").width;
  const pickerItemHeight = 40;
  const visibleItems = 5;
  const pickerHeight = pickerItemHeight * visibleItems;

  useFocusEffect(
    useCallback(() => {
      const fetchAnalytics = async () => {
        try {
          setLoading(true);
          const response = await HttpClient.get(
            `/vendor/analytics/${vendorId}`
          );
          setAnalytics(response.data.data);
        } catch (error) {
          console.error("Failed to fetch analytics:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAnalytics();
    }, [])
  );

  // Skeleton Loader Component
  const SkeletonBox = ({ width, height, style }) => {
    const animatedOpacity = shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    });

    return (
      <Animated.View
        style={[
          {
            width,
            height,
            backgroundColor: "#E1E9EE",
            borderRadius: 8,
            opacity: animatedOpacity,
          },
          style,
        ]}
      />
    );
  };
  const TransactionSummarySkeleton = () => (
    <View className="flex-row mb-6">
      <View
        className="flex-1 bg-gray-200 rounded-xl mr-2 py-4 items-center"
        style={{ backgroundColor: "#F3F4F6" }}
      >
        <SkeletonBox width={80} height={12} style={{ marginBottom: 8 }} />
        <SkeletonBox width={30} height={24} />
      </View>
      <View
        className="flex-1 bg-gray-200 rounded-xl mr-2 py-4 items-center"
        style={{ backgroundColor: "#F3F4F6" }}
      >
        <SkeletonBox width={80} height={12} style={{ marginBottom: 8 }} />
        <SkeletonBox width={40} height={24} />
      </View>
      <View
        className="flex-1 bg-gray-200 rounded-xl py-4 items-center"
        style={{ backgroundColor: "#F3F4F6" }}
      >
        <SkeletonBox width={90} height={12} style={{ marginBottom: 8 }} />
        <SkeletonBox width={20} height={24} />
      </View>
    </View>
  );

  const RecentEarningsSkeleton = () => (
    <View className="mb-4">
      {[...Array(4)].map((_, index) => (
        <View key={index} className="flex-row items-center mb-3">
          <SkeletonBox width={20} height={20} style={{ borderRadius: 10 }} />
          <View className="ml-2 flex-1">
            <SkeletonBox width={60} height={14} style={{ marginBottom: 4 }} />
            <SkeletonBox width={80} height={12} />
          </View>
          <View className="items-end">
            <SkeletonBox width={90} height={14} style={{ marginBottom: 4 }} />
            <SkeletonBox width={70} height={12} />
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View className="flex-1 bg-[#FFFAFD]">
      {/* Header */}
      <View className="pt-[60px] pb-3 px-4 bg-white shadow-sm flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text
          className="flex-1 text-center text-[14px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Analytics and Insight
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* Chart Card */}
        <View className="bg-white rounded-2xl border border-[#ED2584] mt-6 mb-6 p-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text
              className="text-[12px] text-[#ED2584]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Purchase
            </Text>
            <TouchableOpacity
              className="bg-[#ED2584] px-3 py-1 rounded-lg flex-row items-center"
              onPress={handleOpenPicker}
            >
              <Text
                className="text-white text-[12px] mr-1"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {months[selectedMonth - 1]} {selectedYear}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Modal
            visible={showPicker}
            transparent
            animationType="fade"
            onRequestClose={() => setShowPicker(false)}
          >
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.pickerContainer,
                  { width: windowWidth * 0.8, height: pickerHeight + 60 },
                ]}
              >
                <View style={styles.pickerHeader}>
                  <Text style={styles.pickerTitle}>Select Month & Year</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    position: "relative",
                  }}
                >
                  {/* Month Wheel */}
                  <ScrollView
                    style={{ height: pickerHeight, width: "50%" }}
                    contentContainerStyle={{
                      alignItems: "center",
                      paddingVertical: pickerHeight / 2 - pickerItemHeight / 2,
                    }}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={pickerItemHeight}
                    decelerationRate="fast"
                    onMomentumScrollEnd={(e) => {
                      const idx = Math.round(
                        e.nativeEvent.contentOffset.y / pickerItemHeight
                      );
                      setTempMonth(idx + 1);
                    }}
                    contentOffset={{ y: (tempMonth - 1) * pickerItemHeight }}
                  >
                    {months.map((month, idx) => (
                      <View
                        key={month}
                        style={{
                          height: pickerItemHeight,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={[
                            styles.pickerItem,
                            tempMonth === idx + 1 && styles.selectedItem,
                          ]}
                        >
                          {month}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>

                  {/* Year Wheel */}
                  <ScrollView
                    style={{ height: pickerHeight, width: "50%" }}
                    contentContainerStyle={{
                      alignItems: "center",
                      paddingVertical: pickerHeight / 2 - pickerItemHeight / 2,
                    }}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={pickerItemHeight}
                    decelerationRate="fast"
                    onMomentumScrollEnd={(e) => {
                      const idx = Math.round(
                        e.nativeEvent.contentOffset.y / pickerItemHeight
                      );
                      setTempYear(years[idx]);
                    }}
                    contentOffset={{
                      y: years.indexOf(tempYear) * pickerItemHeight,
                    }}
                  >
                    {years.map((year, idx) => (
                      <View
                        key={year}
                        style={{
                          height: pickerItemHeight,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={[
                            styles.pickerItem,
                            tempYear === year && styles.selectedItem,
                          ]}
                        >
                          {year}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>

                  {/* Highlight overlay - positioned absolutely */}
                  <View
                    pointerEvents="none"
                    style={[
                      styles.highlight,
                      {
                        position: "absolute",
                        top: pickerHeight / 2 - pickerItemHeight / 2,
                        height: pickerItemHeight,
                        width: "100%",
                      },
                    ]}
                  />
                </View>
                <TouchableOpacity
                  className="bg-primary"
                  style={styles.doneButton}
                  onPress={handleDone}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Text
            className="text-[18px] text-[#ED2584] mb-2"
            style={{ fontFamily: "latoBold" }}
          >
            {formatAmount(analytics?.totalRevenue)}
          </Text>

          <LineChart
            data={loading ? [] : prepareChartData()}
            width={300}
            height={120}
            color="#ED2584"
            curved
            areaChart
            startFillColor="rgba(237, 37, 132, 0.3)"
            endFillColor="rgba(237, 37, 132, 0.05)"
            startOpacity={0.3}
            endOpacity={0.05}
            hideDataPoints
            hideAxesAndRules
            hideYAxisText
            xAxisColor="transparent"
            yAxisColor="transparent"
            xAxisLabelTextStyle={{
              color: "#ED2584",
              fontSize: 12,
            }}
            thickness={3}
            animateOnDataChange
            animationDuration={1000}
          />
        </View>

        {/* Transaction Summary */}
        <Text
          className="text-[16px] mb-2"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Transaction Summary
        </Text>

        {/* Show skeleton or actual content based on loading state */}
        {loading ? (
          <TransactionSummarySkeleton />
        ) : (
          <View className="flex-row mb-6">
            <View className="flex-1 bg-[#ED2584] rounded-xl mr-2 py-4 items-center">
              <Text
                className="text-white text-[12px] mb-1"
                style={{ fontFamily: "poppinsRegular" }}
              >
                New Booking
              </Text>
              <Text
                className="text-white text-[20px]"
                style={{ fontFamily: "latoBold" }}
              >
                {analytics?.newBookingsCount}
              </Text>
            </View>
            <View className="flex-1 bg-[#ED2584] rounded-xl mr-2 py-4 items-center">
              <Text
                className="text-white text-[12px] mb-1"
                style={{ fontFamily: "poppinsRegular" }}
              >
                Product Sold
              </Text>
              <Text
                className="text-white text-[20px]"
                style={{ fontFamily: "latoBold" }}
              >
                {analytics?.totalUnitsSold}
              </Text>
            </View>
            <View className="flex-1 bg-[#ED2584] rounded-xl py-4 items-center">
              <Text
                className="text-white text-[12px] mb-1"
                style={{ fontFamily: "poppinsRegular" }}
              >
                Complain/Return
              </Text>
              <Text
                className="text-white text-[20px]"
                style={{ fontFamily: "latoBold" }}
              >
                {analytics?.disputesCount}
              </Text>
            </View>
          </View>
        )}

        {/* Recent Earnings */}
        <Text
          className="text-[16px] mb-2"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Recent Earnings
        </Text>

        {/* Show skeleton or actual content for Recent Earnings */}
        {loading ? (
          <RecentEarningsSkeleton />
        ) : analytics.recentEarnings.length === 0 ? (
          <EmptyData msg="No recent earnings." />
        ) : (
          <View className="mb-4">
            {/* Earning Item */}
            <View className="flex-row items-center mb-3">
              <Ionicons name="checkmark-circle" size={20} color="#ED2584" />
              <View className="ml-2 flex-1">
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "latoBold" }}
                >
                  #35674
                </Text>
                <Text
                  className="text-[12px] text-[#00000099]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  Raji Balikis
                </Text>
              </View>
              <View className="items-end">
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "latoBold" }}
                >
                  ₦210,000.00
                </Text>
                <Text
                  className="text-[12px] text-[#00000099]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  30 mins ago
                </Text>
              </View>
            </View>
            <View className="flex-row items-center mb-3">
              <Ionicons name="time-outline" size={20} color="#ED2584" />
              <View className="ml-2 flex-1">
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "latoBold" }}
                >
                  #35674
                </Text>
                <Text
                  className="text-[12px] text-[#00000099]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  Akash mira
                </Text>
              </View>
              <View className="items-end">
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "latoBold" }}
                >
                  ₦210,000.00
                </Text>
                <Text
                  className="text-[12px] text-[#00000099]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  1 hr ago
                </Text>
              </View>
            </View>
            <View className="flex-row items-center mb-3">
              <Ionicons name="checkmark-circle" size={20} color="#ED2584" />
              <View className="ml-2 flex-1">
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "latoBold" }}
                >
                  #35674
                </Text>
                <Text
                  className="text-[12px] text-[#00000099]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  Raji Balikis
                </Text>
              </View>
              <View className="items-end">
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "latoBold" }}
                >
                  ₦210,000.00
                </Text>
                <Text
                  className="text-[12px] text-[#00000099]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  30 mins ago
                </Text>
              </View>
            </View>
            <View className="flex-row items-center mb-3">
              <Ionicons name="time-outline" size={20} color="#ED2584" />
              <View className="ml-2 flex-1">
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "latoBold" }}
                >
                  #35674
                </Text>
                <Text
                  className="text-[12px] text-[#00000099]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  Akash mira
                </Text>
              </View>
              <View className="items-end">
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "latoBold" }}
                >
                  ₦210,000.00
                </Text>
                <Text
                  className="text-[12px] text-[#00000099]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  1 hr ago
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pickerHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  pickerTitle: {
    paddingBottom: 60,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  pickerItem: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  selectedItem: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  highlight: {
    // This will be overridden by inline styles in the component
  },
  doneButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
