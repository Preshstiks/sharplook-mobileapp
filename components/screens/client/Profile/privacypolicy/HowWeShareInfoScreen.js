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

export default function HowWeShareInfoScreen() {
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
          How We Share your Personal Information
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
          We will retain and use your Personal Information for the following
          Purposes ;{"\n\n"}
          Sharing With Service Professionals : In order to ensure effective
          service delivery, we would share your name, contact details ,
          geographical location(if consented) and appointment references with
          the relevant hairstylist, barber, and nail technician, pedicurist or
          massage therapist. We may receive information about you from
          hairstylists, barbers, nail technicians, pedicurists, or massage
          therapists, such as appointment details or feedback.
          {"\n"}
          Use by Third-Party Payment Processor: Our payment processor may share
          transaction-related data to confirm payments or process refunds.
          {"\n"}
          Engagement of Service Providers: We engage third-party providers (e.g,
          cloud hosing, analytics or customer support services) located in the
          United States , who process data on our behalf under strict data
          protection agreements compliant with the Nigeria Data Protection Act
          2023.
          {"\n"}
          Legal and Regulatory Compliance: We may disclose data if required by
          law, such as in response to a court order, regulatory request, or to
          comply with Nigerian tax or financial regulations.
          {"\n"}
          Business Transfers: In the event of a merger, acquisition, or sale of
          assets, your data may be transferred to the acquiring entity, with
          safeguards to protect your privacy.
          {"\n\n"}
          We do not sell your personal data to third parties.
          {"\n\n"}
          Aggregated and Anonymized Data: We may use any aggregated data derived
          from or incorporating your Personal Information after you update or
          delete it, but not in a manner that would identify you personally.
          Once the retention period expires, Personal Information shall be
          deleted. Therefore, the right to access, the right to erasure, the
          right to rectification and the right to data portability cannot be
          enforced after the expiration of the retention period.
        </Text>
      </ScrollView>
    </View>
  );
}
