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

export default function DataBreachScreen() {
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
          Data Breach
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
          In the event we become aware that the security of the Mobile
          Application has been compromised, or users Personal Information has
          been disclosed to unrelated third parties as a result of external
          activity, including, but not limited to, security attacks or fraud, we
          reserve the right to take reasonably appropriate measures, including,
          but not limited to, investigation and reporting, as well as
          notification to and cooperation with law enforcement authorities. In
          the event of a data breach, we will make reasonable efforts to notify
          affected individuals if we believe that there is a reasonable risk of
          harm to the user as a result of the breach or if notice is otherwise
          required by law. When we do, we will post a notice in the Mobile
          Application, send you an email, get in touch with you over the phone.
        </Text>
      </ScrollView>
    </View>
  );
}
