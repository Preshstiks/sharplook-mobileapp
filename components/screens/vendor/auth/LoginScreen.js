import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AuthInput } from "../../../reusuableComponents/inputFields/AuthInput";
import { Formik } from "formik";
import Logo from "../../../../assets/img/logo/sharplooklogo.svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { loginSchema } from "../../../../utils/validationSchemas";
import { HttpClient } from "../../../../api/HttpClient";
import { useAuth } from "../../../../context/AuthContext";
import { showToast } from "../../../ToastComponent/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderOverlay from "../../../reusuableComponents/LoaderOverlay";

export default function VendorLoginScreen({ navigation }) {
  const [rememberMe, setRememberMe] = useState(false);
  const { login, setLastAttemptedCredentials } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      const response = await HttpClient.post("/auth/login", values);
      const statusCode = response.data.statusCode || response.status;
      const userRole = response.data.user && response.data.user.role;
      const token = response.data.token;
      if (token) {
        await login(token, userRole);
      }
      if (statusCode === 200) {
        if (userRole === "VENDOR") {
          showToast.success(response.data.message);
          navigation.replace("Vendor", { screen: "Dashboard" });
        } else {
          showToast.error("Please Login with a Vendor account!");
        }
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;
        if (
          status === 403 &&
          message ===
            "Please complete your vendor profile (business Name required)."
        ) {
          setLastAttemptedCredentials({
            email: values.email,
            password: values.password,
          });
          showToast.info(message);
          const token = error.response.data.token;
          await AsyncStorage.setItem("token", token);
          navigation.navigate("VendorBusinessInfo");
        } else if (status === 403 && message === "No Location") {
          setLastAttemptedCredentials({
            email: values.email,
            password: values.password,
          });
          showToast.info(message);
          const token = error.response.data.token;
          await AsyncStorage.setItem("token", token);
          navigation.replace("AddLocation");
        } else if (
          status === 403 &&
          message ===
            "Email or Phone Number not verified. An OTP has been sent to your email."
        ) {
          showToast.info(message);
          navigation.navigate("VendorEmailVerification", {
            email: values.email,
          });
        } else {
          showToast.error(
            message ||
              error.message ||
              error.response.data.message ||
              "An unknown error occurred"
          );
        }
      } else {
        showToast.error(error.message || "An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View
      style={styles.container}
      className="flex-1 pt-[60px] bg-secondary w-full p-4"
    >
      <View className="items-center justify-center">
        <View className="items-center">
          <Logo width={120} height={120} />
          <Text
            style={{ fontFamily: "poppinsBold" }}
            className="text-center text-[20px] mt-2"
          >
            Welcome Back
          </Text>
          <Text
            style={{ fontFamily: "poppinsRegular" }}
            className="text-center text-[12px] text-faintDark"
          >
            Please fill the details below
          </Text>
        </View>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit,
        }) => {
          return (
            <View className="mt-10">
              <AuthInput
                label="Enter E-mail Address"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
              />
              <AuthInput
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={errors.password}
                touched={touched.password}
                secureTextEntry
              />
              <View className="flex-row items-center justify-between mt-4 mb-2">
                <View className="flex-row items-center">
                  <Pressable
                    className="w-5 h-5 border border-primary rounded mr-2 items-center justify-center"
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    {rememberMe && (
                      <MaterialIcons name="check" size={16} color="#EB278D" />
                    )}
                  </Pressable>
                  <Text
                    className="text-xs"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    Remember Me
                  </Text>
                </View>
                <Pressable
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text
                    className="text-xs text-primary"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    Forgot Password?
                  </Text>
                </Pressable>
              </View>
              <AuthButton
                title="Login"
                loadingMsg="Logging in"
                isloading={isLoading}
                onPress={handleSubmit}
              />
              <View className="mt-8 w-full items-center">
                <View className="flex-row justify-center gap-1 items-center mt-2">
                  <Text
                    className="text-sm text-[#6B6B6B]"
                    style={{ fontFamily: "latoRegular" }}
                  >
                    Don't have a vendor account?
                  </Text>
                  <Pressable
                    onPress={() => navigation.navigate("VendorRegister")}
                  >
                    <Text
                      className="text-sm text-primary"
                      style={{ fontFamily: "latoRegular" }}
                    >
                      Register
                    </Text>
                  </Pressable>
                </View>
                <View className="flex-row justify-center gap-1 items-center mt-5">
                  <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text
                      className="text-sm text-primary"
                      style={{ fontFamily: "latoRegular" }}
                    >
                      Switch to Client Login
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
      </Formik>
      <LoaderOverlay visible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    maxWidth: 300,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  pickerContainer: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
