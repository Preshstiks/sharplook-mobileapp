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

export default function NewslettersScreen() {
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
          Newsletters
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
          We offer electronic newsletters to which you may voluntarily subscribe
          at any time. We are committed to keeping your e-mail address
          confidential and will not disclose your email address to any third
          parties except as allowed in the information use and processing
          section. We will maintain the information sent via e-mail in
          accordance with applicable laws and regulations.
          {"\n\n"}
          In compliance with the Nigerian Data Processing Regulations, all
          e-mails sent from us will clearly state who the e-mail is from and
          provide clear information on how to contact the sender. You may choose
          to stop receiving our newsletter or marketing emails by following the
          unsubscribe instructions included in these emails or by contacting us.
          However, you will continue to receive essential transactional emails.
        </Text>
      </ScrollView>
    </View>
  );
}
