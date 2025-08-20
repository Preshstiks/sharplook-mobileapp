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

export default function VendorDataProtectionAgreementScreen() {
  const navigation = useNavigation();
  const handleEmailPress = () => {
    Linking.openURL("mailto:privacy@sharplook.ng");
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
          Data Protection Agreement
        </Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text
          className="text-[16px] mt-2 text-black mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Effective Date: July 24, 2025
        </Text>
        <Text
          className="text-[16px] text-black"
          style={{ fontFamily: "poppinsRegular" }}
        >
          This Data Protection Agreement ("Agreement") is entered into between:
          FranBoss Dammy Nigeria Limited, a company incorporated in Nigeria with
          its registered office at ……("Company", "we", "us", or "our"), the
          owner and operator of the Sharp Look mobile application ("SharpLook
          App"), AND You, a user of the SharpLook App, either as a
          beauty/wellness service provider (e.g., hairstylist, barber, nail
          technician, pedicurist, massage therapist) or as a client ("User",
          "you", or "your"). Definitions "Agreement" means this Data Protection
          Agreement. "Controller" means FranBoss Dammy Nigeria Limited
          "Processor" means any third-party processor appointed by and on behalf
          of the Controller in connection with this Agreement. Data, Data
          Subject, Data Transfer, Personal Data, Personal Data Breach,
          Processing, and Third Party shall have the meaning attached to them in
          the Nigeria Data Protection Act (NDPA) 2023. "Personal Data" means any
          information relating to a Data Subject and containing an identifier
          such as a name, an identification number, location data, photo, email
          address, bank details, posts on social networking websites, medical
          information, and other unique identifier such as but not limited to
          Media Access Control (MAC) address, Internet Protocol (IP) address,
          International Mobile Equipment Identity (IMEI) number, International
          Mobile Subscriber Identity (IMSI) number, Subscriber Identification
          Module (SIM). Personal Data shall include any online identifier or any
          one or more factors specific to the physical, physiological, genetic,
          mental, economic, cultural or social identity of that Data Subject.
          "Processing and process" either mean any activity that involves the
          use of Personal Data or as the Data Protection Laws may otherwise
          define processing or process. It includes any operation or set of
          operations which is performed on Personal Data or sets of Personal
          Data, whether or not by automated means, such as collection,
          recording, organising, structuring, storing, adapting or altering,
          retrieval, consultation, use, disclosure by transmission,
          dissemination or otherwise making available, alignment or combination,
          restriction, erasure or destruction, Processing also includes
          transferring Personal Data to third parties; "Security Measures" means
          processes adopted by each Party to protect its Data. Such measures
          include but not limited to protecting systems from hackers,
          cyberattacks, viral attack, data theft, damage by rain, fire or
          exposure to other natural elements. These measures also include
          setting up firewalls, storing data securely with access to specific
          authorised individuals, employing data encryption technologies,
          developing organisational policy for handling personal data (and other
          sensitive or confidential data), protection of email systems and
          continuous capacity building for staff; "Sensitive Data" means (a)
          passport number, driver's license number, or similar identifier (or
          any portion thereof); (b) credit or debit card number (other than the
          masked (last four digits) of a credit or debit card); (c) employment,
          financial, genetic, biometric or health information; (d) racial,
          ethnic, political or religious affiliation, trade union membership, or
          information about sexual life or sexual orientation; (e) account
          passwords; or (f) other information that falls within the definition
          of "special categories of data" under applicable Data Protection Laws.
          2. PURPOSE OF THIS AGREEMENT This Agreement outlines how personal data
          collected, stored, processed, and shared through the SharpLook App is
          protected and managed in compliance with the Nigeria Data Protection
          Act (NDPA) 2023 and other applicable data privacy laws. 3. TYPES OF
          PERSONAL DATA COLLECTED In the course of providing and facilitating
          services through our platform, we may collect and process the
          following categories of Personal Data; Data Relating to Clients
          Personal Data collected from or about clients may include: Full name
          Contact details (e.g., email address, phone number) Residential or
          geolocation data (where consented) Profile photograph (optional)
          Appointment history and service preferences Payment information,
          including transaction identifiers and billing details Data Relating to
          Service Providers Personal Data collected from service providers
          (e.g., hairstylists, barbers, massage therapists) may include: Full
          name Business and professional credentials Contact details Official
          identification documents (e.g., government-issued ID) Professional
          certifications and licenses Availability schedule/calendar Geolocation
          data (subject to consent) Ratings, reviews, and feedback received from
          clients Legal Basis for Processing Personal Data In accordance with
          the Nigeria Data Protection Act (NDPA) 2023 and other applicable data
          protection laws, the processing of Personal Data on the SharpLook App
          shall be carried out on the basis of one or more of the following
          lawful grounds: 4.1 Consent Processing may be conducted where the Data
          Subject has explicitly provided informed consent for a specified
          purpose. Consent may be withdrawn at any time without affecting the
          lawfulness of prior processing. 4.2 Contractual Necessity Processing
          is required for the performance of a contract to which the Data
          Subject is a party, or in order to take steps at the request of the
          Data Subject prior to entering into such a contract. This includes the
          provision and management of services through the SharpLook App. 4.3
          Legal Obligation Processing may be necessary to comply with a legal
          obligation to which the Controller is subject, including statutory
          reporting or regulatory requirements. Legitimate Interests Processing
          may be carried out where it is necessary for the pursuit of legitimate
          business interests of the Controller or a Third Party—provided such
          interests are not overridden by the fundamental rights and freedoms of
          the Data Subject. This includes activities related to service
          enhancement, fraud prevention, and security management. Methods of
          Data Collection Personal Data may be collected through one or more of
          the following methods: 5.1 Direct Collection We collect data that you
          voluntarily provide when interacting with our platform, including but
          not limited to: Account registration. Profile updates Service bookings
          and inquiries 5.2 Automated Collection Certain data may be collected
          automatically as you use the SharpLook App. This includes:
          Device-specific identifiers and system information Location data (when
          enabled) Interaction logs, usage statistics, and diagnostic data
          Third-Party Integrations We may also collect data via integrated
          third-party services that support our operations, such as: Payment
          processors Analytics platforms Customer support tools These third
          parties may process your data on our behalf in accordance with
          applicable data protection laws and safeguard. Purpose of Processing
          Personal Data Personal Data collected through the SharpLook App shall
          be processed for one or more of the following legitimate and lawful
          purposes, in accordance with applicable data protection laws: User
          Account Management Service Connection Appointment Coordination Secure
          Payment Processing Customer Support Communication and Engagement Legal
          Compliance and Fraud Prevention Data Sharing and Disclosure SharpLook
          is committed to safeguarding your Personal Data and does not, under
          any circumstances, sell your information to third parties. However, in
          limited and clearly defined contexts, Personal Data may be shared as
          follows: Regulatory and Law Enforcement Authorities We may disclose
          Personal Data to competent governmental, regulatory, or law
          enforcement bodies where such disclosure is mandated by applicable law
          or valid legal process. Service Delivery Purposes Personal Data may be
          shared with other registered users where required to fulfil the core
          functions of the platform including Enabling service visibility,
          confirming appointments and facilitating in-app communications.
          Third-Party Safeguards: All third-party recipients of your Personal
          Data are contractually bound to uphold confidentiality, security, and
          data handling obligations in alignment with this Agreement and the
          Nigeria Data Protection Act (NDPA) 2023 Data Transfer to Foreign
          Jurisdiction Where Personal Data is transferred outside the
          territorial jurisdiction of the Federal Republic of Nigeria, including
          to countries that may not provide an equivalent level of data
          protection, such transfers shall be carried out in accordance with
          applicable laws, including the Nigeria Data Protection Act (NDPA) 2023
          and, where relevant, the General Data Protection Regulation (GDPR). To
          ensure the continued protection of your Personal Data, we implement
          appropriate safeguards, which may include: Data Processing Agreements
          (DPAs): Contractual arrangements with third-party processors to ensure
          compliance with privacy obligations. Standard Contractual Clauses
          (SCCs): Adopted or approved clauses that guarantee adequate protection
          and enforcement of data subject rights in jurisdictions outside
          Nigeria. International Compliance Mechanisms: Where applicable, we may
          rely on adequacy decisions or certifications recognized under the GDPR
          or similar frameworks. All transfers are executed under strict legal
          and technical controls to maintain the integrity, confidentiality, and
          availability of your Personal Data. Data Security Measures We are
          committed to maintaining the confidentiality, integrity, and
          availability of your Personal Data. In accordance with the Nigeria
          Data Protection Act (NDPA) 2023 and industry best practices, we
          implement a combination of technical and organizational security
          measures to guard against unauthorized access, alteration, disclosure,
          or destruction of Personal Data. The Mechanism adopted for these
          measures include but are not limited to; Data Encryption Secure
          Infrastructure Role Based Access Control to authorized personnel only
          Periodic Security updates and Risk-assessments. Data Retention We
          retain your personal data only for as long as necessary to achieve the
          purposes outlined in this agreement: Account Data: Retained while your
          account is active and for 12 months after account deletion, unless
          legally required otherwise (e.g., for audit purposes). Geolocation
          Data: Stored only for the duration of an active booking session,
          unless you consent to ongoing use for personalized recommendations.
          Transaction Data: Retained for 7 years to comply with Nigerian tax and
          financial regulations. Anonymized Data: May be retained indefinitely
          for analytics to improve our Services. Data no longer needed is
          securely deleted or anonymized in accordance with NDPA. Subject Access
          Request In accordance with the Nigeria Data Protection Act (NDPA) 2023
          and other applicable data protection laws, you, as a Data Subject, are
          entitled to exercise the following rights regarding your Personal
          Data: Right of Access You have the right to request confirmation as to
          whether we process your Personal Data and to obtain a copy of such
          data, along with relevant information regarding the nature, purpose,
          and categories of processing. Right to Rectification You may request
          that any inaccurate or incomplete Personal Data be corrected or
          updated without undue delay. Right to Erasure You have the right to
          request the deletion of your Personal Data where; The data is no
          longer necessary for the purpose it was collected, where You withdraw
          your consent and no other legal basis exists or where Erasure is
          required to comply with a legal obligation. Right to Withdraw Consent
          Where processing is based on your consent, you may withdraw such
          consent at any time. This will not affect the lawfulness of processing
          carried out prior to the withdrawal. Right to Lodge a Complaint If you
          believe your data protection rights have been violated, you have the
          right to lodge a formal complaint with the Nigeria Data Protection
          Commission (NDPC) or any competent supervisory authority. Requests
          relating to your Data Rights can be sent to privacy@sharplook.ng DATA
          BREACH NOTIFICATION In the event of a data breach affecting your
          personal data, we will notify you and the relevant authorities within
          the timeline required by applicable law. Modifications to This
          Agreement The Company reserves the right to amend, revise, or update
          the terms of this Agreement at its sole discretion and at any time.
          Any such modifications shall become effective upon publication within
          the SharpLook App, or upon direct communication to users via
          electronic means, including email or in-app notifications. Your
          continued access or use of the SharpLook App following the
          notification of any changes shall constitute your binding acceptance
          of the revised terms. Governing Law This Agreement, including its
          interpretation, validity, performance, and enforcement, shall be
          governed by and construed in accordance with the laws of the Federal
          Republic of Nigeria. The Parties hereby submit to the exclusive
          jurisdiction of the courts of Nigeria for the resolution of any
          dispute arising under or in connection with this Agreement.
        </Text>
        <View>
          <Text>
            Email:{" "}
            <TouchableOpacity onPress={handleEmailPress}>
              <Text className="text-primary underline -mb-1">
                privacy@sharplook.ng
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
