import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ServiceLevelAgreementScreen() {
  const navigation = useNavigation();
  const handleEmailPress = () => {
    Linking.openURL("mailto:hello@sharplook.beauty");
  };
  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}
      <View className="pt-[60px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[16px] text-faintDark"
        >
          Service Level Agreement
        </Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text
          className="text-[16px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Last updated: August 5th, 2025
        </Text>
        <Text
          className="text-[16px] text-black"
          style={{ fontFamily: "poppinsRegular" }}
        >
          Sharplook Service Level Agreement (SLA) This Service Level Agreement
          outlines the minimum performance standards, service obligations, and
          responsibilities between registered Vendors and Users of the Sharplook
          mobile application ("Platform"). 1. Scope of Services Vendors agree to
          provide beauty, wellness, and therapeutic services professionally and
          in accordance with service descriptions advertised on the Platform.
          Users agree to book and receive services in good faith and within the
          stated terms provided by each Vendor. 2. Service Availability &
          Response Times To ensure a seamless and reliable experience for Users,
          all Service Providers ("Vendors") on the Sharp Look platform are
          required to uphold high standards of availability and communication.
          Accordingly: Vendors must maintain an up-to-date schedule reflecting
          their accurate service availability. This includes real-time updates
          to their booking calendar, service offerings, and hours of operation.
          Vendors are expected to respond to all booking requests, inquiries,
          and appointment modifications within a maximum of 10 minutes. Failure
          to do so may result in reduced visibility within search results or
          platform notifications. In the event of unforeseen circumstances such
          as delays, cancellations, or changes in availability, Vendors must
          promptly notify affected Users through the Platform's messaging system
          or communication tools. Repeated failure to update availability or
          respond in a timely manner may result in warnings, temporary account
          suspension, or other corrective actions at the discretion of Sharp
          Look. Users are encouraged to provide feedback on Vendor
          responsiveness to help maintain a trustworthy and efficient
          marketplace. 3. Appointment Confirmation and Location Compliance To
          uphold a reliable and secure experience for all users of the Sharp
          Look platform, Vendors are required to adhere strictly to appointment
          protocols and location-based responsibilities. These guidelines are
          designed to promote transparency, punctuality, and the safety of both
          parties: Prompt Appointment Confirmation: Vendors must promptly review
          and confirm all appointment requests received through the platform.
          Confirmations should be issued within a reasonable timeframe to ensure
          planning efficiency and user confidence. Timely Arrival: Vendors are
          expected to arrive at the specified appointment location at or before
          the scheduled time. Excessive lateness or habitual tardiness may
          result in performance reviews, reduced visibility on the platform, or
          disciplinary action. Mandatory Location Services: For safety,
          operational integrity, and location verification, Vendors must keep
          device location services enabled throughout any active appointment.
          This enables real-time monitoring for compliance and facilitates
          support in case of emergency. Location Updates and Change Logging: If
          a User modifies the appointment location prior to the session, the
          Vendor must immediately acknowledge and record the updated details
          within the Platform before initiating the service. This ensures
          alignment between both parties and maintains a verifiable record of
          service changes. Non-Compliance Consequences: Repeated failure to
          follow location protocols, including disabling location services,
          ignoring updates, or failing to arrive at the designated site, may
          lead to temporary suspension, reduced visibility, or termination from
          the Platform. Service Delivery Options and Pricing Structure The Sharp
          Look Platform offers two distinct service delivery modes designed to
          cater to user preferences and convenience. Each mode features its own
          pricing framework, which Vendors must clearly display and maintain
          within the platform: Walk-In Services: This option allows Users to
          visit the Vendor's designated location or storefront to receive
          services. Pricing for walk-in appointments should reflect standard
          service rates. Vendors are responsible for maintaining accurate
          business addresses and available walk-in hours within the Platform.
          Home or Office Services: For added convenience, Users may opt for
          services delivered to a specified location, including residential
          homes or commercial offices. Pricing for this delivery mode may be
          higher than walk-in rates and may account for factors such as travel
          time, logistics, and additional service setup. Vendors are expected to
          disclose all associated fees transparently and ensure that location
          details are confirmed before dispatch. Pricing Transparency and
          Updates: Vendors must provide clear pricing for both service modes and
          update their rates promptly within the Platform if changes occur. Any
          price discrepancies or hidden charges may result in platform penalties
          or user disputes. User Acknowledgement: Users are responsible for
          reviewing the selected service mode and its corresponding rate before
          confirming any appointment. Once confirmed, the rate and service mode
          are deemed accepted by both parties. 4. Quality Assurance &
          Professional Conduct To preserve the integrity of the Sharp Look
          Platform and uphold the trust between Users and Vendors, all parties
          are expected to maintain high standards of professionalism, hygiene,
          and ethical behaviour throughout the course of service delivery. The
          following conditions apply: Industry Standards and Licensing: Vendors
          are required to perform all services in strict accordance with the
          prevailing standards of their profession. This includes possessing and
          maintaining valid licenses, certifications, or permits as required by
          local laws and regulations. Services must be delivered with expertise,
          care, and precision reflective of professional training and
          experience. Use of Proper Equipment and Sanitation Protocols: Vendors
          shall utilize appropriate, professional-grade tools and equipment to
          deliver services. All tools must be properly cleaned, sanitized, and
          stored before and after use in accordance with industry health and
          safety guidelines. Any failure to comply with sanitation protocols may
          result in suspension or removal from the platform. Professionalism and
          Respectful Engagement: Both Users and Vendors must uphold respectful,
          courteous, and professional communication at all times. Any form of
          discrimination, harassment, verbal abuse, intimidation, or
          unprofessional conduct is strictly prohibited. Reporting and
          Enforcement: The Platform reserves the right to investigate reports of
          misconduct, poor service quality, or breach of professional standards.
          Verified complaints may result in warnings, profile restrictions,
          account suspension, or permanent removal from the Platform. Platform
          Reputation: Maintaining the reputation of Sharp Look as a trusted and
          high-quality beauty and wellness platform is a shared responsibility.
          All participants are expected to contribute positively through their
          interactions, feedback, and service quality. 5. Payment Management &
          Dispute Resolution To ensure secure and transparent financial
          transactions across the Sharp Look Platform, all payments related to
          service bookings are processed and managed exclusively through the
          Platform's integrated payment system. The following provisions apply:
          Escrow System and Service Completion: Upon a User's confirmation of a
          booking, the corresponding payment is collected and securely held in
          escrow by the Platform. These funds remain in escrow until the Vendor
          completes the agreed-upon service, and the User verifies satisfactory
          delivery through the Platform. Only after this confirmation will the
          funds be released to the Vendor. Payment Security and Transparency:
          The escrow model ensures protection for both Users and Vendors,
          minimizing risks related to service quality and payment fraud. The
          Platform does not permit off-platform payment arrangements for
          services booked within the app, as these may undermine transactional
          security. Dispute Handling Procedures: In the event that a User
          reports a service issue, dissatisfaction, or breach of terms, the
          payment will remain in escrow pending investigation. Sharp Look's
          Support Team will assess the dispute details, which may include
          service documentation, communication history, and feedback submitted
          by both parties. Resolution Timeline and Outcome: Disputes will be
          reviewed and resolved within forty-eight (48) hours of initiation.
          Based on the outcome of the investigation, Sharp Look reserves the
          right to either release the funds to the Vendor or initiate a partial
          or full refund to the User. Decisions are made in accordance with
          platform policies and service standards. Vendor Cooperation &
          Accountability: Vendors are expected to cooperate with all
          investigation procedures, including providing necessary documentation
          or clarification. Non-responsiveness or misconduct during this period
          may affect the outcome and could result in penalties or profile
          restrictions. 6. Cancellations & No-Shows The Sharp Look Platform
          values reliability and professional accountability. To maintain the
          integrity of services and scheduling for all users, the following
          policies apply: User-Initiated Cancellations: Users may cancel
          appointments that are still in a "pending" status, provided the
          cancellation is made with reasonable notice before the scheduled start
          time. The Platform tracks cancellation patterns. Repeated or excessive
          cancellations, especially without valid reasons, may result in
          temporary suspension of booking privileges or limited access to
          certain services or Vendors. Last-minute cancellations may impact user
          trust ratings, which could affect future booking outcomes.
          Vendor-Initiated Cancellations & No-Shows: Vendors may cancel
          appointments in cases of genuine emergencies or unforeseen
          circumstances. However, such cancellations must be communicated
          promptly through the Platform's tools, and proper documentation may be
          requested. Frequent cancellations or unexplained no-shows by Vendors
          are subject to review and may lead to penalties such as reduced
          profile visibility, restrictions on service offerings, and temporary
          earnings holds. Maintaining consistent attendance is essential for
          Vendor reputation, client retention, and eligibility for platform
          benefits. Completed Appointments & Disputes: Once an appointment is
          marked as completed by the Platform, it cannot be cancelled
          retroactively. Any issues arising from a completed session—including
          disputes over quality, behaviour, or fulfilment—should be formally
          reported using the Platform's built-in Support and Dispute Resolution
          tools. Disputes must be raised within a set timeframe (e.g., 24–48
          hours) after service completion. Resolution will follow the standard
          investigation process as outlined in the Payment and Escrow policy. 7.
          Dispute Resolution To maintain transparency, trust, and a smooth user
          experience across the Sharp Look platform, the following Dispute
          Resolution process applies to all service-related transactions between
          Users and Vendors: Timeframe for Raising Disputes: Users or Vendors
          must initiate any service-related dispute within twenty-four (24)
          hours of the appointment being marked as completed. Disputes raised
          beyond this window may not be eligible for investigation unless
          exceptional circumstances apply and are approved by the Platform.
          Procedure for Filing a Dispute: Disputes must be submitted through the
          designated Sharp Look Support feature within the app, clearly
          outlining the nature of the issue, evidence or supporting
          documentation (such as photos, chat transcripts, or service details).
          The dispute must pertain specifically to service quality, fulfilment
          concerns, misconduct, or payment discrepancies. Investigation and
          Resolution Timeline: Upon receiving a valid dispute, Sharp Look will
          conduct a thorough review within forty-eight (48) hours, examining all
          relevant documentation, communication history, and platform records to
          determine an appropriate resolution. During the investigation, any
          associated funds will remain securely held in escrow to safeguard both
          parties. Outcome and Enforcement: Following the investigation, Sharp
          Look will issue a resolution, which may include a refund to the User,
          full or partial payment release to the Vendor, service credit, or
          other corrective action. All decisions rendered by the Platform are
          considered final and binding and reflect the platform's commitment to
          fairness, professionalism, and policy adherence. Escalation & Platform
          Authority: In rare and complex cases, Sharp Look reserves the right to
          extend the investigation window or consult with external advisors if
          deemed necessary. However, escalation beyond the Platform is not
          supported unless legally mandated. 8. Confidentiality and Data
          Handling Personal data, communications, and location history are
          handled per Sharplook's [Privacy Policy]. No unauthorized sharing is
          permitted. 9. Compliance & Modifications Vendors and Users agree to
          comply with local laws, licensing regulations, and Sharplook's
          platform standards. Sharplook reserves the right to modify this SLA,
          with reasonable notice provided to all parties. 10. Off-Platform
          Conduct and Liability To preserve the integrity, transparency, and
          accountability of all service interactions facilitated through the
          Sharp Look platform, the following terms govern conduct and liability
          pertaining to services arranged or delivered outside of the
          application: Platform-Exclusive Transactions: All appointments,
          communications, and service bookings between Users and Vendors must be
          conducted through the Sharp Look application. This requirement ensures
          secure payment processing, dispute resolution, service quality
          monitoring, and equitable visibility across the platform. Vendor
          Obligation to Disclose Off-Platform Arrangements: In the event that a
          User initiates or requests a booking outside of the Platform, the
          Vendor is required to immediately notify Sharp Look through designated
          channels before the service is rendered. This disclosure enables the
          Platform to maintain accurate records and apply applicable policies
          related to trust, safety, and earnings. Undisclosed Off-Platform
          Services: If a Vendor delivers a service outside of the Platform
          without submitting prior notice to Sharp Look, and the arrangement
          stems from a connection originally established via the application
          (including prior bookings, profile interactions, or promotional
          outreach through Sharp Look), such service will be classified as an
          in-app transaction for the purposes of platform commission and
          reporting. Commission Entitlement: In accordance with this policy,
          Sharp Look reserves the right to deduct or invoice the Vendor for the
          standard platform commission or percentage applicable to the service
          type, location mode (walk-in vs home/office), and transaction value.
          This applies retroactively and may be enforced through account
          withholding, earnings adjustment, or administrative billing.
          Accountability and Enforcement: Repeated failure to disclose
          off-platform bookings, deliberate circumvention of platform systems,
          or participation in unverified transactions may result in: Temporary
          or permanent account suspension Loss of promotional privileges and
          profile visibility Financial penalties or commission recovery actions
          Disqualification from incentive programs, featured listings, or
          partner collaborations User Liability Disclaimer: Sharp Look disclaims
          all liability for services delivered outside the app unless such
          bookings are properly documented and disclosed by the Vendor. Users
          are encouraged to report any attempts by Vendors to bypass the
          platform's booking system. 11. Indemnity By using the Sharp Look
          Platform, all Users and Vendors (The Parties) agree to indemnify,
          defend, and hold harmless Sharp Look, its affiliates, officers,
          directors, employees, and agents from and against any and all claims,
          demands, liabilities, damages, losses, costs, or expenses (including
          reasonable legal fees) arising out of or in connection with: breach of
          any provision of this Agreement or violation of applicable laws;
          Negligent, unlawful, or fraudulent acts committed during or in
          connection with services arranged through or related to the Platform.
          The Participant's misuse of the Platform or engagement in off-platform
          services not properly disclosed. Disputes or claims arising from
          service delivery, communication, or conduct between Users and Vendors.
          This clause shall survive termination of this Agreement and continue
          to apply post-termination. 12. Governing Law & Jurisdiction This
          Agreement and any contractual, tortious, statutory, or other claims
          arising out of or in relation to the use of the Sharp Look Platform
          shall be governed and interpreted in accordance with the laws of the
          Federal Republic of Nigeria, without regard to conflict of law
          principles. Any dispute, controversy, or claim arising under, out of,
          or in connection with this Agreement shall be subject to the exclusive
          jurisdiction of the courts located in Lagos State, Nigeria, and all
          parties expressly submit to such jurisdiction for the resolution of
          disputes. 13. Severability If any provision or portion of this
          Agreement is held to be invalid, unlawful, or unenforceable by a court
          of competent jurisdiction, such provision shall be severed from this
          Agreement, and the remaining provisions shall continue in full force
          and effect. The invalidated portion shall, where feasible, be modified
          to reflect the original intent of the parties in a manner that is
          valid and enforceable under applicable laws. 14. Entire Agreement &
          Final Provisions This SLA, together with any referenced schedules,
          appendices, or policies, constitutes the entire understanding between
          the parties regarding the subject matter herein and supersedes all
          prior communications, representations, or agreements, whether oral or
          written. No amendment or modification to this SLA shall be valid
          unless made in writing and signed by authorized representatives of
          both parties. Both parties acknowledge that they have read,
          understood, and agreed to be bound by the terms of this SLA. 15.
          Acceptance of SLA Terms Both parties confirm that they have read,
          understood, and accepted the terms and conditions contained herein.
          Each party acknowledges its respective obligations and agrees to
          perform its duties in accordance with the service standards,
          timelines, and responsibilities outlined in this Agreement. Continued
          use of the services described herein shall be deemed ongoing
          acceptance of the SLA and any mutually agreed modifications made in
          writing.
        </Text>
        <View>
          <Text>
            Email:{" "}
            <TouchableOpacity onPress={handleEmailPress}>
              <Text className="text-primary underline -mb-1">
                hello@sharplook.beauty
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
