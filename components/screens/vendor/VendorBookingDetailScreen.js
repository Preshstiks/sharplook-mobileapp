import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";

export default function VendorBookingDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { booking } = route.params || {};

  // Example static data for demo (replace with real data as needed)
  const bookingDetails = [
    { name: "Facials", amount: 88528 },
    { name: "Pedicure", amount: 100000 },
  ];
  const paymentDetails = [
    { name: "Facials", amount: 18528 },
    { name: "Pedicure", amount: 178000 },
  ];

  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}

      <View
        className="pt-[60px] mb-3 pb-[20px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          backgroundColor: "#fff",
        }}
      >
        <View className="flex-row items-center px-4 justify-between">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </Pressable>
          <Text
            className="text-center"
            style={{ fontSize: 18, fontFamily: "latoBold" }}
          >
            Booking Details
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* Status */}
        <View className="mt-6 mb-2">
          <Text
            className="text-[16px] mb-3 text-[#A5A5A5]"
            style={{ fontFamily: "poppinsMedium" }}
          >
            Booking <Text className="text-fadedDark">#{booking?.id}</Text>
          </Text>
          <Text
            className={`text-[16px] ${booking?.status === "Completed" ? "text-success" : "text-pending"}`}
            style={{ fontFamily: "poppinsMedium" }}
          >
            {booking?.status || "Pending"}
          </Text>
        </View>
        {/* Booking Details */}
        <View
          className="bg-white rounded-xl p-4 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[16px] mb-1"
          >
            Booking Details
          </Text>
          <Text
            className="text-primary text-[12px] mb-1"
            style={{ fontFamily: "poppinsSemiBold" }}
          >
            July 22, 2024 at 09:15pm
          </Text>
          <Text
            className="text-[12px] mb-2"
            style={{ fontFamily: "poppinsRegular" }}
          >
            By: Team Green
          </Text>
          {bookingDetails.map((item, idx) => (
            <View key={idx} className="flex-row justify-between mb-1">
              <Text
                className="text-[12px] text-[#00000066]"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {idx + 1}. {item.name}
              </Text>
              <Text
                className="text-[14px] text-[#00000066]"
                style={{ fontFamily: "latoBold" }}
              >
                ₦{item.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
        {/* Payment Summary */}
        <View
          className="bg-white rounded-xl p-4 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[16px] mb-1"
          >
            Payment Summary
          </Text>
          <Text
            className="text-primary text-[12px] mb-1"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Payment Date: 23-03-2024
          </Text>
          <View className="h-[1px] mt-3 mb-4 bg-[#00000013]" />
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[12px] mb-2"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Total Payment{" "}
            </Text>
            <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
              ₦{booking?.amount?.toLocaleString()}
            </Text>
          </View>
          {paymentDetails.map((item, idx) => (
            <View key={idx} className="flex-row justify-between mb-1">
              <Text
                className="text-[12px] text-[#00000066]"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {idx + 1}. {item.name}
              </Text>
              <Text
                className="text-[14px] text-[#00000066]"
                style={{ fontFamily: "latoBold" }}
              >
                ₦{item.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
        {/* Appointment Details */}
        <View
          className="bg-white rounded-xl p-4 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[16px] mb-2"
          >
            Appointment Details
          </Text>
          <View className="flex-row justify-between mt-2 mb-1">
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Client's Name
            </Text>
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Team Green
            </Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Time
            </Text>
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              9:00AM
            </Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Date
            </Text>
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              July 6th, 2024
            </Text>
          </View>
        </View>
        {booking?.status === "Pending" && (
          <View className="mt-2 mb-1">
            <AuthButton title="Complete Booking" />
            <OutlineButton title="Dispute Booking" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
