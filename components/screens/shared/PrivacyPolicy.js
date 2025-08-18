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

export default function AuthPrivacyPolicy() {
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
          Privacy Policy
        </Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
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
          Welcome to SharpLook, a mobile application developed by FranBoss Dammy
          Nigeria Limited ("we," "us," or "our") that seamlessly connects users
          with hairstylists, barbers, nail technicians, pedicurists and massage
          therapists based on their location. We are committed to protecting
          your privacy and ensuring the security of your personal data in
          compliance with the Nigeria Data Protection Act (2023) and other
          relevant laws and regulations. This Privacy Policy explains what
          personal data the SharpLook application collects, and what we do with
          it. Please take the time to read through it carefully. If you have any
          questions, please send them to us at{" "}
          <TouchableOpacity onPress={handleEmailPress}>
            <Text className="text-primary underline -mb-1">
              hello@sharplook.beauty
            </Text>
          </TouchableOpacity>
          .
          <Text className="inline-flex">
            FranBoss Dammy Nigeria Limited, a company duly incorporated under
            the laws of Nigeria, acts as the data controller in respect of all
            Personal Data collected through its Mobile Application. The company
            is responsible for determining the purposes and means of processing
            such data and ensuring compliance with applicable data protection
            regulations, including the Nigeria Data Protection Act 2023. Please
            note that while our primary servers are securely hosted in the
            United States, all Personal Data collected is processed under strict
            legal and contractual safeguards that protect your rights and
            privacy. Privacy policy This privacy policy ("Policy") describes how
            SharpLook ("Mobile Application", "we", "us" or "our") collects,
            protects and uses the personally identifiable information ("Personal
            Information") you ("User", "you" or "your") may provide in the
            SharpLook mobile application and any of its products or services
            (collectively, "Mobile Application" or "Services"). It also
            describes the choices available to you regarding our use of your
            Personal Information and how you can access and update this
            information. This Policy does not apply to the practices of
            companies that we do not own or control, or to individuals that we
            do not employ or manage. Automatic collection of information When
            you open the Mobile Application, our servers automatically records
            information that your device sends. This data may include
            information such as your device's IP address and location, device
            name and version, operating system type and version, language
            preferences, information you search for in our Mobile Application,
            access times and dates, and other statistics. Information collected
            automatically is used only to establish statistical information
            regarding Mobile Application traffic and usage. Collection of
            personal information You will be asked to provide certain Personal
            Information (for example, your name and e-mail address), that can be
            used to contact or identify you while using our Service. We receive
            and store any information you knowingly provide to us when you
            create an account, publish content, or fill any online forms in the
            Mobile Application. When required, this information may include the
            following: Personal Information : When you register, we collect your
            name, email address, phone number and password for authentication
            purposes. Account details such as user name, unique user ID,
            password. Payment Information: When booking services, you would be
            asked to provide your payment details through our third-party
            payment processors in order for your payment to be validated and
            processed. We do not store your payment details on our servers. We
            may also ask you to provide additional information when taking a
            survey or providing feedback or inquiries. We do not sell or rent
            your personal information to third parties. Cookies and Usage Data
            We use cookies and similar tracking technologies to track the
            activity on our Service and hold certain information. Cookies are
            files with small amount of data which may include an anonymous
            unique identifier. Cookies are sent to your browser from a website
            and stored on your device. Tracking technologies also used are
            beacons, tags, and scripts to collect and track information and to
            improve and analyze our Service. Examples of Cookies we use: Session
            Cookies. We use Session Cookies to operate our Service. Preference
            Cookies. We use Preference Cookies to remember your preferences and
            various settings. Analytical Cookies: We use analytical cookies to
            recognize and determine the number of user visit to the application;
            this helps to increased user experience and application
            functionality. Security Cookies. We use security Cookies to enhance
            the safety of your online sessions. These cookies help protect
            sensitive data and reduce the risk of cyberattacks. Targeting
            Cookies: We use targeting cookies to track your online behaviors on
            the application and to deliver personalized services to you based on
            your interests. You may instruct your browser to refuse all cookies
            or to indicate when a cookie is being sent. However, if you do not
            accept cookies, you may not be able to use some portions of our
            Service. Unless you have configured your browser to reject cookies,
            our system will automatically place cookies on your device when you
            access our application. How we Share your Personal Information We
            will retain and use your Personal Information for the following
            Purposes ; Sharing With Service Professionals : In order to ensure
            effective service delivery, we would share your name, contact
            details , geographical location(if consented) and appointment
            references with the relevant hairstylist, barber, and nail
            technician, pedicurist or massage therapist. We may receive
            information about you from hairstylists, barbers, nail technicians,
            pedicurists, or massage therapists, such as appointment details or
            feedback. 2. Use by Third-Party Payment Processor: Our payment
            processor may share transaction-related data to confirm payments or
            process refunds. Engagement of Service Providers: We engage
            third-party providers (e.g, cloud hosing, analytics or customer
            support services) located in the United States , who process data on
            our behalf under strict data protection agreements compliant with
            the Nigeria Data Protection Act 2023. Legal and Regulatory
            Compliance: We may disclose data if required by law, such as in
            response to a court order, regulatory request, or to comply with
            Nigerian tax or financial regulations. Business Transfers: In the
            event of a merger, acquisition, or sale of assets, your data may be
            transferred to the acquiring entity, with safeguards to protect your
            privacy. We do not sell your personal data to third parties.
            Aggregated and Anonymized Data: We may use any aggregated data
            derived from or incorporating your Personal Information after you
            update or delete it, but not in a manner that would identify you
            personally. Once the retention period expires, Personal Information
            shall be deleted. Therefore, the right to access, the right to
            erasure, the right to rectification and the right to data
            portability cannot be enforced after the expiration of the retention
            period. Managing Personal Information You are able to delete certain
            Personal Information we have about you. The Personal Information you
            can delete may change as the Mobile Application or Services change.
            When you delete Personal Information, however, we may maintain a
            copy of the unrevised Personal Information in our records for the
            duration necessary to comply with our obligations to our affiliates
            and partners, and for the purposes described below. If you would
            like to delete your Personal Information or permanently delete your
            account, you can do so on the settings page of your account in the
            Mobile Application. Use and processing of collected information In
            order to make our Mobile Application and Services available to you,
            or to meet a legal obligation, we need to collect and use certain
            Personal Information. If you do not provide the information that we
            request, we may not be able to provide you with the requested
            products or services. Some of the information we collect is directly
            from you via our Mobile Application. Any of the information we
            collect from you may be used for the following purposes: Create and
            manage user accounts Third-Party Payment Processor Respond to
            inquiries and offer customer care and support Request user feedback
            Improve user experience Third-Party Service Providers Administer
            prize draws and competitions Enforce terms and conditions and
            policies Protect from abuse and malicious users Respond to legal
            requests and prevent harm Run and operate our Mobile Application and
            Services Business Transfers in the event of a merger or acquisition
            To provide and maintain the Service To notify you about changes to
            our Service To allow you to participate in interactive features of
            our Service when you choose to do so To provide analysis or valuable
            information so that we can improve the Service Processing your
            Personal Information depends on how you interact with our Mobile
            Application, where you are located in the world and if one of the
            following applies: (i) You have given your consent for one or more
            specific purposes. This, however, is subject to Nigeria Data
            Protection Regulations; (ii) Provision of information is necessary
            for the performance of an agreement with you and/or for any
            pre-contractual obligations thereof; (iii) Processing is necessary
            for compliance with a legal obligation to which you are subject;
            (iv) Processing is related to a task that is carried out in the
            public interest or in the exercise of official authority vested in
            us; (v) Processing is necessary for the purposes of the legitimate
            interests pursued by us or by a third party. Usage Data We may also
            collect information that your browser sends whenever you visit our
            Service or when you access the Service by or through a mobile device
            ("Usage Data"). This Usage Data may include information such as your
            computer's Internet Protocol address (e.g. IP address), browser
            type, browser version, the pages of our Service that you visit, the
            time and date of your visit, the time spent on those pages, unique
            device identifiers and other diagnostic data. When you access the
            Service by or through a mobile device, this Usage Data may include
            information such as the type of mobile device you use, your mobile
            device unique ID, the IP address of your mobile device, your mobile
            operating system, the type of mobile Internet browser you use,
            unique device identifiers and other diagnostic data. Information
            transfer and storage Depending on your location, data transfers may
            involve transferring and storing your information in a country other
            than your own. You are entitled to learn about the legal basis of
            information transfers to a country outside Nigeria and about the
            security measures taken by us to safeguard your information. Your
            information, including Personal Data, may be transferred to — and
            maintained on — computers located outside of your state, province,
            country or other governmental jurisdiction where the data protection
            laws may differ than those from your jurisdiction. If you are
            located outside Nigeria and choose to provide information to us,
            please note that we transfer the data, including Personal Data, to
            Nigeria and process it there. Your consent to this Privacy Policy
            followed by your submission of such information represents your
            agreement to that transfer. Service Providers We may employ third
            party companies and individuals to facilitate our Service ("Service
            Providers"), to provide the Service on our behalf, to perform
            Service-related services or to assist us in analyzing how our
            Service is used. These third parties have access to your Personal
            Data only to perform these tasks on our behalf and are obligated not
            to disclose or use it for any other purpose. Privacy of children We
            do not knowingly collect any Personal Information from children
            under the age of 18. If you are under the age of 18, please do not
            submit any Personal Information through our Mobile Application or
            Service. We encourage parents and legal guardians to monitor their
            children's Internet usage and to help enforce this Policy by
            instructing their children never to provide Personal Information
            through our Mobile Application or Service without their permission.
            If you have reason to believe that a child under the age of 18 has
            provided Personal Information to us through our Mobile Application
            or Service, please contact us. You must also be at least 18 years of
            age to consent to the processing of your Personal Information in
            your country (in some countries we may allow your parent or guardian
            to do so on your behalf). Newsletters We offer electronic
            newsletters to which you may voluntarily subscribe at any time. We
            are committed to keeping your e-mail address confidential and will
            not disclose your email address to any third parties except as
            allowed in the information use and processing section. We will
            maintain the information sent via e-mail in accordance with
            applicable laws and regulations. In compliance with the Nigerian
            Data Processing Regulations, all e-mails sent from us will clearly
            state who the e-mail is from and provide clear information on how to
            contact the sender. You may choose to stop receiving our newsletter
            or marketing emails by following the unsubscribe instructions
            included in these emails or by contacting us. However, you will
            continue to receive essential transactional emails. Links to other
            mobile applications Our Mobile Application contains links to other
            mobile applications that are not owned or controlled by us. Please
            be aware that we are not responsible for the privacy practices of
            such other mobile applications or third parties. We encourage you to
            be aware when you leave our Mobile Application and to read the
            privacy statements of each and every mobile application that may
            collect Personal Information. Information security We secure
            information you provide on computer servers in a controlled, secure
            environment, protected from unauthorized access, use, or disclosure.
            We maintain reasonable administrative, technical, and physical
            safeguards in an effort to protect against unauthorized access, use,
            modification, and disclosure of Personal Information in its control
            and custody. However, no data transmission over the Internet or
            wireless network can be guaranteed. Therefore, while we strive to
            protect your Personal Information, you acknowledge that (i) there
            are security and privacy limitations of the Internet which are
            beyond our control; (ii) the security, integrity, and privacy of any
            and all information and data exchanged between you and our Mobile
            Application cannot be guaranteed; and (iii) any such information and
            data may be viewed or tampered with in transit by a third-party,
            despite best efforts. Data breach In the event we become aware that
            the security of the Mobile Application has been compromised, or
            users Personal Information has been disclosed to unrelated third
            parties as a result of external activity, including, but not limited
            to, security attacks or fraud, we reserve the right to take
            reasonably appropriate measures, including, but not limited to,
            investigation and reporting, as well as notification to and
            cooperation with law enforcement authorities. In the event of a data
            breach, we will make reasonable efforts to notify affected
            individuals if we believe that there is a reasonable risk of harm to
            the user as a result of the breach or if notice is otherwise
            required by law. When we do, we will post a notice in the Mobile
            Application, send you an email, get in touch with you over the
            phone. Legal disclosure We will, without prior notification to you,
            disclose any information we collect, use or receive if required or
            permitted by law, such as to comply with a subpoena, or similar
            legal process, and when we believe in good faith that disclosure is
            necessary to protect our rights, protect your safety or the safety
            of others, investigate fraud, or respond to a government request. We
            may also disclose any information to protect and defend the rights
            or property of SharpLook, to prevent or investigate possible
            wrongdoing in connection with the Service. Changes and amendments We
            may update this Privacy Policy from time to time at our discretion.
            When changes are made, we will revise the updated date at the bottom
            of this page. We may also provide notice to you in other ways at our
            discretion, such as through contact information you have provided.
            Any updated version of this Privacy Policy will be effective
            immediately upon the posting of the revised Privacy Policy and it is
            your obligation to review the Privacy Policy from time to time. Your
            continued use of the Mobile Application or Services after the
            effective date of the revised Privacy Policy (or such other act
            specified at that time) will constitute your consent to those
            changes. However, we will not, without your consent, use your
            Personal Data in a manner materially different than what was stated
            at the time your Personal Data was collected. Indemnity You
            acknowledge that while using the Services, OTPs or other security
            PINs may be sent to your contact information provided (e-mail, phone
            number, etc) for authentication purposes, being part of your
            Personal Information and you warrant that the contact information is
            true and accessible to you alone. You therefore indemnify the us
            against any loss suffered by us due to compromise or breach of
            information sent to the contact details provided. You also indemnify
            us against any loss suffered for inability to use the Services due
            to non-authentication of your information. Acceptance of this policy
            You acknowledge that we may not be under any obligation to verify
            any Personal Information provided by you, have read this Policy and
            agree to all its terms and conditions. By using the Mobile
            Application or its Services you agree to be bound by this Policy. If
            you do not agree to abide by the terms of this Policy, you are not
            authorized to use or access the Mobile Application and its Services.
            Contacting us If you would like to contact us to understand more
            about this Policy or wish to contact us concerning any matter
            relating to individual rights and your Personal Information, you may
            do so via the Contact Form or send an email to
          </Text>{" "}
          <TouchableOpacity onPress={handleEmailPress}>
            <Text className="text-primary underline -mb-1">
              hello@sharplook.beauty
            </Text>
          </TouchableOpacity>
          . This document was last updated on July 24, 2025
        </Text>
      </ScrollView>
    </View>
  );
}
