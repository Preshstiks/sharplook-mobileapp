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

export default function TermsOfUseOtherTermsScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Use</Text>
        <View style={{ width: 22 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[15px] mt-2" style={{ fontFamily: "latoBold" }}>
          Other Terms
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
          Definitions: "Agreement" means this Data Protection Agreement.
          "Controller" means FranBoss Dammy Nigeria Limited. "Processor" means
          any third-party processor appointed by and on behalf of the Controller
          in connection with this Agreement. "Personal Data" means any
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
          restriction, erasure or destruction. Processing also includes
          transferring Personal Data to third parties. "Security Measures" means
          processes adopted by each Party to protect its Data. Such measures
          include but not limited to protecting systems from hackers,
          cyberattacks, viral attack, data theft, damage by rain, fire or
          exposure to other natural elements. These measures also include
          setting up firewalls, storing data securely with access to specific
          authorised individuals, employing data encryption technologies,
          developing organisational policy for handling personal data (and other
          sensitive or confidential data), protection of email systems and
          continuous capacity building for staff. "Sensitive Data" means (a)
          passport number, driver's license number, or similar identifier (or
          any portion thereof); (b) credit or debit card number (other than the
          masked (last four digits) of a credit or debit card); (c) employment,
          financial, genetic, biometric or health information; (d) racial,
          ethnic, political or religious affiliation, trade union membership, or
          information about sexual life or sexual orientation; (e) account
          passwords; or (f) other information that falls within the definition
          of "special categories of data" under applicable Data Protection Laws.
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
