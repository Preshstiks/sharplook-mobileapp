import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const termsSections = [
  "Your Relationship With Us",
  "Accepting the Terms",
  "Changes to the Terms",
  "Your Account with Us",
  "Your Access to and Use of Our Services",
  "Intellectual Property Rights",
  "Content",
  "Indemnity",
  "EXCLUSION OF WARRANTIES",
  "LIMITATION OF LIABILITY",
  "Other Terms",
];

export default function TermsOfUseScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Use</Text>
        <View style={{ width: 22 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[15px] mt-2" style={{ fontFamily: "latoBold" }}>
          Terms of Use
        </Text>
        <Text
          className="text-[14px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: Jun 10, 2024
        </Text>
        {termsSections.map((section, idx) => (
          <TouchableOpacity
            key={section}
            className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]"
            onPress={() => {
              const routes = [
                "TermsOfUseYourRelationshipWithUsScreen",
                "TermsOfUseAcceptingTheTermsScreen",
                "TermsOfUseChangesToTheTermsScreen",
                "TermsOfUseYourAccountWithUsScreen",
                "TermsOfUseYourAccessToAndUseOfOurServicesScreen",
                "TermsOfUseIntellectualPropertyRightsScreen",
                "TermsOfUseContentScreen",
                "TermsOfUseIndemnityScreen",
                "TermsOfUseExclusionOfWarrantiesScreen",
                "TermsOfUseLimitationOfLiabilityScreen",
                "TermsOfUseOtherTermsScreen",
              ];
              navigation.navigate(routes[idx]);
            }}
          >
            <View className="bg-primary p-2 rounded-full mr-4">
              <MaterialIcons name="description" size={22} color="#fff" />
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
