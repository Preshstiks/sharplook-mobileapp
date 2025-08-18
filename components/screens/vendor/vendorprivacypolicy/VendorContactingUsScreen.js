import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function VendorContactingUsScreen() {
  const navigation = useNavigation();
  const handleEmailPress = () => {
    Linking.openURL("mailto:hello@sharplook.beauty");
  };
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
          Contacting Us
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
          If you would like to contact us to understand more about this Policy
          or wish to contact us concerning any matter relating to individual
          rights and your Personal Information, you may do so via the Contact
          Form or send an email to{" "}
          <TouchableOpacity onPress={handleEmailPress}>
            <Text className="text-primary underline -mb-1">
              hello@sharplook.beauty
            </Text>
          </TouchableOpacity>
          .
        </Text>
      </ScrollView>
    </View>
  );
}
