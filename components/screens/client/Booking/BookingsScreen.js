import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Empty from "../../../../assets/img/empty.svg";
import { HttpClient } from "../../../../api/HttpClient";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { HexConverter } from "../../../reusuableComponents/HexConverter";
import { DateConverter } from "../../../reusuableComponents/DateConverter";
import { DayConverter } from "../../../reusuableComponents/DayConverter";
import { formatAmount } from "../../../formatAmount";

export default function BookingsScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState("PENDING");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const fetchBookings = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await HttpClient.get("/bookings/getBookings");
          console.log("API response:", response.data);
          setBookings(response.data.data || []);
        } catch (err) {
          setError("Failed to load bookings.");
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    }, [])
  );

  const filteredBookings = bookings.filter((b) => b.status === tab);
  console.log({ filteredBookings });
  const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-8">
      <Empty width={150} height={150} />
      <Text
        style={{ fontFamily: "poppinsRegular" }}
        className="text-[12px] text-center"
      >
        {tab === "PENDING"
          ? "You have no pending bookings"
          : "You have no completed bookings"}
      </Text>
    </View>
  );

  // Skeleton loader for booking card
  const SkeletonCard = () => (
    <View className="flex-row gap-3 bg-white rounded-[12px] shadow-md mb-5 p-3">
      <View
        className="w-[100px] h-[100px] rounded-[8px] mr-2"
        style={{ backgroundColor: "#e5e7eb" }}
      />
      <View className="flex-1 justify-between">
        <View>
          <View
            className="mb-1"
            style={{
              width: 120,
              height: 16,
              backgroundColor: "#e5e7eb",
              borderRadius: 4,
            }}
          />
          <View
            style={{
              width: 80,
              height: 10,
              backgroundColor: "#e5e7eb",
              borderRadius: 4,
              marginTop: 4,
            }}
          />
          <View
            style={{
              width: 60,
              height: 10,
              backgroundColor: "#e5e7eb",
              borderRadius: 4,
              marginTop: 4,
            }}
          />
          <View
            style={{
              width: 60,
              height: 10,
              backgroundColor: "#e5e7eb",
              borderRadius: 4,
              marginTop: 4,
            }}
          />
          <View
            style={{
              width: 60,
              height: 10,
              backgroundColor: "#e5e7eb",
              borderRadius: 4,
              marginTop: 4,
            }}
          />
        </View>
        <View
          style={{
            width: 50,
            height: 14,
            backgroundColor: "#e5e7eb",
            borderRadius: 4,
            alignSelf: "flex-end",
            marginTop: 8,
          }}
        />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-secondary">
      <View className="bg-primary pt-[60px] pb-4 px-4">
        <Text
          style={{ fontFamily: "poppinsMedium" }}
          className="text-white text-center text-[16px]"
        >
          My Bookings
        </Text>
      </View>
      <View className="px-4 mt-3">
        <AuthButton
          title="Offer your price"
          onPress={() => navigation.navigate("OfferPriceScreen")}
        />
      </View>
      <View className="flex-row justify-center mt-8 mb-2 gap-3">
        <Pressable
          className={`px-6 py-3 rounded-[8px] ${tab === "PENDING" ? "bg-primary" : "bg-white border border-[#A5A5A5]"}`}
          onPress={() => setTab("PENDING")}
        >
          <Text
            style={{ fontFamily: "latoBold" }}
            className={`text-[12px] ${tab === "PENDING" ? "text-white" : "text-[#A5A5A5]"}`}
          >
            Pending
          </Text>
        </Pressable>
        <Pressable
          className={`px-6 py-3 rounded-[8px] ${tab === "COMPLETED" ? "bg-primary" : "bg-white border border-[#A5A5A5]"}`}
          onPress={() => setTab("COMPLETED")}
        >
          <Text
            style={{ fontFamily: "latoBold" }}
            className={`text-[12px] ${tab === "COMPLETED" ? "text-white" : "text-[#A5A5A5]"}`}
          >
            Completed
          </Text>
        </Pressable>
      </View>
      {loading ? (
        <ScrollView className="px-3 mt-2" showsVerticalScrollIndicator={false}>
          {[...Array(4)].map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </ScrollView>
      ) : filteredBookings.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView className="px-3 mt-2" showsVerticalScrollIndicator={false}>
          {filteredBookings.map((booking) => (
            <Pressable
              key={booking.id}
              className="flex-row gap-3 bg-white rounded-[12px] shadow-md mb-5 p-3"
              onPress={() =>
                navigation.navigate("BookingDetailScreen", { booking })
              }
            >
              <Image
                source={
                  booking?.service.serviceImage
                    ? { uri: booking?.service.serviceImage }
                    : require("../../../../assets/img/facials.png")
                }
                className="w-[100px] h-[100px] rounded-[8px] mr-2"
              />
              <View className="flex-1 justify-between">
                <View>
                  <Text
                    style={{ fontFamily: "poppinsMedium" }}
                    className="text-[16px] mb-1 text-fadedDark"
                  >
                    {booking?.serviceName}
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[10px] text-fadedDark"
                  >
                    {booking?.vendor.vendorOnboarding.businessName}
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[10px] text-fadedDark"
                  >
                    {DateConverter(booking?.date)}
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[10px] text-fadedDark"
                  >
                    {booking?.time}
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[10px] text-fadedDark"
                  >
                    {DayConverter(booking?.date)}
                  </Text>
                </View>
                <Text
                  style={{ fontFamily: "latoBold" }}
                  className="text-primary text-[14px] pr-2 self-end"
                >
                  {formatAmount(booking?.price)}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
