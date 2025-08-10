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

export default function TermsOfUseBookingPoliciesScreen() {
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
          Booking and Appointment Policies
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
          <Text style={{ fontFamily: "poppinsBold" }}>Scheduling:</Text>{" "}
          Appointments can be booked through our online booking system. All
          bookings are subject to availability.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Cancellation, Refunds and Job Status Policy
          </Text>
          {"\n\n"}
          Users and Vendors must adhere to the following cancellation protocols
          regarding service engagements initiated through the Sharplook
          application ("Platform"):
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>Pending Jobs</Text>
          {"\n"}A "Pending Job" refers to any service request that has been
          accepted by the Vendor but is yet to be fulfilled.
          {"\n"}
          Users may cancel a Pending Job within Twenty (20) minutes of
          confirmation without incurring any penalty. However, Cancellations
          made after twenty(20) minutes shall attract a penalty of ….%, and only
          fifty percent (50%) of the original booking fee will be refunded. No
          refunds shall be made for cancellations occurring after the scheduled
          service start time.
          {"\n"}
          frequent last-minute cancellations may result in limited access to
          booking features or temporary suspension of account privileges.
          {"\n"}
          Vendors retain the right to cancel pending jobs due to unforeseen
          circumstances, subject to timely notification to the User via the
          Platform.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>Completed Jobs</Text>
          {"\n"}A "Completed Job" refers to any service that has been rendered
          and marked as completed by the Vendor through the Platform.
          {"\n"}
          Cancellation of a Completed Job is not permitted. If there is a
          dispute regarding the service quality or delivery, Users may raise a
          formal complaint through the app's support or dispute resolution
          mechanism.
          {"\n"}
          Refunds or partial credits for completed jobs will only be granted in
          accordance with Sharplook's Refund and Dispute Policy, following
          investigation and verification
          {"\n\n"}
          Sharplook reserves the right to monitor and review cancellation
          patterns to ensure fair use of the Platform and protect Vendors from
          misuse.
          {"\n"}
          Repeated abuse of the cancellation feature, fraudulent activity, or
          chargebacks may lead to account termination.
          {"\n"}
          Any financial transactions affected by cancellations shall be
          processed in accordance with Sharplook's payment processing timelines
          and third-party service provider terms.
          {"\n\n"}
          By continuing to use Sharplook, Users acknowledge and accept the terms
          outlined in this Cancellation and Job Status Policy.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Vendor No-Show and Service Default
          </Text>
          {"\n"}
          Vendor Service Obligations and Penalties: Where a User successfully
          books a Vendor for a service and the Vendor fails to show up or does
          not deliver the agreed service without prior notice or justifiable
          reason, the Vendor shall be charged a penalty fee of …… %] of the
          total service fee. Repeated occurrences may lead to temporary
          suspension or permanent deactivation of the Vendor's account at the
          discretion of the Platform.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Vendor Subscription Requirement
          </Text>
          {"\n"}
          Platform Access and Subscription Fees: All Vendors seeking to onboard
          and operate on the Platform must pay a mandatory subscription fee of
          Five Thousand Naira (₦5,000).
          {"\n\n"}
          To access full vendor functionalities-such as posting multiple
          products and reaching a wider user base. Vendors are required to
          upgrade their account by making a payment of Twenty Thousand Naira
          (₦20,000).
          {"\n\n"}
          This upgrade grants enhanced visibility and extended access to posting
          and promotional features.
          {"\n\n"}
          Where a Vendor opts for the standard subscription fee only, access
          will be limited to profile display functionality only, without product
          posting or promotional privileges. The Platform reserves the right to
          regulate access features and to suspend or terminate any Vendor
          account found to be in violation of these terms.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Off-Platform Conduct and Liability
          </Text>
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Unauthorized Service Delivery by Vendors:
          </Text>{" "}
          Vendors listed on the Sharplook application are required to conduct
          all service delivery through the application platform unless explicit
          written consent is obtained from the application owner.
          {"\n\n"}
          Where a Vendor renders any service outside the application without
          such consent, Sharplook reserves the right to impose a cumulative fee
          on each unauthorized service delivered, based on prevailing rates or
          estimated service value.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Post-Transaction Off-Platform Bookings and Client Indemnity:
          </Text>{" "}
          Once a transaction or service has been concluded on the application,
          any subsequent booking of the Vendor by a Client outside the platform
          is deemed off-platform conduct. In such instances, the Client shall
          indemnify Sharplook against any loss, damage, or claim arising from
          the Vendor-client relationship. Sharplook bears no responsibility for
          disputes, dissatisfaction, or service failures occurring outside the
          bounds of the platform.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Defamation and Reputational Harm:
          </Text>{" "}
          In the event that a Client publishes defamatory, misleading, or
          slanderous content on social media or other public channels against
          Sharplook, where such content stems from a service booked outside the
          application, Sharplook reserves the right to institute legal action
          against the Client to the full extent permitted by law, including
          seeking damages for reputational harm.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Misuse of Sharplook Branding by Vendors:
          </Text>{" "}
          Any Vendor who uses the Sharplook name, logo, branding, or associated
          intellectual property to deliver a service not authorized by the
          platform shall be subject to immediate legal action. Sharplook will
          pursue remedies for the unauthorized use of its identity, including
          injunctions, compensation, and enforcement under applicable trademark
          and business protection laws.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>In-App Calling</Text>
          {"\n\n"}
          Sharplook provides users with the ability to initiate voice calls with
          beauty technicians and Vendors directly within the mobile application
          ("In-App Calling"). By using this feature, the User acknowledges and
          agrees to the following:
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Purpose of Communication:
          </Text>{" "}
          In-App Calling is solely intended to facilitate service-related
          communication between Users and Vendors, including inquiries,
          scheduling appointments, service clarification, and post-service
          feedback.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Privacy & Data Handling:
          </Text>{" "}
          Sharplook may facilitate, or route calls through third-party
          communication services. While efforts are made to safeguard user
          privacy, Sharplook does not record or store the content of calls.
          Metadata such as call duration and timestamps may be retained for
          operational, analytical, and security purposes, in accordance with our
          Privacy Policy.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>User Conduct:</Text> Users
          shall engage with Vendors respectfully and professionally. Harassment,
          abuse, or any form of misconduct during calls is strictly prohibited.
          Sharplook reserves the right to suspend or terminate access to the
          calling feature in cases of reported or detected misuse.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            No Guarantee of Availability:
          </Text>{" "}
          Vendors may not be available at all times to receive calls. Sharplook
          does not guarantee call connectivity or service availability, and
          shall not be liable for missed connections, call failures, or disputes
          arising from verbal interactions.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            Limitations of Liability:
          </Text>{" "}
          Sharplook is not a party to the communications between Users and
          Vendors and disclaims all liability related to the substance,
          consequences, or outcomes of such calls. Any agreements,
          representations, or arrangements made during calls are strictly
          between the User and the Vendor.
          {"\n\n"}
          By utilizing the In-App Calling feature, Users confirm that they
          understand and accept the risks and responsibilities associated with
          direct voice communication.
          {"\n\n"}
          <Text style={{ fontFamily: "poppinsBold" }}>
            External App Calling
          </Text>
          {"\n\n"}
          To facilitate seamless interactions between Users and Service
          Providers, Sharp Look incorporates an External voice call within the
          application through third-party telecommunication or internet service
          providers.
          {"\n\n"}
          By using Sharp Look, both Users and Service Providers consent to the
          initiation of external communication initiated through the app's
          interface.
          {"\n"}
          These communications may be conducted via phone networks, or
          integrated APIs, as required to establish real-time engagement between
          the parties.
          {"\n"}
          Users and Service Providers are responsible for any charges incurred
          through their mobile or data carriers when using external
          communication features
        </Text>
      </ScrollView>
    </View>
  );
}
