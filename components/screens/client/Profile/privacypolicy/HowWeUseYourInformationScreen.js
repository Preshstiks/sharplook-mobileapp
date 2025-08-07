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

export default function HowWeUseYourInformationScreen() {
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
          How We Use Your Information
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
          Personal Data collected through the SharpLook App shall be processed
          for one or more of the following legitimate and lawful purposes, in
          accordance with applicable data protection laws: User Account
          Management: To create and manage your account, verify your identity,
          and provide personalized services. Service Connection: To connect you
          with beauty and wellness service providers, including hairstylists,
          barbers, nail technicians, pedicurists, and massage therapists.
          Appointment Coordination: To schedule, manage, and track your
          appointments and service bookings. Secure Payment Processing: To
          process payments securely through our third-party payment processors
          while maintaining your financial data protection. Customer Support: To
          provide assistance, respond to inquiries, and resolve issues related
          to our services. Communication and Engagement: To send important
          updates, notifications, and service-related communications. Legal
          Compliance and Fraud Prevention: To comply with applicable laws,
          prevent fraud, and maintain platform security. All processing
          activities are conducted in accordance with the Nigeria Data
          Protection Act (NDPA) 2023 and other applicable data protection laws.
        </Text>
      </ScrollView>
    </View>
  );
}
