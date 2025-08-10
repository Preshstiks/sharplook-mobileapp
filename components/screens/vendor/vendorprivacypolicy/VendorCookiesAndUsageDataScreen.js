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

export default function VendorCookiesAndUsageDataScreen() {
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
          Cookies and Usage Data
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
          We use cookies and similar tracking technologies to track the activity
          on our Service and hold certain information.
          {"\n\n"}
          Cookies are files with small amount of data which may include an
          anonymous unique identifier. Cookies are sent to your browser from a
          website and stored on your device. Tracking technologies also used are
          beacons, tags, and scripts to collect and track information and to
          improve and analyze our Service.
          {"\n\n"}
          Examples of Cookies we use:
          {"\n"}
          Session Cookies. We use Session Cookies to operate our Service.
          {"\n"}
          Preference Cookies. We use Preference Cookies to remember your
          preferences and various settings.
          {"\n"}
          Analytical Cookies: We use analytical cookies to recognize and
          determine the number of user visit to the application; this helps to
          increased user experience and application functionality.
          {"\n"}
          Security Cookies. We use security Cookies to enhance the safety of
          your online sessions. These cookies help protect sensitive data and
          reduce the risk of cyberattacks.
          {"\n"}
          Targeting Cookies: We use targeting cookies to track your online
          behaviors on the application and to deliver personalized services to
          you based on your interests.
          {"\n\n"}
          You may instruct your browser to refuse all cookies or to indicate
          when a cookie is being sent. However, if you do not accept cookies,
          you may not be able to use some portions of our Service. Unless you
          have configured your browser to reject cookies, our system will
          automatically place cookies on your device when you access our
          application.
        </Text>
      </ScrollView>
    </View>
  );
}
