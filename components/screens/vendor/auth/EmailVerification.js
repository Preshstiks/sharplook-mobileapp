import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { Formik } from "formik";
import { emailVerificationSchema } from "../../../../utils/validationSchemas";

export default function VendorEmailVerificationScreen({ navigation, route }) {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  // Handler for resending OTP
  const handleResend = () => {
    setTimer(60); // Reset timer to 60 seconds (or your preferred value)
    // TODO: Add your resend OTP logic here (e.g., API call)
  };
  const inputs = useRef([]);
  const email = route?.params?.email || "raj****@gmail.com";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text, idx, setFieldValue) => {
    if (/^[0-9]?$/.test(text)) {
      const newCode = [...code];
      newCode[idx] = text;
      setCode(newCode);

      // Update Formik field value
      const verificationCode = newCode.join("");
      setFieldValue("verificationCode", verificationCode);

      if (text && idx < 3) inputs.current[idx + 1].focus();
      if (!text && idx > 0) inputs.current[idx - 1].focus();
    }
  };

  return (
    <View className="flex-1 bg-secondary px-5 py-[60px]">
      <View className="flex-row items-center mb-8 gap-8">
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </Pressable>
        <Text style={{ fontFamily: "poppinsSemiBold" }}>Verification</Text>
      </View>
      <Text
        className="text-center mb-1 text-sm"
        style={{ fontFamily: "poppinsRegular" }}
      >
        We have sent verification code to your email
      </Text>
      <Text
        className="text-center mb-10 text-sm text-primary"
        style={{ fontFamily: "poppinsRegular" }}
      >
        {email}
      </Text>
      <Text
        className="text-center mb-4 text-sm"
        style={{ fontFamily: "poppinsRegular" }}
      >
        Please enter your verification code
      </Text>
      <Formik
        initialValues={{ verificationCode: "" }}
        validationSchema={emailVerificationSchema}
        onSubmit={(values) => {
          console.log(values);
          navigation.navigate("VendorBusinessInfo");
        }}
      >
        {({ setFieldValue, errors, touched, handleSubmit }) => (
          <>
            <View className="flex-row justify-center mb-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <TextInput
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  value={code[i]}
                  onChangeText={(text) => handleChange(text, i, setFieldValue)}
                  keyboardType="number-pad"
                  maxLength={1}
                  cursorColor="#eb278c"
                  className={`w-14 h-14 border-2 rounded-lg text-center text-xl ${code[i] ? "border-primary" : "border-[#eb278c1c]"}`}
                  style={{ fontFamily: "poppinsRegular" }}
                />
              ))}
            </View>
            {errors.verificationCode && touched.verificationCode && (
              <Text
                style={{
                  color: "#FF0000",
                  fontSize: 12,
                  fontFamily: "poppinsRegular",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                {errors.verificationCode}
              </Text>
            )}
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
                  {Math.floor(timer / 60)} :{" "}
                  {String(timer % 60).padStart(2, "0")}
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
            <View className="flex-1" />
            <View className="mb-8">
              <AuthButton
                title="Verify"
                onPress={handleSubmit}
                isloading={false}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
