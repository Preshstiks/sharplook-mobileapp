import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function GetStartedScreen() {
  const navigation = useNavigation();

  // Reusable data array
  const getStartedData = [
    {
      id: 1,
      title: "Creating an account",
      content:
        "Sign up using your email, phone number, or social media account. Fill in your basic details, verify your phone number, and you’re ready to start booking or offering services.",
    },
    {
      id: 2,
      title: "Navigating the app",
      content:
        "From the home screen, browse services, view top vendors, check promotions, and manage your bookings. Use the menu to access your profile, wallet, chat, and settings.",
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
          <Text
            className="text-[14px] text-[#00000080]"
            style={{ fontFamily: "poppinsRegular" }}
          >
            {content}
          </Text>
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
          Get Started
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Cards */}
      <View className="px-4 mt-4">
        {getStartedData.map((item) => (
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
