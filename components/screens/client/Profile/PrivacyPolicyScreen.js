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

const policySections = [
  {
    title: "Data Controller",
    route: "DataControllerScreen",
  },
  {
    title: "Privacy Policy",
    route: "PrivacyPolicyIntroScreen",
  },
  {
    title: "Automatic Collection of Information",
    route: "AutomaticCollectionScreen",
  },
  {
    title: "Collection of Personal Information",
    route: "CollectionOfPersonalInfoScreen",
  },
  {
    title: "Cookies and Usage Data",
    route: "CookiesAndUsageDataScreen",
  },
  {
    title: "How We Share your Personal Information",
    route: "HowWeShareInfoScreen",
  },
  {
    title: "Managing Personal Information",
    route: "ManagingPersonalInfoScreen",
  },
  {
    title: "Use and Processing of Collected Information",
    route: "UseAndProcessingScreen",
  },
  {
    title: "Usage Data",
    route: "UsageDataScreen",
  },
  {
    title: "Information Transfer and Storage",
    route: "InformationTransferScreen",
  },
  {
    title: "Service Providers",
    route: "ServiceProvidersScreen",
  },
  {
    title: "Privacy of Children",
    route: "PrivacyOfChildrenScreen",
  },
  {
    title: "Newsletters",
    route: "NewslettersScreen",
  },
  {
    title: "Links to Other Mobile Applications",
    route: "LinksToOtherAppsScreen",
  },
  {
    title: "Information Security",
    route: "InformationSecurityScreen",
  },
  {
    title: "Data Breach",
    route: "DataBreachScreen",
  },
  {
    title: "Legal Disclosures",
    route: "LegalDisclosuresScreen",
  },
  {
    title: "Changes and Amendments",
    route: "ChangesAndAmendmentsScreen",
  },
  {
    title: "Indemnity",
    route: "IndemnityScreen",
  },
  {
    title: "Acceptance of this Policy",
    route: "AcceptanceOfPolicyScreen",
  },
  {
    title: "Contacting Us",
    route: "ContactingUsScreen",
  },
];

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
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
          Privacy Policy
        </Text>
        <Text
          className="text-[14px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: July 24, 2025
        </Text>
        {policySections.map((section, idx) => (
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
