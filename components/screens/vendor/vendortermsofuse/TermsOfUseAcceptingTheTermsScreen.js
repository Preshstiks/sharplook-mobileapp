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

export default function TermsOfUseAcceptingTheTermsScreen() {
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
          Terms of Use
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView className="flex-1 px-4 " showsVerticalScrollIndicator={false}>
        <Text className="text-[15px] mt-2" style={{ fontFamily: "latoBold" }}>
          Accepting the Terms
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
          In accordance with the Nigeria Data Protection Act (NDPA) 2023 and
          other applicable data protection laws, the processing of Personal Data
          on the SharpLook App shall be carried out on the basis of one or more
          of the following lawful grounds: Consent: Processing may be conducted
          where the Data Subject has explicitly provided informed consent for a
          specified purpose. Consent may be withdrawn at any time without
          affecting the lawfulness of prior processing. Contractual Necessity:
          Processing is required for the performance of a contract to which the
          Data Subject is a party, or in order to take steps at the request of
          the Data Subject prior to entering into such a contract. This includes
          the provision and management of services through the SharpLook App.
          Legal Obligation: Processing may be necessary to comply with a legal
          obligation to which the Controller is subject, including statutory
          reporting or regulatory requirements. Legitimate Interests: Processing
          may be carried out where it is necessary for the pursuit of legitimate
          business interests of the Controller or a Third Party—provided such
          interests are not overridden by the fundamental rights and freedoms of
          the Data Subject. This includes activities related to service
          enhancement, fraud prevention, and security management.
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
