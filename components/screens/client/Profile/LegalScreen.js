import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LegalScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Legal</Text>
        <View style={{ width: 22 }} />
      </View>
      {/* Legal Options */}
      <View className="px-4 mt-4">
        <TouchableOpacity
          className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-4 shadow-sm border border-[#F6F6F6]"
          onPress={() => navigation.navigate("PrivacyPolicyScreen")}
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
          onPress={() => navigation.navigate("TermsOfUseScreen")}
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
