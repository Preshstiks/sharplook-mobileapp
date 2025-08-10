import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function UsageDataScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}
      <View className="pt-[40px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[14px] text-faintDark"
        >
          Privacy Policy
        </Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[15px] mt-2" style={{ fontFamily: "latoBold" }}>
          Usage Data
        </Text>
        <Text
          className="text-[14px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: July 24, 2025
        </Text>
        <Text
          className="text-[14px] text-black"
          style={{ fontFamily: "poppinsRegular" }}
        >
          We may also collect information that your browser sends whenever you
          visit our Service or when you access the Service by or through a
          mobile device ("Usage Data"). This Usage Data may include information
          such as your computer's Internet Protocol address (e.g. IP address),
          browser type, browser version, the pages of our Service that you
          visit, the time and date of your visit, the time spent on those pages,
          unique device identifiers and other diagnostic data.
          {"\n\n"}
          When you access the Service by or through a mobile device, this Usage
          Data may include information such as the type of mobile device you
          use, your mobile device unique ID, the IP address of your mobile
          device, your mobile operating system, the type of mobile Internet
          browser you use, unique device identifiers and other diagnostic data.
        </Text>
      </ScrollView>
    </View>
  );
}
