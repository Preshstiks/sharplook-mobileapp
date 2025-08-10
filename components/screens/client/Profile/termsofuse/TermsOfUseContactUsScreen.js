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

export default function TermsOfUseContactUsScreen() {
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
          Terms of Use
        </Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[15px] mt-2" style={{ fontFamily: "latoBold" }}>
          Contact Us
        </Text>
        <Text
          className="text-[14px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: August 5, 2025
        </Text>
        <Text
          className="text-[14px] text-black leading-6 mb-4"
          style={{ fontFamily: "poppinsRegular" }}
        >
          If you have any questions about these Terms, please contact us at:
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>Email:</Text>{" "}
          Privacy@sharplook.ng
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>Phone:</Text> [To be
          provided]
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>Address:</Text> [To be
          provided]
        </Text>
      </ScrollView>
    </View>
  );
}
