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

export default function TermsOfUseDisputeResolutionScreen() {
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
          className="text-[14px] text-faintDark"
        >
          Terms of Use
        </Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[15px] mt-2" style={{ fontFamily: "latoBold" }}>
          Dispute Resolution Process
        </Text>
        <Text
          className="text-[14px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: August 5, 2025
        </Text>
        <Text
          className="text-[14px] text-black leading-6 mb-4"
          style={{ fontFamily: "poppinsRegular" }}
        >
          In the event of a disagreement between a User and a Vendor regarding
          the quality, delivery, or fulfilment of a service booked via the
          Sharplook platform ("Platform"), the following dispute resolution
          protocol shall apply:
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Submission of Dispute:
          </Text>{" "}
          Either party may initiate a dispute by submitting a formal complaint
          through the Platform within 24 hours of the service being marked as
          completed.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Investigation Period:
          </Text>{" "}
          Upon receipt of a valid dispute, Sharplook will conduct an impartial
          investigation within a 48-hour window. Parties may be required to
          provide supporting evidence, including but not limited to service
          descriptions, communication records, images, or feedback.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Escrow Mechanism:
          </Text>{" "}
          During the dispute window, payment for the disputed service will be
          held in escrow. Neither party shall receive disbursement until a final
          decision is reached by Sharplook
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Outcome and Resolution:
          </Text>
          {"\n\n"}
          If Sharplook determines that the service was satisfactorily delivered
          in accordance with the Platform's standards, the escrowed funds will
          be released to the Vendor.
          {"\n"}
          If it is concluded that the service was not delivered as agreed or was
          materially deficient, the User will be issued a full or partial
          refund, depending on the circumstances.
          {"\n"}
          All decisions made by Sharplook are final and binding unless otherwise
          required by applicable law.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Limitations and Rights:
          </Text>{" "}
          Sharplook acts solely as a neutral facilitator and does not represent
          either party. The Platform does not assume liability for service
          quality or fulfillment, and its role in dispute resolution is limited
          to administrative mediation.
          {"\n\n"}
          Any disputes arising out of or related to these Terms, or the Site
          shall be resolved through binding mediation in Nigeria, except that
          you may assert claims in small claims court if applicable.
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
