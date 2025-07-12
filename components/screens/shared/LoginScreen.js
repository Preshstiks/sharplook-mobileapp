import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AuthInput } from "../../reusuableComponents/inputFields/AuthInput";
import { Formik } from "formik";
import Logo from "../../../assets/img/logo/sharplooklogo.svg";
import FBicon from "../../../assets/img/logo/fbicon.svg";
import Twittericon from "../../../assets/img/logo/twittericon.svg";
import Appleicon from "../../../assets/img/logo/appleicon.svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import { useStatusBar } from "../../../context/StatusBarContext";
import { loginSchema } from "../../../utils/validationSchemas";

export default function LoginScreen({ navigation }) {
  const [role, setRole] = useState("client"); // For demo, let user pick role
  const [rememberMe, setRememberMe] = useState(false);
  const { setBarType } = useStatusBar();

  useEffect(() => {
    setBarType("secondary");
  }, []);

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
        onSubmit={(values) => {
          console.log(values);
          // navigation.navigate("ClientAddLocation");
          navigation.navigate("Client");
        }}
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit,
        }) => {
          // Debug logging
          console.log("Form values:", values);
          console.log("Form errors:", errors);
          console.log("Form touched:", touched);
          console.log("Password error:", errors.password);
          console.log("Password touched:", touched.password);
          console.log(
            "Should show password error:",
            errors.password && touched.password
          );

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
                isloading={false}
                onPress={handleSubmit}
              />
              {/* Social Login Section */}
              <View className="mt-8 w-full items-center">
                <View className="flex-row items-center w-full mb-6">
                  <View className="flex-1 h-px bg-[#0000001A]" />
                  <Text
                    className="mx-2 text-base text-faintDark"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    Login with
                  </Text>
                  <View className="flex-1 h-px bg-[#0000001A]" />
                </View>
                <View className="flex-row justify-center items-center gap-[36px] mb-8">
                  <FBicon width={24} height={24} />
                  <Twittericon width={24} height={24} />
                  <Appleicon width={30} height={30} />
                </View>
                <View className="flex-row justify-center gap-1 items-center mt-2">
                  <Text
                    className="text-sm text-[#6B6B6B]"
                    style={{ fontFamily: "latoRegular" }}
                  >
                    Don't have an account?
                  </Text>
                  <Pressable onPress={() => navigation.navigate("Register")}>
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
