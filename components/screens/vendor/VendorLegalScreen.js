import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LegalScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-[60px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[14px] text-faintDark"
        >
          Legal
        </Text>
        <View style={{ width: 26 }} />
      </View>
      {/* Legal Options */}
      <View className="px-4 mt-4">
        <TouchableOpacity
          className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-4 shadow-sm border border-[#F6F6F6]"
          onPress={() => navigation.navigate("VendorPrivacyPolicyScreen")}
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <Octicons name="shield" size={22} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-black"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Privacy Policy
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-4 shadow-sm border border-[#F6F6F6]"
          onPress={() => navigation.navigate("VendorTermsOfUseScreen")}
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <MaterialIcons name="description" size={22} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-black"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Terms of Use
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        {/* <TouchableOpacity
          className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-4 shadow-sm border border-[#F6F6F6]"
          onPress={() => navigation.navigate("ServiceLevelAgreementScreen")}
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <MaterialIcons name="description" size={22} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-black"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Service Level Agreement
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    color: "#222",
    fontSize: 16,
    fontFamily: "poppinsMedium",
    flex: 1,
    textAlign: "center",
    marginLeft: -28,
  },
});
