import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BookingSystemScreen() {
  const navigation = useNavigation();

  // Reusable data array
  const bookingSystemData = [
    {
      id: 1,
      title: "How to book a vendor",
      content:
        "Search for a vendor, view their profile, choose a service, and pick a date and time.",
    },
    {
      id: 2,
      title: "Cancelling a booking",
      content:
        "Cancel anytime before the service date from your booking details page.",
    },
    {
      id: 3,
      title: "Booking statuses",
      content: [
        "Pending – awaiting vendor's confirmation",
        "Accepted – vendor has accepted",
        "Completed – service is done",
      ],
    },
  ];

  // Reusable card component
  const HelpCard = ({ title, content, icon }) => (
    <TouchableOpacity className="bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]">
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text
            className="text-[16px] mb-1"
            style={{ fontFamily: "poppinsSemiBold" }}
          >
            {title}
          </Text>
          {Array.isArray(content) ? (
            content.map((line, index) => (
              <Text
                key={index}
                className="text-[14px] text-[#00000080]"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {line}
              </Text>
            ))
          ) : (
            <Text
              className="text-[14px] text-[#00000080]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {content}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-[40px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[16px] text-faintDark"
        >
          Booking System
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Cards */}
      <View className="px-4 mt-4">
        {bookingSystemData.map((item) => (
          <HelpCard
            key={item.id}
            title={item.title}
            content={item.content}
            icon={item.icon}
          />
        ))}
      </View>
    </View>
  );
}
