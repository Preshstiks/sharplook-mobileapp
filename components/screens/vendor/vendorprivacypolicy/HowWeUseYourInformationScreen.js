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
      <View className="pt-[60px] pb-3 px-4 bg-white shadow-sm flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text
          className="flex-1 text-center text-[14px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Privacy Policy
        </Text>
        <View style={{ width: 24 }} />
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
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    color: "#222",
    fontSize: 16,
    fontFamily: "poppinsMedium",
    flex: 1,
    textAlign: "center",
    marginLeft: -28,
  },
});
