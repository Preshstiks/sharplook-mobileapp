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

export default function TermsOfUseContentScreen() {
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
          Content
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
          This Data Protection Agreement ("Agreement") is entered into between
          FranBoss Dammy Nigeria Limited, a company incorporated in Nigeria with
          its registered office at ……("Company", "we", "us", or "our"), the
          owner and operator of the Sharp Look mobile application ("SharpLook
          App"), AND You, a user of the SharpLook App, either as a
          beauty/wellness service provider (e.g., hairstylist, barber, nail
          technician, pedicurist, massage therapist) or as a client ("User",
          "you", or "your"). This Agreement outlines how personal data
          collected, stored, processed, and shared through the SharpLook App is
          protected and managed in compliance with the Nigeria Data Protection
          Act (NDPA) 2023 and other applicable data privacy laws. In the course
          of providing and facilitating services through our platform, we may
          collect and process the following categories of Personal Data: Data
          Relating to Clients: Personal Data collected from or about clients may
          include full name, contact details (e.g., email address, phone
          number), residential or geolocation data (where consented), profile
          photograph (optional), appointment history and service preferences,
          and payment information. Data Relating to Service Providers: Personal
          Data collected from service providers may include full name, business
          and professional credentials, contact details, official identification
          documents, professional certifications and licenses, availability
          schedule/calendar, geolocation data (subject to consent), and ratings,
          reviews, and feedback received from clients.
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
