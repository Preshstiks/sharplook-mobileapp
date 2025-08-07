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

export default function TermsOfUseYourRelationshipWithUsScreen() {
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
          Your Relationship With Us
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
          We are committed to maintaining the confidentiality, integrity, and
          availability of your Personal Data. In accordance with the Nigeria
          Data Protection Act (NDPA) 2023 and industry best practices, we
          implement a combination of technical and organizational security
          measures to guard against unauthorized access, alteration, disclosure,
          or destruction of Personal Data. The Mechanism adopted for these
          measures include but are not limited to: Data Encryption: All
          sensitive data is encrypted both in transit and at rest using
          industry-standard encryption protocols. Secure Infrastructure: Our
          systems are built on secure, cloud-based infrastructure with multiple
          layers of protection. Role Based Access Control: Access to personal
          data is restricted to authorized personnel only, with strict
          authentication and authorization protocols. Periodic Security Updates
          and Risk-assessments: We regularly update our security measures and
          conduct comprehensive risk assessments to identify and address
          potential vulnerabilities.
        </Text>
      </ScrollView>
    </View>
  );
}
