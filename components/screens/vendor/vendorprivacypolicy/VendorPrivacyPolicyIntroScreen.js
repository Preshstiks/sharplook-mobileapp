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

export default function VendorPrivacyPolicyIntroScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}
      <View className="pt-[60px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[16px] text-faintDark"
        >
          Privacy Policy
        </Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[17px] mt-2" style={{ fontFamily: "latoBold" }}>
          Privacy Policy
        </Text>
        <Text
          className="text-[16px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: July 24, 2025
        </Text>
        <Text
          className="text-[16px] text-black"
          style={{ fontFamily: "poppinsRegular" }}
        >
          This privacy policy ("Policy") describes how SharpLook ("Mobile
          Application", "we", "us" or "our") collects, protects and uses the
          personally identifiable information ("Personal Information") you
          ("User", "you" or "your") may provide in the SharpLook mobile
          application and any of its products or services (collectively, "Mobile
          Application" or "Services").
          {"\n\n"}
          It also describes the choices available to you regarding our use of
          your Personal Information and how you can access and update this
          information. This Policy does not apply to the practices of companies
          that we do not own or control, or to individuals that we do not employ
          or manage.
        </Text>
      </ScrollView>
    </View>
  );
}
