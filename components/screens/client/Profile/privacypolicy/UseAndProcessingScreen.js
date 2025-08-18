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

export default function UseAndProcessingScreen() {
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
          className="text-[16px] text-faintDark"
        >
          Privacy Policy
        </Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[17px] mt-2" style={{ fontFamily: "latoBold" }}>
          Use and Processing of Collected Information
        </Text>
        <Text
          className="text-[16px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: July 24, 2025
        </Text>
        <Text
          className="text-[16px] text-black leading-6"
          style={{ fontFamily: "poppinsRegular" }}
        >
          In order to make our Mobile Application and Services available to you,
          or to meet a legal obligation, we need to collect and use certain
          Personal Information. If you do not provide the information that we
          request, we may not be able to provide you with the requested products
          or services. Some of the information we collect is directly from you
          via our Mobile Application.
          {"\n\n"}
          Any of the information we collect from you may be used for the
          following purposes:
          {"\n"}
          Create and manage user accounts
          {"\n"}
          Third-Party Payment Processor
          {"\n"}
          Respond to inquiries and offer customer care and support
          {"\n"}
          Request user feedback
          {"\n"}
          Improve user experience
          {"\n"}
          Third-Party Service Providers
          {"\n"}
          Administer prize draws and competitions
          {"\n"}
          Enforce terms and conditions and policies
          {"\n"}
          Protect from abuse and malicious users
          {"\n"}
          Respond to legal requests and prevent harm
          {"\n"}
          Run and operate our Mobile Application and Services
          {"\n"}
          Business Transfers in the event of a merger or acquisition
          {"\n"}
          To provide and maintain the Service
          {"\n"}
          To notify you about changes to our Service
          {"\n"}
          To allow you to participate in interactive features of our Service
          when you choose to do so
          {"\n"}
          To provide analysis or valuable information so that we can improve the
          Service
          {"\n\n"}
          Processing your Personal Information depends on how you interact with
          our Mobile Application, where you are located in the world and if one
          of the following applies:
          {"\n\n"}
          (i) You have given your consent for one or more specific purposes.
          This, however, is subject to Nigeria Data Protection Regulations;
          {"\n\n"}
          (ii) Provision of information is necessary for the performance of an
          agreement with you and/or for any pre-contractual obligations thereof;
          {"\n\n"}
          (iii) Processing is necessary for compliance with a legal obligation
          to which you are subject;
          {"\n\n"}
          (iv) Processing is related to a task that is carried out in the public
          interest or in the exercise of official authority vested in us;
          {"\n\n"}
          (v) Processing is necessary for the purposes of the legitimate
          interests pursued by us or by a third party.
        </Text>
      </ScrollView>
    </View>
  );
}
