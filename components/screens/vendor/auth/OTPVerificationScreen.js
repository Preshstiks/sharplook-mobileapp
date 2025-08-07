import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function OTPVerificationScreen({ navigation, route }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  // Handler for resending OTP
  const handleResend = () => {
    setTimer(60); // Reset timer to 60 seconds (or your preferred value)
    // TODO: Add your resend OTP logic here (e.g., API call)
  };
  const phone = route.params?.phone || "";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (value, idx) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
      // Move to next input if value entered
      if (value && idx < 3) {
        const nextInput = `otpInput${idx + 1}`;
        refs[nextInput]?.focus();
      }

      // Auto-verify when all 4 digits are entered
      if (value && idx === 3) {
        const fullOtp = newOtp.join("");
        if (fullOtp.length === 4) {
          Keyboard.dismiss();
          handleVerify(fullOtp);
        }
      }
    }
  };

  // Refs for OTP inputs
  const refs = {};

  const handleVerify = (otpCode) => {
    const code = otpCode || otp.join("");

    // TODO: Add your OTP verification logic here
    // For now, we'll simulate a verification
    if (code === "1234") {
      // Replace with actual verification logic
      // On successful OTP verification, navigate to the Vendor dashboard
      navigation.replace("Vendor", { screen: "Dashboard" });
    } else {
      // Clear OTP input on error
      setOtp(["", "", "", ""]);
      refs.otpInput0?.focus();
      alert("Invalid OTP. Please try again.");
    }
  };

  // Mask phone number
  const maskedPhone = phone.replace(/(\d{3})\d{4}(\d{2})/, "$1******$2");

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#fff9fc]"
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
            Verification
          </Text>
        </View>
        <Text
          className="text-center mb-1 text-[13px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          We have sent an OTP code to your phone number
        </Text>
        <Text
          style={{ fontFamily: "poppinsMedium" }}
          className="text-center text-[14px] text-primary mb-6"
        >
          {maskedPhone}
        </Text>
        <Text
          style={{ fontFamily: "poppinsRegular" }}
          className="text-center text-[12px] mb-4"
        >
          Please enter the OTP code
        </Text>
        <View className="flex-row justify-center mb-6 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <TextInput
              key={i}
              ref={(ref) => (refs[`otpInput${i}`] = ref)}
              className={`w-14 h-14 border-2 rounded-lg text-center text-xl ${otp[i] ? "border-[#eb278d]" : "border-[#eb278c1c]"}`}
              value={otp[i]}
              onChangeText={(val) => handleOtpChange(val, i)}
              keyboardType="number-pad"
              maxLength={1}
              returnKeyType={i === 3 ? "done" : "next"}
            />
          ))}
        </View>
        {/* Timer or Resend Code */}
        {timer > 0 ? (
          <Text
            style={{ fontFamily: "poppinsRegular" }}
            className="text-center text-[14px] mb-4"
          >
            Resend code in{" "}
            <Text
              style={{ fontFamily: "latoBold" }}
              className="text-primary text-[16px]"
            >
              {Math.floor(timer / 60)} : {String(timer % 60).padStart(2, "0")}
            </Text>
          </Text>
        ) : (
          <Pressable onPress={handleResend}>
            <Text
              style={{ fontFamily: "latoBold" }}
              className="text-primary text-[14px] underline text-center mb-4"
            >
              Resend Code
            </Text>
          </Pressable>
        )}
        <TouchableOpacity
          className="flex-row justify-center items-center mt-[50px] mb-8"
          onPress={() => alert("Switch to email verification")}
        >
          <Text
            style={{ fontFamily: "poppinsRegular" }}
            className="text-primary text-[12px]"
          >
            Verify with E-mail instead
          </Text>
        </TouchableOpacity>
      </View>
      <View className="px-6 pb-8">
        <TouchableOpacity
          className="bg-[#eb278d] rounded-xl py-4 items-center"
          onPress={() => handleVerify()}
        >
          <Text className="text-white text-[18px] font-semibold">Verify</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
