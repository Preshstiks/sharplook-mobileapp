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

export default function TermsOfUseYourAccountWithUsScreen() {
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
          Your Account with Us
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
          SharpLook is committed to safeguarding your Personal Data and does
          not, under any circumstances, sell your information to third parties.
          However, in limited and clearly defined contexts, Personal Data may be
          shared as follows: Regulatory and Law Enforcement Authorities: We may
          disclose Personal Data to competent governmental, regulatory, or law
          enforcement bodies where such disclosure is mandated by applicable law
          or valid legal process. Service Delivery Purposes: Personal Data may
          be shared with other registered users where required to fulfil the
          core functions of the platform including enabling service visibility,
          confirming appointments and facilitating in-app communications.
          Third-Party Safeguards: All third-party recipients of your Personal
          Data are contractually bound to uphold confidentiality, security, and
          data handling obligations in alignment with this Agreement and the
          Nigeria Data Protection Act (NDPA) 2023.
        </Text>
      </ScrollView>
    </View>
  );
}
