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

export default function TermsOfUseLocationTrackingScreen() {
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
          Location Tracking and Update Requirements
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
          To ensure safety, accurate service delivery, and effective monitoring
          across the Sharplook platform ("Platform"), the following obligations
          apply to all Vendors and Users:
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Vendor Location Services
          </Text>
          {"\n"}
          Vendors are required to keep real-time location services enabled while
          actively using the Platform. Location data is used to confirm service
          delivery, optimize vendor-to-client matching, and enhance personal
          safety during active appointments.
          {"\n"}
          Disabling location tracking may lead to temporary suspension of
          features including job acceptance, appointment confirmation, and
          earnings disbursement.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Exceptions for Off-Grid or Private Services
          </Text>
          {"\n"}
          If a service is scheduled in an area with limited or no network
          connectivity ("Off-Grid"), Vendors must pre-flag the appointment as an
          Off-Grid Service during booking.
          {"\n"}
          In such cases, the Vendor must manually confirm service commencement
          and completion within the Platform immediately upon regaining
          connectivity.
          {"\n"}
          Sharplook reserves the right to limit Off-Grid appointments for safety
          reasons and may subject such bookings to additional verification.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Service Completion & Payment Triggers
          </Text>
          {"\n"}
          Service completion must be logged by the Vendor within the Platform,
          accompanied by location data or manual confirmation when applicable.
          {"\n"}
          Payment disbursements are directly linked to verified location and
          service completion status.
          {"\n"}
          Any discrepancies between reported location and logged service data
          may result in delayed payment, dispute escalation, or investigation by
          Sharplook.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Monitoring and Compliance
          </Text>
          {"\n"}
          Sharplook reserves the right to audit location activity and service
          records to maintain Platform integrity and prevent fraud or misuse.
          {"\n"}
          Continued failure to maintain accurate location logs or update user
          appointment changes may result in account penalties or suspension.
          {"\n\n"}
          By using Sharplook, Vendors and Users agree to uphold location
          transparency, ensure timely confirmations, and comply with all service
          monitoring protocols for a safer and more reliable community.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            User-Initiated Location Changes
          </Text>
          {"\n"}
          When a User changes their appointment location after initial booking,
          the Vendor is obligated to promptly update the new location within the
          Platform interface and acknowledge the change before proceeding.
          {"\n"}
          Failure to log and confirm updated service locations may result in
          liability for missed appointments, incomplete services, or breach of
          platform safety protocols.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Safety and Monitoring
          </Text>
          {"\n"}
          Location data collected and retained is used exclusively for
          operational purposes, fraud prevention, and customer protection, and
          is handled in accordance with Sharplook's Privacy Policy.
          {"\n"}
          Sharplook reserves the right to verify and audit location activity to
          maintain service integrity and platform standards.
          {"\n\n"}
          By continuing to use Sharplook, Vendors and Users acknowledge and
          accept the importance of location-based features and agree to comply
          fully with the provisions herein.
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
