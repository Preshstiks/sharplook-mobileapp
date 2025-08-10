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

export default function VendorPrivacyOfChildrenScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}
      <View className="pt-[60px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
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
          Privacy of Children
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
          We do not knowingly collect any Personal Information from children
          under the age of 18. If you are under the age of 18, please do not
          submit any Personal Information through our Mobile Application or
          Service. We encourage parents and legal guardians to monitor their
          children's Internet usage and to help enforce this Policy by
          instructing their children never to provide Personal Information
          through our Mobile Application or Service without their permission.
          {"\n\n"}
          If you have reason to believe that a child under the age of 18 has
          provided Personal Information to us through our Mobile Application or
          Service, please contact us. You must also be at least 18 years of age
          to consent to the processing of your Personal Information in your
          country (in some countries we may allow your parent or guardian to do
          so on your behalf).
        </Text>
      </ScrollView>
    </View>
  );
}
