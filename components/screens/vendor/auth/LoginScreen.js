import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AuthInput } from "../../../reusuableComponents/inputFields/AuthInput";
import { Formik } from "formik";
import Logo from "../../../../assets/img/logo/sharplooklogo.svg";
import FBicon from "../../../../assets/img/logo/fbicon.svg";
import Twittericon from "../../../../assets/img/logo/twittericon.svg";
import Appleicon from "../../../../assets/img/logo/appleicon.svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { useStatusBar } from "../../../../context/StatusBarContext";
import { loginSchema } from "../../../../utils/validationSchemas";
import { HttpClient } from "../../../../api/HttpClient";
import { useAuth } from "../../../../context/AuthContext";
import { showToast } from "../../../ToastComponent/Toast";
import { Axios, AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VendorLoginScreen({ navigation }) {
  const [rememberMe, setRememberMe] = useState(false);
  const { setBarType } = useStatusBar();
  const { setIsAuthenticated, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBarType("secondary");
  }, []);

  const handleLogin = async (values) => {
    console.log("[DEBUG] handleLogin called with values:", values);
    setIsLoading(true);
    try {
      const response = await HttpClient.post("/auth/login", values);
      console.log("[DEBUG] handleLogin response:", response);
      const statusCode = response.data.statusCode || response.status;
      const userRole = response.data.user && response.data.user.role;
      if (response.data.token) {
        await login(response.data.token); // Use context login
      }
      if (statusCode === 200) {
        if (userRole === "VENDOR") {
          showToast.success(response.data.message);
          navigation.replace("Vendor", { screen: "Dashboard" });
          setIsAuthenticated(true);
        } else {
          showToast.error("Unauthorized role");
        }
        console.log("[DEBUG] handleLogin response:", userRole);
      }
    } catch (error) {
      console.log("[DEBUG] handleLogin error:", error);
      if (error.response) {
        const message = error.response.data && error.response.data.message;
        if (
          message ===
          "Please complete your vendor profile (registration number and location required)."
        ) {
          showToast.error(message);
          const token = error.response.data.token;
          if (token) {
            await login(token); // Use context login
          }
          navigation.navigate("VendorBusinessInfo");
          setIsAuthenticated(true);
        } else if (message === "No location") {
          navigation.navigate("Vendor", { screen: "AddLocation" });
        } else {
          showToast.error(
            message || error.message || "An unknown error occurred"
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
              </View>
            </View>
          );
        }}
      </Formik>
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
