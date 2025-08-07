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

export default function JurisdictionSpecificScreen() {
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
          Jurisdiction-Specific
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
          This Agreement, including its interpretation, validity, performance,
          and enforcement, shall be governed by and construed in accordance with
          the laws of the Federal Republic of Nigeria. The Parties hereby submit
          to the exclusive jurisdiction of the courts of Nigeria for the
          resolution of any dispute arising under or in connection with this
          Agreement. In the event of a data breach affecting your personal data,
          we will notify you and the relevant authorities within the timeline
          required by applicable law. The Company reserves the right to amend,
          revise, or update the terms of this Agreement at its sole discretion
          and at any time. Any such modifications shall become effective upon
          publication within the SharpLook App, or upon direct communication to
          users via electronic means, including email or in-app notifications.
          Your continued access or use of the SharpLook App following the
          notification of any changes shall constitute your binding acceptance
          of the revised terms.
        </Text>
      </ScrollView>
    </View>
  );
}
