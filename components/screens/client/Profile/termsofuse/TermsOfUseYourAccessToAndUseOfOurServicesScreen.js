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

export default function TermsOfUseYourAccessToAndUseOfOurServicesScreen() {
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
          Your Access to and Use of Our Services
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
          Personal Data may be collected through one or more of the following
          methods: Direct Collection: We collect data that you voluntarily
          provide when interacting with our platform, including but not limited
          to account registration, profile updates, and service bookings and
          inquiries. Automated Collection: Certain data may be collected
          automatically as you use the SharpLook App. This includes
          device-specific identifiers and system information, location data
          (when enabled), and interaction logs, usage statistics, and diagnostic
          data. Third-Party Integrations: We may also collect data via
          integrated third-party services that support our operations, such as
          payment processors, analytics platforms, and customer support tools.
          These third parties may process your data on our behalf in accordance
          with applicable data protection laws and safeguards.
        </Text>
      </ScrollView>
    </View>
  );
}
