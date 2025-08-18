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

export default function TermsOfUsePaymentTermsScreen() {
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
          Payment Terms
        </Text>
        <Text
          className="text-[16px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: August 5, 2025
        </Text>
        <Text
          className="text-[16px] text-black leading-6"
          style={{ fontFamily: "poppinsRegular" }}
        >
          <Text style={{ fontFamily: "poppinsBold" }}>Fees:</Text> All prices
          are listed in Naira and are subject to change with notice.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>Payment Methods:</Text> We
          accept credit cards and debit cards payments.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>Billing:</Text> By
          providing payment information, you authorize us to charge the
          applicable fees for the services you select.
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
