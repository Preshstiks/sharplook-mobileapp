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

export default function TermsOfUseEligibilityScreen() {
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
          Eligibility
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
          <Text style={{ fontFamily: "poppinsBold" }}>
            Vendor Eligibility Requirements
          </Text>
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Minimum Age Requirement for Vendor Listing:
          </Text>{" "}
          To be eligible for listing on the application as a Vendor, individuals
          must be at least eighteen (18) years of age at the time of
          registration. By applying to be listed, Vendors confirm that they meet
          this age requirement. The Platform reserves the right to suspend or
          terminate any Vendor account found to be in violation of this
          eligibility condition.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            User Access and Parental Guidance
          </Text>
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            User Eligibility and Minor Supervision:
          </Text>{" "}
          The application is accessible to Users of all ages. However, where a
          User is a minor, access to and use of the application must be done
          under the supervision and guidance of a parent or legal guardian.
          {"\n\n"}
          The Platform shall not be held liable for any unauthorized use of the
          application by minors without appropriate supervision.
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
