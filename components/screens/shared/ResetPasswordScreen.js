import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AuthInput } from "../../reusuableComponents/inputFields/AuthInput";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import Logo from "../../../assets/img/logo/sharplooklogo.svg";
import { Formik } from "formik";
import { resetPasswordSchema } from "../../../utils/validationSchemas";
import SuccessModal from "../../Modal/SuccessModal";
import { showToast } from "../../ToastComponent/Toast";
import { HttpClient } from "../../../api/HttpClient";
export default function ResetPasswordScreen({ navigation, route }) {
  const { email } = route.params;
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleReset = async (values) => {
    setVisible(false);
    setIsLoading(true);
    try {
      const res = await HttpClient.post("/auth/reset-password", values);
      if (res.status === 200) {
        setVisible(true);
      }
    } catch (error) {
      showToast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleProceed = () => {
    navigation.replace("Login");
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-secondary"
    >
      <View className="flex-1 justify-between px-5 pt-[60px] pb-8">
        <View>
          <View className="items-center justify-center">
            <View className="items-center">
              <Logo width={112} height={112} />

              <Text
                style={{ fontFamily: "poppinsBold" }}
                className="text-center text-[20px] mt-5"
              >
                Create New Password
              </Text>
              <Text
                style={{ fontFamily: "poppinsRegular" }}
                className="text-center text-[12px] text-faintDark"
              >
                Your new password must be different from the old one
              </Text>
            </View>
          </View>
          <Formik
            initialValues={{ newPassword: "", token: "", email: email }}
            validationSchema={resetPasswordSchema}
            onSubmit={handleReset}
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
                <View className="mt-10">
                  <AuthInput
                    label="New Password"
                    value={values.newPassword}
                    onChangeText={handleChange("newPassword")}
                    onBlur={handleBlur("newPassword")}
                    error={errors.newPassword}
                    touched={touched.newPassword}
                    secureTextEntry
                  />
                  <AuthInput
                    label="OTP"
                    value={values.token}
                    onChangeText={handleChange("token")}
                    onBlur={handleBlur("token")}
                    error={errors.token}
                    touched={touched.token}
                    secureTextEntry
                  />
                </View>
                <View className="pb-[60px]">
                  <AuthButton
                    title="Create New Password"
                    isloading={isLoading}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
      <SuccessModal
        onClose={handleProceed}
        visible={visible}
        message="Congratulations, your password reset was successful!!!"
        buttonText="Proceed to Login"
      />
    </KeyboardAvoidingView>
  );
}
