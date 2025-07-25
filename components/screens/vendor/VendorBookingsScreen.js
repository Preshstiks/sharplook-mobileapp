import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../../context/AuthContext";
import { HttpClient } from "../../../api/HttpClient";
import EmptySVG from "../../../assets/img/empty.svg";
import { ActivityIndicator } from "react-native";
import { formatAmount } from "../../formatAmount";
import { HexConverter } from "../../reusuableComponents/HexConverter";
import { DateConverter } from "../../reusuableComponents/DateConverter";
const bookings = [
  {
    id: "32145",
    client: "Raji Balikis",
    amount: 188528,
    status: "Pending",
    date: "July 17th",
    time: "09:30AM",
  },
  {
    id: "32146",
    client: "Alimosho",
    amount: 202000,
    status: "Completed",
    date: "July 17th",
    time: "09:30AM",
  },
  {
    id: "32147",
    client: "James",
    amount: 12528,
    status: "Pending",
    date: "July 17th",
    time: "09:30AM",
  },
  {
    id: "32148",
    client: "Precious",
    amount: 60000,
    status: "Completed",
    date: "July 17th",
    time: "09:30AM",
  },
];

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      {[1, 2, 3].map((_, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#f3f3f3",
            borderRadius: 12,
            marginBottom: 16,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#e0e0e0",
              marginRight: 12,
            }}
          />
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: "60%",
                height: 14,
                borderRadius: 7,
                backgroundColor: "#e0e0e0",
                marginBottom: 6,
              }}
            />
            <View
              style={{
                width: "40%",
                height: 12,
                borderRadius: 6,
                backgroundColor: "#e0e0e0",
              }}
            />
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{
                width: 60,
                height: 12,
                borderRadius: 6,
                backgroundColor: "#e0e0e0",
                marginBottom: 4,
              }}
            />
            <View
              style={{
                width: 40,
                height: 14,
                borderRadius: 7,
                backgroundColor: "#e0e0e0",
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

export default function VendorBookingsScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchBookings = async () => {
        setLoading(true);
        try {
          const res = await HttpClient.get("/bookings/getBookings");
          // Transform bookings to match UI expectations
          const transformed = (res.data?.data || []).map((b) => ({
            id: b.id,
            date: b.date,
            time: b.time,
            status: b.status,
            amount: b.totalAmount || b.price || 0,
            client:
              b.client?.name ||
              b.clientName ||
              b.client?.fullName ||
              b.clientId ||
              "Unknown",
          }));
          setBookings(transformed);
        } catch (err) {
          setBookings([]);
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    }, [])
  );

  const filteredBookings = bookings.filter((b) => {
    if (tab === "ALL") return true;
    return b.status === tab;
  });

  const totalBookings = bookings.length;
  const totalAmount = bookings.reduce((sum, b) => sum + b.amount, 0);
  console.log({ bookings });
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary pt-[60px] pb-4 px-4">
        <View className="flex-row items-center mb-2">
          <Image
            source={
              user?.avatar
                ? { uri: user.avatar }
                : require("../../../assets/icon/avatar.png")
            }
            style={{ width: 40, height: 40, borderRadius: 25 }}
          />
          <View className="ml-3 flex-1">
            <Text
              style={{ fontFamily: "poppinsMedium" }}
              className="text-white text-[16px]"
            >
              {user?.vendorOnboarding?.businessName}
            </Text>
            <Text
              className="text-white text-[12px] opacity-80"
              style={{ fontFamily: "poppinsRegular" }}
            >
              <Ionicons name="location-sharp" size={12} color="white" />
              {"  "}
              {user?.vendorOnboarding?.location}
            </Text>
          </View>
        </View>
      </View>
      {/* Summary */}
      <View
        className="bg-white mx-4 rounded-2xl p-5 mt-[-10px] mb-4 flex-row justify-between"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View className="flex-1 items-center">
          <Text
            className="text-[12px] text-[#A5A5A5]"
            style={{ fontFamily: "latoRegular" }}
          >
            Total Bookings
          </Text>
          <Text className="text-[18px] mt-1" style={{ fontFamily: "latoBold" }}>
            {totalBookings}
          </Text>
        </View>
        <View className="w-[1px] bg-[#FDE9F4] mx-4" />
        <View className="flex-1 items-center">
          <Text
            className="text-[12px] text-[#A5A5A5]"
            style={{ fontFamily: "latoRegular" }}
          >
            Total Amount
          </Text>
          <Text className="text-[18px] mt-1" style={{ fontFamily: "latoBold" }}>
            {formatAmount(totalAmount)}
          </Text>
        </View>
      </View>
      {/* Tabs */}
      <View className="flex-row justify-between mb-2 px-4 gap-3">
        {["ALL", "COMPLETED", "PENDING"].map((t) => (
          <Pressable
            key={t}
            className={`px-6 py-[10px] rounded-[8px] ${tab === t ? "bg-primary" : "bg-white border border-[#FCDFEE]"}`}
            onPress={() => setTab(t)}
          >
            <Text
              style={{ fontFamily: "latoBold" }}
              className={`text-[12px] uppercase ${tab === t ? "text-white" : "text-fadedDark"}`}
            >
              {t.charAt(0) + t.slice(1).toLowerCase()}
            </Text>
          </Pressable>
        ))}
      </View>
      {/* Search */}
      <View className="mx-4 my-2">
        <TextInput
          className="bg-[#F5F5F5] rounded-[8px] px-4 py-3 text-[14px]"
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Bookings List */}
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {loading ? (
          <SkeletonLoader />
        ) : filteredBookings.length === 0 ? (
          <View className="items-center justify-center py-8">
            <EmptySVG width={120} height={120} />
            <Text
              className="text-[14px] text-gray-400 mt-2"
              style={{ fontFamily: "poppinsRegular" }}
            >
              No bookings found
            </Text>
          </View>
        ) : (
          filteredBookings.map((b) => (
            <Pressable
              key={b?.id}
              className="bg-white rounded-[12px] shadow mb-4 p-4"
              onPress={() =>
                navigation.navigate("VendorBookingDetailScreen", { booking: b })
              }
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text
                  className="text-[12px] text-[#0000004D]"
                  style={{ fontFamily: "latoBold" }}
                >
                  {HexConverter(b?.id)} {DateConverter(b.date)} {b.time}
                </Text>
                <Text
                  className={`text-[12px] ${b.status === "Completed" ? "text-success" : "text-pending"}`}
                  style={{ fontFamily: "latoBold" }}
                >
                  {b?.status}
                </Text>
              </View>
              <Text
                className="text-[18px] text-fadedDark"
                style={{ fontFamily: "latoBold" }}
              >
                {formatAmount(b?.amount)}
              </Text>
              <View className="flex-row justify-between items-center mt-2">
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "latoRegular" }}
                >
                  {b.client}
                </Text>
                <Text
                  className="text-faintDark text-[12px]"
                  style={{ fontFamily: "latoRegular" }}
                >
                  View details &gt;
                </Text>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}
