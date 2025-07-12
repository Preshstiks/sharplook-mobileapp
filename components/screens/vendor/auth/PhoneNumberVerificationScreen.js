import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { AuthInput } from "../../../reusuableComponents/inputFields/AuthInput";
import { MaterialIcons } from "@expo/vector-icons";
export default function PhoneNumberVerificationScreen({ navigation, route }) {
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    navigation.navigate("OTPVerificationScreen", { phone });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-secondary"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 px-6 pt-16">
        <View className="flex-row items-center mb-8 gap-8">
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </Pressable>
          <Text
            style={{ fontFamily: "poppinsSemiBold" }}
            className="text-[16px]"
          >
            Verification with Phone Number
          </Text>
        </View>
        <Text
          className="text-center mb-1 text-[14px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Please fill your phone number below
        </Text>
        <Text
          className="text-center mb-1 text-[12px]"
          style={{ fontFamily: "poppinsRegular" }}
        >
          We will send you an OTP to verify your account
        </Text>
        <AuthInput
          label="Enter Phone Number"
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <View className="px-6 pb-8">
        <TouchableOpacity
          className="bg-[#eb278d] rounded-xl py-4 items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white text-[18px] font-semibold">Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
