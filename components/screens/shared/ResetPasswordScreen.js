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
export default function ResetPasswordScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const handleProceed = () => {
    setVisible(false);
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
            initialValues={{ newPassword: "", confirmPassword: "" }}
            validationSchema={resetPasswordSchema}
            onSubmit={(values) => {
              console.log(values);
              setVisible(true);
            }}
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
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    secureTextEntry
                  />
                </View>
                <View className="pb-[60px]">
                  <AuthButton
                    title="Create New Password"
                    isloading={false}
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
