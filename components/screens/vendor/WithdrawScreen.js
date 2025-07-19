import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OutlineTextInput from "../../reusuableComponents/inputFields/OutlineTextInput";
import Dropdown from "../../reusuableComponents/inputFields/Dropdown";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";

export default function WithdrawScreen({ navigation }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");

  // Placeholder for bank dropdown and account name
  const accountName = "Raji Balikis";

  const bankOptions = [
    { label: "Access Bank", value: "access" },
    { label: "Citibank", value: "citibank" },
    { label: "Ecobank", value: "ecobank" },
    { label: "Fidelity Bank", value: "fidelity" },
    { label: "First Bank", value: "firstbank" },
    { label: "First City Monument Bank (FCMB)", value: "fcmb" },
    { label: "Globus Bank", value: "globus" },
    { label: "Guaranty Trust Bank (GTB)", value: "gtb" },
    { label: "Heritage Bank", value: "heritage" },
    { label: "Keystone Bank", value: "keystone" },
    { label: "Polaris Bank", value: "polaris" },
    { label: "Providus Bank", value: "providus" },
    { label: "Stanbic IBTC Bank", value: "stanbic" },
    { label: "Standard Chartered Bank", value: "standardchartered" },
    { label: "Sterling Bank", value: "sterling" },
    { label: "Suntrust Bank", value: "suntrust" },
    { label: "Union Bank", value: "union" },
    { label: "United Bank for Africa (UBA)", value: "uba" },
    { label: "Unity Bank", value: "unity" },
    { label: "Wema Bank", value: "wema" },
    { label: "Zenith Bank", value: "zenith" },
  ];

  return (
    <View className="flex-1 pb-10 bg-white">
      {/* Header */}
      <View className="pt-[60px] pb-4 px-4 bg-white flex-row items-center justify-between shadow-sm">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text
          className="flex-1 text-center text-[18px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Withdraw
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <Text
          className="text-[14px] mt-6 mb-4"
          style={{ fontFamily: "latoBold" }}
        >
          Please fill the details below
        </Text>

        {/* Account Number */}
        <OutlineTextInput label="Enter Account Number" value={accountNumber} />
        <Dropdown
          label="Select Bank"
          value={bank}
          options={bankOptions}
          onValueChange={setBank}
          placeholder="Select Bank"
        />
        <Text
          className="text-[12px] text-primary -mt-3 mb-4"
          style={{ fontFamily: "poppinsRegular" }}
        >
          {accountName}
        </Text>
        <View className="-mt-1">
          <OutlineTextInput label="Enter Amount" value={amount} />
        </View>
      </ScrollView>

      {/* Withdraw Button */}
      <View className="px-4 pb-6 bg-white">
        <AuthButton title="Withdraw" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}
