import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { AuthInput } from "../../reusuableComponents/inputFields/AuthInput";
import { MaterialIcons } from "@expo/vector-icons";
import { showToast } from "../../ToastComponent/Toast";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import { PhoneInput } from "../../reusuableComponents/inputFields/PhoneInput";
import { HttpClient } from "../../../api/HttpClient";

export default function ClientVerifyPhoneNumber({ navigation, route }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const email = route?.params?.email;
  const handleSubmit = async () => {
    // Validate phone number
    if (!phone || phone.length < 14) {
      // +234 + 10 digits = 14 characters minimum
      showToast.error("Please enter a valid Nigerian phone number");
      return;
    }

    // Extract just the number part (without +234 for additional validation)
    const numberPart = phone.replace("+234", "");
    if (numberPart.length !== 10) {
      showToast.error("Nigerian phone number must be 10 digits");
      return;
    }

    setLoading(true);
    console.log(String(phone));
    try {
      const res = await HttpClient.post("/auth/send-otp", {
        phone: String(phone), // This will be in format +2348155262536
      });

      navigation.navigate("VerifyWithPhoneOTP", { phone, email });
      showToast.success(res.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || "An unknown error occurred";
        showToast.error(errorMessage);
      } else {
        showToast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isValidPhone = phone && phone.replace("+234", "").length === 10;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-secondary"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="px-6 pt-16">
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
          className="text-center mb-4 text-[12px]"
          style={{ fontFamily: "poppinsRegular" }}
        >
          We will send you an OTP to verify your account
        </Text>

        <PhoneInput
          label="Enter Phone Number"
          placeholder="8123456789"
          value={phone}
          onChangeText={setPhone}
          isPhoneInput={true}
        />
      </View>

      <View className="px-6 pb-[50px]">
        <AuthButton
          onPress={handleSubmit}
          title="Submit"
          isloading={loading}
          disabled={!isValidPhone}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
