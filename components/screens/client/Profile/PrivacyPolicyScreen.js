import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const policySections = [
  "What information we collect",
  "How we use your information",
  "How we share your information",
  "Where we store your information",
  "Your rights and choices",
  "The security of your information",
  "How long we keep your information",
  "Information relating to children and teens",
  "Privacy Policy update",
  "Contact",
  "Jurisdiction-Specific",
];

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 22 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[15px] mt-2" style={{ fontFamily: "latoBold" }}>
          Privacy Policy
        </Text>
        <Text
          className="text-[14px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: Jun 10, 2024
        </Text>
        {policySections.map((section, idx) => (
          <TouchableOpacity
            key={section}
            className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]"
            onPress={() => {
              const routes = [
                "WhatInformationWeCollectScreen",
                "HowWeUseYourInformationScreen",
                "HowWeShareYourInformationScreen",
                "WhereWeStoreYourInformationScreen",
                "YourRightsAndChoicesScreen",
                "TheSecurityOfYourInformationScreen",
                "HowLongWeKeepYourInformationScreen",
                "InformationRelatingToChildrenAndTeensScreen",
                "PrivacyPolicyUpdateScreen",
                "ContactScreen",
                "JurisdictionSpecificScreen",
              ];
              navigation.navigate(routes[idx]);
            }}
          >
            <View className="bg-primary p-2 rounded-full mr-4">
              <Octicons name="shield" size={22} color="#fff" />
            </View>
            <Text
              className="flex-1 text-[14px] text-black"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {section}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
          </TouchableOpacity>
        ))}
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
