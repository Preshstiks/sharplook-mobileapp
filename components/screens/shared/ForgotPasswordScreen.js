import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AuthInput } from "../../reusuableComponents/inputFields/AuthInput";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import { Formik } from "formik";
import { forgotPasswordSchema } from "../../../utils/validationSchemas";
import { HttpClient } from "../../../api/HttpClient";
import { showToast } from "../../ToastComponent/Toast";

export default function ForgotPasswordScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleForgot = async (values) => {
    setIsLoading(true);
    try {
      const res = await HttpClient.post("/auth/request-password-reset", {
        email: values.email,
      });
      if (res.status === 200) {
        setIsLoading(false);
        showToast.success(res.data.message);
        navigation.navigate("ResetPassword", { email: values.email });
      }
    } catch (error) {
      showToast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-secondary px-5 py-[60px]">
      <View className="flex-row items-center mb-8 gap-8">
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </Pressable>
        <Text style={{ fontFamily: "poppinsSemiBold" }}>Forgot password</Text>
      </View>
      <Text
        className="text-center text-sm mb-3"
        style={{ fontFamily: "poppinsRegular" }}
      >
        Please fill your email address below
      </Text>
      <Text
        className="text-center text-sm mb-8 text-faintDark2"
        style={{ fontFamily: "poppinsRegular" }}
      >
        We will send you a code to reset your password
      </Text>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleForgot}
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit,
        }) => (
          <>
            <AuthInput
              label="Enter E-mail Address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
            />
            <View className="flex-1" />
            <View className="mt-8">
              <AuthButton
                title="Submit"
                onPress={handleSubmit}
                isloading={isLoading}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
