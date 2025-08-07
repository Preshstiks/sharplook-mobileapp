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

export default function HowWeShareYourInformationScreen() {
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
          Privacy Policy
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[15px] mt-2" style={{ fontFamily: "latoBold" }}>
          How We Share Your Information
        </Text>
        <Text
          className="text-[14px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: Jun 27, 2025
        </Text>
        <Text
          className="text-[14px] text-black"
          style={{ fontFamily: "poppinsRegular" }}
        >
          We will retain and use your Personal Information for the following
          Purposes ; Sharing With Service Professionals : In order to ensure
          effective service delivery, we would share your name, contact details
          , geographical location(if consented) and appointment references with
          the relevant hairstylist, barber, and nail technician, pedicurist or
          massage therapist. We may receive information about you from
          hairstylists, barbers, nail technicians, pedicurists, or massage
          therapists, such as appointment details or feedback. 2. Use by
          Third-Party Payment Processor: Our payment processor may share
          transaction-related data to confirm payments or process refunds.
          Engagement of Service Providers: We engage third-party providers (e.g,
          cloud hosing, analytics or customer support services) located in the
          United States , who process data on our behalf under strict data
          protection agreements compliant with the Nigeria Data Protection Act
          2023. Legal and Regulatory Compliance: We may disclose data if
          required by law, such as in response to a court order, regulatory
          request, or to comply with Nigerian tax or financial regulations.
          Business Transfers: In the event of a merger, acquisition, or sale of
          assets, your data may be transferred to the acquiring entity, with
          safeguards to protect your privacy. We do not sell your personal data
          to third parties. Aggregated and Anonymized Data: We may use any
          aggregated data derived from or incorporating your Personal
          Information after you update or delete it, but not in a manner that
          would identify you personally. Once the retention period expires,
          Personal Information shall be deleted. Therefore, the right to access,
          the right to erasure, the right to rectification and the right to data
          portability cannot be enforced after the expiration of the retention
          period.
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
