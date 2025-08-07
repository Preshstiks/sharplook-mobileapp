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

export default function TermsOfUseIntellectualPropertyRightsScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}
      <View className="pt-[60px] pb-3 px-4 bg-white shadow-sm flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text
          className="flex-1 text-center text-[14px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Terms of Use
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[15px] mt-2" style={{ fontFamily: "latoBold" }}>
          Intellectual Property Rights
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
          In accordance with the Nigeria Data Protection Act (NDPA) 2023 and
          other applicable data protection laws, you, as a Data Subject, are
          entitled to exercise the following rights regarding your Personal
          Data: Right of Access: You have the right to request confirmation as
          to whether we process your Personal Data and to obtain a copy of such
          data, along with relevant information regarding the nature, purpose,
          and categories of processing. Right to Rectification: You may request
          that any inaccurate or incomplete Personal Data be corrected or
          updated without undue delay. Right to Erasure: You have the right to
          request the deletion of your Personal Data where the data is no longer
          necessary for the purpose it was collected, where you withdraw your
          consent and no other legal basis exists, or where erasure is required
          to comply with a legal obligation. Right to Withdraw Consent: Where
          processing is based on your consent, you may withdraw such consent at
          any time. This will not affect the lawfulness of processing carried
          out prior to the withdrawal. Right to Lodge a Complaint: If you
          believe your data protection rights have been violated, you have the
          right to lodge a formal complaint with the Nigeria Data Protection
          Commission (NDPC) or any competent supervisory authority. Requests
          relating to your Data Rights can be sent to privacy@sharplook.ng
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
