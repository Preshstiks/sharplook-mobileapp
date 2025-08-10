import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const slaSections = [
  {
    title: "Sharplook SLA Overview",
    route: "VendorSLAOverviewScreen", // Intro & Scope of Services
  },
  {
    title: "Scope of Services",
    route: "VendorScopeOfServicesScreen", // Responsibilities of Vendors & Users
  },
  {
    title: "Service Availability & Response Times",
    route: "VendorServiceAvailabilityScreen", // Availability, response expectations, penalties
  },
  {
    title: "Appointments & Location Compliance",
    route: "VendorAppointmentsAndLocationScreen", // Confirmation, location services, punctuality
  },
  {
    title: "Service Modes & Pricing",
    route: "VendorServiceModesAndPricingScreen", // Walk-in, home/office services, pricing rules
  },
  {
    title: "Quality & Professional Conduct",
    route: "VendorQualityAndConductScreen", // Standards, hygiene, professionalism, enforcement
  },
  {
    title: "Payments & Escrow",
    route: "VendorPaymentsAndEscrowScreen", // Payment process, security, disputes
  },
  {
    title: "Cancellations & No-Shows",
    route: "VendorCancellationsAndNoShowsScreen", // User/vendor cancellations, no-shows, dispute window
  },
  {
    title: "Confidentiality & Compliance",
    route: "VendorConfidentialityAndComplianceScreen", // Data handling, compliance, off-platform conduct
  },
  {
    title: "Legal Terms & Acceptance",
    route: "VendorLegalTermsAndAcceptanceScreen", // Indemnity, governing law, severability, agreement acceptance
  },
];

export default function ServiceLevelAgreementScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View className="pt-[60px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[14px] text-faintDark"
        >
          Service Level Agreement (SLA)
        </Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[15px] mt-2" style={{ fontFamily: "latoBold" }}>
          Service Level Agreement
        </Text>
        <Text
          className="text-[14px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: July 24, 2025
        </Text>
        {slaSections.map((section, idx) => (
          <TouchableOpacity
            key={section.title}
            className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]"
            onPress={() => navigation.navigate(section.route)}
            activeOpacity={0.8}
          >
            <View className="bg-primary p-2 rounded-full mr-4">
              <Octicons name="shield" size={22} color="#fff" />
            </View>
            <Text
              className="flex-1 text-[14px] text-black"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {section.title}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
