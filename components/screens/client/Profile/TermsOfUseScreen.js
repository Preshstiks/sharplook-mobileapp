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

export default function TermsOfUseScreen() {
  const navigation = useNavigation();
  const handleEmailPress = () => {
    Linking.openURL("mailto:hello@sharplook.beauty");
  };
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
          Welcome to SharpLook (“we,” “our,” or “us”). Please read these Terms
          of Use (“Terms”) carefully before using our Mobile Application
          (Application) and any services offered through the Site. By accessing
          or using our Mobile Application, you agree to be bound by these Terms
          and our [Privacy Policy]. If you do not agree with these Terms, please
          do not use our Application. 1. Acceptance of Terms By accessing and
          using our Mobile application, you accept and agree to be bound by
          these Terms and our Privacy Policy. If you do not agree to these
          Terms, please do not use our mobile application. 2. Changes to Terms
          We reserve the right to modify or replace these Terms at any time. We
          will provide notice of changes by updating the “Last Updated” date
          above. Your continued use of the Site after any such changes
          constitutes your acceptance of the new Terms. 3. Eligibility Vendor
          Eligibility Requirements Minimum Age Requirement for Vendor Listing :
          To be eligible for listing on the application as a Vendor, individuals
          must be at least eighteen (18) years of age at the time of
          registration. By applying to be listed, Vendors confirm that they meet
          this age requirement. The Platform reserves the right to suspend or
          terminate any Vendor account found to be in violation of this
          eligibility condition. User Access and Parental Guidance User
          Eligibility and Minor Supervision : The application is accessible to
          Users of all ages. However, where a User is a minor , access to and
          use of the application must be done under the supervision and guidance
          of a parent or legal guardian. The Platform shall not be held liable
          for any unauthorized use of the application by minors without
          appropriate supervision. 4. Services Offered Sharp look is a
          beauty-focused digital application designed to connect Users with a
          curated network of professional service providers, including
          hairstylists, barbers, nail technicians, and massage therapists. The
          application facilitates seamless discovery and booking of beauty and
          wellness services based on the User’s location, promoting convenience,
          accessibility, and trusted connections within the beauty industry. 5.
          User Accounts 5.1 Registration: To access certain features, you may
          need to create an account. You agree to provide accurate, current, and
          complete information during registration and to update such
          information to keep it accurate. Entity Level Acceptance If you are
          using the account on behalf of an entity, you represent and warrant
          that you have the authority to bind that entity to these Terms and by
          accepting these Terms, you are doing so on behalf of that entity (and
          all references to "you" in these Terms shall refer to that entity)
          Registration To access specific products on the mobile application,
          you may be required to submit certain details (including
          identification and contact information) either during the initial
          registration process or throughout your continued use of the
          application. All information provided to SharpLook must be accurate,
          current, and complete. You are responsible for promptly notifying
          SharpLook of any changes or updates to such information. Account
          Security You are solely responsible for maintaining the
          confidentiality of your account credentials, including your password.
          Any activity conducted under your account will be presumed to have
          been authorized by you. If you suspect or become aware of any
          unauthorized access or use of your account, you must notify us
          immediately. 6. Location Tracking and Update Requirements To ensure
          safety, accurate service delivery, and effective monitoring across the
          Sharplook platform (“Platform”), the following obligations apply to
          all Vendors and Users: Vendor Location Services Vendors are required
          to keep real-time location services enabled while actively using the
          Platform. Location data is used to confirm service delivery, optimize
          vendor-to-client matching, and enhance personal safety during active
          appointments. Disabling location tracking may lead to temporary
          suspension of features including job acceptance, appointment
          confirmation, and earnings disbursement. Exceptions for Off-Grid or
          Private Services If a service is scheduled in an area with limited or
          no network connectivity (“Off-Grid”), Vendors must pre-flag the
          appointment as an Off-Grid Service during booking. In such cases, the
          Vendor must manually confirm service commencement and completion
          within the Platform immediately upon regaining connectivity. Sharplook
          reserves the right to limit Off-Grid appointments for safety reasons
          and may subject such bookings to additional verification. Service
          Completion & Payment Triggers Service completion must be logged by the
          Vendor within the Platform, accompanied by location data or manual
          confirmation when applicable. Payment disbursements are directly
          linked to verified location and service completion status. Any
          discrepancies between reported location and logged service data may
          result in delayed payment, dispute escalation, or investigation by
          Sharplook. Monitoring and Compliance Sharplook reserves the right to
          audit location activity and service records to maintain Platform
          integrity and prevent fraud or misuse. Continued failure to maintain
          accurate location logs or update user appointment changes may result
          in account penalties or suspension. By using Sharplook, Vendors and
          Users agree to uphold location transparency, ensure timely
          confirmations, and comply with all service monitoring protocols for a
          safer and more reliable community. User-Initiated Location Changes
          When a User changes their appointment location after initial booking,
          the Vendor is obligated to promptly update the new location within the
          Platform interface and acknowledge the change before proceeding.
          Failure to log and confirm updated service locations may result in
          liability for missed appointments, incomplete services, or breach of
          platform safety protocols. Safety and Monitoring Location data
          collected and retained is used exclusively for operational purposes,
          fraud prevention, and customer protection, and is handled in
          accordance with Sharplook’s [Privacy Policy]. Sharplook reserves the
          right to verify and audit location activity to maintain service
          integrity and platform standards. By continuing to use Sharplook,
          Vendors and Users acknowledge and accept the importance of
          location-based features and agree to comply fully with the provisions
          herein. 7. Booking and Appointment Policies Scheduling: Appointments
          can be booked through our online booking system. All bookings are
          subject to availability. Cancellation, Refunds and Job Status Policy
          Users and Vendors must adhere to the following cancellation protocols
          regarding service engagements initiated through the Sharplook
          application (“Platform”): Pending Jobs A “Pending Job” refers to any
          service request that has been accepted by the Vendor but is yet to be
          fulfilled. Users may cancel a Pending Job within Twenty (20) minutes
          of confirmation without incurring any penalty. However, Cancellations
          made after twenty(20) minutes shall attract a penalty of ….%, and only
          fifty percent (50%) of the original booking fee will be refunded. No
          refunds shall be made for cancellations occurring after the scheduled
          service start time. frequent last-minute cancellations may result in
          limited access to booking features or temporary suspension of account
          privileges. Vendors retain the right to cancel pending jobs due to
          unforeseen circumstances, subject to timely notification to the User
          via the Platform. Completed Jobs A “Completed Job” refers to any
          service that has been rendered and marked as completed by the Vendor
          through the Platform. Cancellation of a Completed Job is not
          permitted. If there is a dispute regarding the service quality or
          delivery, Users may raise a formal complaint through the app's support
          or dispute resolution mechanism. Refunds or partial credits for
          completed jobs will only be granted in accordance with Sharplook’s
          Refund and Dispute Policy, following investigation and verification
          Sharplook reserves the right to monitor and review cancellation
          patterns to ensure fair use of the Platform and protect Vendors from
          misuse. Repeated abuse of the cancellation feature, fraudulent
          activity, or chargebacks may lead to account termination. Any
          financial transactions affected by cancellations shall be processed in
          accordance with Sharplook’s payment processing timelines and
          third-party service provider terms. By continuing to use Sharplook,
          Users acknowledge and accept the terms outlined in this Cancellation
          and Job Status Policy. Vendor No-Show and Service Default Vendor
          Service Obligations and Penalties: Where a User successfully books a
          Vendor for a service and the Vendor fails to show up or does not
          deliver the agreed service without prior notice or justifiable reason,
          the Vendor shall be charged a penalty fee of …… %] of the total
          service fee. Repeated occurrences may lead to temporary suspension or
          permanent deactivation of the Vendor's account at the discretion of
          the Platform. Vendor Subscription Requirement Platform Access and
          Subscription Fees: All Vendors seeking to onboard and operate on the
          Platform must pay a mandatory subscription fee of Five Thousand Naira
          (₦5,000). To access full vendor functionalities-such as posting
          multiple products and reaching a wider user base. Vendors are required
          to upgrade their account by making a payment of Twenty Thousand Naira
          (₦20,000). This upgrade grants enhanced visibility and extended access
          to posting and promotional features. Where a Vendor opts for the
          standard subscription fee only, access will be limited to profile
          display functionality only, without product posting or promotional
          privileges. The Platform reserves the right to regulate access
          features and to suspend or terminate any Vendor account found to be in
          violation of these terms. Off-Platform Conduct and Liability
          Unauthorized Service Delivery by Vendors : Vendors listed on the
          Sharplook application are required to conduct all service delivery
          through the application platform unless explicit written consent is
          obtained from the application owner. Where a Vendor renders any
          service outside the application without such consent, Sharplook
          reserves the right to impose a cumulative fee on each unauthorized
          service delivered, based on prevailing rates or estimated service
          value. Post-Transaction Off-Platform Bookings and Client Indemnity:
          Once a transaction or service has been concluded on the application,
          any subsequent booking of the Vendor by a Client outside the platform
          is deemed off-platform conduct. In such instances, the Client shall
          indemnify Sharplook against any loss, damage, or claim arising from
          the Vendor-client relationship. Sharplook bears no responsibility for
          disputes, dissatisfaction, or service failures occurring outside the
          bounds of the platform. Defamation and Reputational Harm: In the event
          that a Client publishes defamatory, misleading, or slanderous content
          on social media or other public channels against Sharplook, where such
          content stems from a service booked outside the application, Sharplook
          reserves the right to institute legal action against the Client to the
          full extent permitted by law, including seeking damages for
          reputational harm. Misuse of Sharplook Branding by Vendors: Any Vendor
          who uses the Sharplook name, logo, branding, or associated
          intellectual property to deliver a service not authorized by the
          platform shall be subject to immediate legal action. Sharplook will
          pursue remedies for the unauthorized use of its identity, including
          injunctions, compensation, and enforcement under applicable trademark
          and business protection laws. In-App Calling Sharplook provides users
          with the ability to initiate voice calls with beauty technicians and
          Vendors directly within the mobile application ("In-App Calling"). By
          using this feature, the User acknowledges and agrees to the following:
          Purpose of Communication: In-App Calling is solely intended to
          facilitate service-related communication between Users and Vendors,
          including inquiries, scheduling appointments, service clarification,
          and post-service feedback. Privacy & Data Handling: Sharplook may
          facilitate, or route calls through third-party communication services.
          While efforts are made to safeguard user privacy, Sharplook does not
          record or store the content of calls. Metadata such as call duration
          and timestamps may be retained for operational, analytical, and
          security purposes, in accordance with our [Privacy Policy]. User
          Conduct: Users shall engage with Vendors respectfully and
          professionally. Harassment, abuse, or any form of misconduct during
          calls is strictly prohibited. Sharplook reserves the right to suspend
          or terminate access to the calling feature in cases of reported or
          detected misuse. No Guarantee of Availability: Vendors may not be
          available at all times to receive calls. Sharplook does not guarantee
          call connectivity or service availability, and shall not be liable for
          missed connections, call failures, or disputes arising from verbal
          interactions. Limitations of Liability: Sharplook is not a party to
          the communications between Users and Vendors and disclaims all
          liability related to the substance, consequences, or outcomes of such
          calls. Any agreements, representations, or arrangements made during
          calls are strictly between the User and the Vendor. By utilizing the
          In-App Calling feature, Users confirm that they understand and accept
          the risks and responsibilities associated with direct voice
          communication. External App Calling To facilitate seamless
          interactions between Users and Service Providers, Sharp Look
          incorporates an External voice call within the application through
          third-party telecommunication or internet service providers. By using
          Sharp Look, both Users and Service Providers consent to the initiation
          of external communication initiated through the app’s interface. These
          communications may be conducted via phone networks, or integrated
          APIs, as required to establish real-time engagement between the
          parties. Users and Service Providers are responsible for any charges
          incurred through their mobile or data carriers when using external
          communication features 7. Payment Terms Fees: All prices are listed in
          Naira and are subject to change with notice. Payment Methods: We
          accept credit cards and debit cards payments. Billing: By providing
          payment information, you authorize us to charge the applicable fees
          for the services you select. 8. Intellectual Property Ownership: All
          content on the Site, including text, graphics, logos, images, and
          software, is the property of SharpLook or its content suppliers and is
          protected by intellectual property laws. Restrictions: You may not
          reproduce, distribute, modify, create derivative works of, publicly
          display, or exploit any content without our prior written consent. 9
          Prohibited Activities You agree not to: Use the Site for any unlawful
          purpose. Engage in any activity that interferes with or disrupts the
          Site. Attempt to gain unauthorized access to our systems or data. Use
          automated scripts or bots to access or interact with the Site. Engage
          in any form of harassment, abuse, or harm towards others on the Site.
          10 Third Party Links Our Site may contain links to third party
          websites or services. We do not control and are not responsible for
          the content, privacy policies, or practices of any third parties. We
          encourage you to review the terms and policies of any third party
          sites you visit. 11. Disclaimers Accuracy of Information: While we
          strive to provide accurate and up to date information, we make no
          warranties regarding the completeness, reliability, or accuracy of the
          Site's content. Services: We do not guarantee that the services will
          be uninterrupted, errorfree, or free from viruses or other harmful
          components. 12. Limitation of Liability To the fullest extent
          permitted by law, SharpLook shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages, or any loss
          of profits or revenues, whether incurred directly or indirectly,
          arising from your use of the Site or services. 13. Indemnification You
          agree to defend, indemnify, and hold harmless SharpLook, its
          affiliates, licensors, and service providers from and against any
          claims, liabilities, damages, judgments, awards, losses, costs, or
          expenses arising out of or relating to your violation of these Terms
          or your use of the Site. 14. Termination We may terminate or suspend
          your access to the Site immediately, without prior notice or
          liability, for any reason, including if you breach these Terms. Upon
          termination, your right to use the Site will cease immediately. 15.
          Governing Law These Terms shall be governed and construed in
          accordance with the laws of the Federal Republic of Nigeria, without
          regard to its conflict of law provisions. 16. Dispute Resolution
          Process In the event of a disagreement between a User and a Vendor
          regarding the quality, delivery, or fulfilment of a service booked via
          the Sharplook platform (“Platform”), the following dispute resolution
          protocol shall apply: Submission of Dispute: Either party may initiate
          a dispute by submitting a formal complaint through the Platform within
          24 hours of the service being marked as completed. Investigation
          Period: Upon receipt of a valid dispute, Sharplook will conduct an
          impartial investigation within a 48-hour window. Parties may be
          required to provide supporting evidence, including but not limited to
          service descriptions, communication records, images, or feedback.
          Escrow Mechanism: During the dispute window, payment for the disputed
          service will be held in escrow. Neither party shall receive
          disbursement until a final decision is reached by Sharplook Outcome
          and Resolution: If Sharplook determines that the service was
          satisfactorily delivered in accordance with the Platform’s standards,
          the escrowed funds will be released to the Vendor. If it is concluded
          that the service was not delivered as agreed or was materially
          deficient, the User will be issued a full or partial refund, depending
          on the circumstances. All decisions made by Sharplook are final and
          binding unless otherwise required by applicable law. Limitations and
          Rights: Sharplook acts solely as a neutral facilitator and does not
          represent either party. The Platform does not assume liability for
          service quality or fulfillment, and its role in dispute resolution is
          limited to administrative mediation. Any disputes arising out of or
          related to these Terms, or the Site shall be resolved through binding
          mediation in Nigeria, except that you may assert claims in small
          claims court if applicable. 17. Severability If any provision of these
          Terms is found to be unenforceable or invalid, that provision will be
          limited or eliminated to the minimum extent necessary, and the
          remaining provisions will remain in full force and effect. 18. Entire
          Agreement These Terms constitute the entire agreement between you and
          SharpLook regarding your use of the Site and supersede all prior
          agreements and understandings. 19. Contact Us If you have any
          questions about these Terms, please contact us at:
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
