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

export default function TermsOfUseUserAccountsScreen() {
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
          Terms of Use
        </Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[17px] mt-2" style={{ fontFamily: "latoBold" }}>
          User Accounts
        </Text>
        <Text
          className="text-[16px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: August 5, 2025
        </Text>
        <Text
          className="text-[16px] text-black leading-6 mb-4"
          style={{ fontFamily: "poppinsRegular" }}
        >
          <Text style={{ fontFamily: "poppinsBold" }}>Registration:</Text> To
          access certain features, you may need to create an account. You agree
          to provide accurate, current, and complete information during
          registration and to update such information to keep it accurate.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Entity Level Acceptance
          </Text>
          {"\n"}
          If you are using the account on behalf of an entity, you represent and
          warrant that you have the authority to bind that entity to these Terms
          and by accepting these Terms, you are doing so on behalf of that
          entity (and all references to "you" in these Terms shall refer to that
          entity)
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>Registration</Text>
          {"\n"}
          To access specific products on the mobile application, you may be
          required to submit certain details (including identification and
          contact information) either during the initial registration process or
          throughout your continued use of the application. All information
          provided to SharpLook must be accurate, current, and complete.
          {"\n\n"}
          You are responsible for promptly notifying SharpLook of any changes or
          updates to such information.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Account Security
          </Text>{" "}
          You are solely responsible for maintaining the confidentiality of your
          account credentials, including your password. Any activity conducted
          under your account will be presumed to have been authorized by you. If
          you suspect or become aware of any unauthorized access or use of your
          account, you must notify us immediately.
        </Text>
      </ScrollView>
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
