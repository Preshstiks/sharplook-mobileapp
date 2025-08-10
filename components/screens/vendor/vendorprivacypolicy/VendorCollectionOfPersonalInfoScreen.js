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

export default function VendorCollectionOfPersonalInfoScreen() {
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
          Collection of Personal Information
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
          You will be asked to provide certain Personal Information (for
          example, your name and e-mail address), that can be used to contact or
          identify you while using our Service. We receive and store any
          information you knowingly provide to us when you create an account,
          publish content, or fill any online forms in the Mobile Application.
          When required, this information may include the following:
          {"\n\n"}
          Personal Information : When you register, we collect your name, email
          address, phone number and password for authentication purposes.
          {"\n"}
          Account details such as user name, unique user ID, password.
          {"\n"}
          Payment Information: When booking services, you would be asked to
          provide your payment details through our third-party payment
          processors in order for your payment to be validated and processed. We
          do not store your payment details on our servers.
          {"\n\n"}
          We may also ask you to provide additional information when taking a
          survey or providing feedback or inquiries.
          {"\n\n"}
          We do not sell or rent your personal information to third parties.
        </Text>
      </ScrollView>
    </View>
  );
}
