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

export default function HowLongWeKeepYourInformationScreen() {
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
          How Long We Keep Your Information
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
          We retain your personal data only for as long as necessary to achieve
          the purposes outlined in this agreement: Account Data: Retained while
          your account is active and for 12 months after account deletion,
          unless legally required otherwise (e.g., for audit purposes).
          Geolocation Data: Stored only for the duration of an active booking
          session, unless you consent to ongoing use for personalized
          recommendations. Transaction Data: Retained for 7 years to comply with
          Nigerian tax and financial regulations. Anonymized Data: May be
          retained indefinitely for analytics to improve our Services. Data no
          longer needed is securely deleted or anonymized in accordance with
          NDPA.
        </Text>
      </ScrollView>
    </View>
  );
}
