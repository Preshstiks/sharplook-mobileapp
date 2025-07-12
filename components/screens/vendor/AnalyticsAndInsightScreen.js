import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-gifted-charts";

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
  const [selectedMonth, setSelectedMonth] = useState(1); // 1 = January
  const [selectedYear, setSelectedYear] = useState(2024);

  const [tempMonth, setTempMonth] = useState(selectedMonth);
  const [tempYear, setTempYear] = useState(selectedYear);

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

  const data = [
    { value: 20, label: "1" },
    { value: 45, label: "2" },
    { value: 28, label: "3" },
    { value: 80, label: "4" },
    { value: 99, label: "5" },
    { value: 43, label: "6" },
    { value: 50, label: "7" },
    { value: 85, label: "8" },
    { value: 30, label: "9" },
    { value: 70, label: "10" },
  ];

  const windowWidth = Dimensions.get("window").width;
  const pickerItemHeight = 40;
  const visibleItems = 5;
  const pickerHeight = pickerItemHeight * visibleItems;

  return (
    <View className="flex-1 bg-[#FFFAFD]">
      {/* Header */}
      <View className="pt-[60px] pb-3 px-4 bg-white shadow-sm flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text
          className="flex-1 text-center text-[18px]"
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
            ₦210,000.00
          </Text>

          <LineChart
            data={data}
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
              3
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
              120
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
              3
            </Text>
          </View>
        </View>
        {/* Recent Earnings */}
        <Text
          className="text-[16px] mb-2"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Recent Earnings
        </Text>
        <View className="mb-4">
          {/* Earning Item */}
          <View className="flex-row items-center mb-3">
            <Ionicons name="checkmark-circle" size={20} color="#ED2584" />
            <View className="ml-2 flex-1">
              <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
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
              <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
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
              <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
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
              <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
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
              <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
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
              <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
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
              <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
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
              <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
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
    backgroundColor: "#007AFF",
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
