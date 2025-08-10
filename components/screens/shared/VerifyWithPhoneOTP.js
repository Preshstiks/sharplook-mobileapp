import React, { useEffect, useState, useRef } from "react";
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
import { HttpClient } from "../../../api/HttpClient";
import { emailVerificationSchema } from "../../../utils/validationSchemas";
import { showToast } from "../../ToastComponent/Toast";
import { Formik } from "formik";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import LoaderOverlay from "../../reusuableComponents/LoaderOverlay";

export default function VerifyWithPhoneOTP({ navigation, route }) {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const phone = route.params?.phone || "";

  // Fix: Properly create refs for OTP inputs
  const inputs = useRef([]);

  // Handler for resending OTP
  const handleResend = async () => {
    setTimer(60); // Reset timer to 60 seconds
    try {
      setLoading(true);
      const res = await HttpClient.post("/auth/send-otp", {
        phone: String(phone), // Ensure phone is sent as string
      });
      showToast.success(res.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || "Failed to resend OTP";
        showToast.error(errorMessage);
      } else {
        showToast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (text, idx, setFieldValue) => {
    if (/^[0-9]?$/.test(text)) {
      const newCode = [...code];
      newCode[idx] = text;
      setCode(newCode);

      // Update Formik field value
      const verificationCode = newCode.join("");
      setFieldValue("otp", verificationCode);

      // Move to next input if text is entered and not last input
      if (text && idx < 3) {
        inputs.current[idx + 1]?.focus();
      }

      // Move to previous input if text is deleted and not first input
      if (!text && idx > 0) {
        inputs.current[idx - 1]?.focus();
      }

      // Auto-verify when all 4 digits are entered
      if (text && idx === 3) {
        const fullCode = newCode.join("");
        if (fullCode.length === 4) {
          Keyboard.dismiss();
          handleVerify({ otp: fullCode });
        }
      }
    }
  };

  const handleVerify = async (values) => {
    setLoading(true);
    const payload = {
      phone: String(phone), // Ensure phone is sent as string
      otp: values.otp,
    };
    console.log({ payload });
    try {
      const res = await HttpClient.post("/auth/verify-otp", {
        phone: String(phone), // Ensure phone is sent as string
        otp: values.otp,
      });
      showToast.success(res.data.message);
      navigation.replace("Login");
    } catch (error) {
      // Reset code and focus first input on error
      setCode(["", "", "", ""]);
      inputs.current[0]?.focus();
      console.log(error.response);
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

  // Mask phone number for display
  const maskedPhone = phone.replace(/(\+234)(\d{3})\d{4}(\d{3})/, "$1$2****$3");

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
          Please enter the Verification code
        </Text>

        <Formik
          initialValues={{ otp: "" }}
          validationSchema={emailVerificationSchema}
          onSubmit={handleVerify}
        >
          {({ setFieldValue, errors, touched, handleSubmit }) => (
            <>
              <View className="flex-row justify-center mb-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <TextInput
                    key={i}
                    ref={(el) => (inputs.current[i] = el)}
                    value={code[i]}
                    onChangeText={(text) =>
                      handleOtpChange(text, i, setFieldValue)
                    }
                    keyboardType="number-pad"
                    maxLength={1}
                    cursorColor="#eb278c"
                    className={`w-14 h-14 border-2 rounded-lg text-center text-xl ${
                      code[i] ? "border-primary" : "border-[#eb278c1c]"
                    }`}
                    style={{ fontFamily: "poppinsRegular" }}
                    returnKeyType="next"
                    selectTextOnFocus
                  />
                ))}
              </View>

              {errors.otp && touched.otp && (
                <Text
                  style={{
                    color: "#FF0000",
                    fontSize: 12,
                    fontFamily: "poppinsRegular",
                    textAlign: "center",
                    marginBottom: 16,
                  }}
                >
                  {errors.otp}
                </Text>
              )}

              {/* Timer or Resend Code */}
              {timer > 0 ? (
                <Text
                  className="text-center text-sm mb-2"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  Resend code in{" "}
                  <Text className="text-primary">
                    {`${Math.floor(timer / 60)}:${(timer % 60)
                      .toString()
                      .padStart(2, "0")}`}
                  </Text>
                </Text>
              ) : (
                <Pressable onPress={handleResend} disabled={loading}>
                  <Text
                    style={{ fontFamily: "latoBold" }}
                    className="text-primary text-[14px] underline text-center mb-2"
                  >
                    {loading ? "Sending..." : "Resend Code"}
                  </Text>
                </Pressable>
              )}

              <TouchableOpacity
                className="flex-row justify-center items-center mt-[50px] mb-8"
                onPress={async () => {
                  try {
                    const email = route.params?.email;
                    if (email) {
                      await HttpClient.post("/auth/send-otp", { email });
                      navigation.navigate("EmailVerificationSignup", {
                        email,
                        phone: route.params?.phone,
                      });
                    }
                  } catch (error) {
                    if (error.response && error.response.data) {
                      const errorMessage =
                        error.response.data.message ||
                        "An unknown error occurred";
                      showToast.error(errorMessage);
                    } else {
                      showToast.error(
                        "An unexpected error occurred. Please try again."
                      );
                    }
                  }
                }}
              >
                <Text
                  style={{ fontFamily: "poppinsRegular" }}
                  className="text-primary text-[12px]"
                >
                  Verify with E-mail instead
                </Text>
              </TouchableOpacity>

              <View className="mb-8">
                <AuthButton
                  title="Verify"
                  disabled={loading || code.join("").length !== 4}
                  onPress={handleSubmit}
                  isloading={loading}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
      <LoaderOverlay visible={loading} />
    </KeyboardAvoidingView>
  );
}
