import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AuthInput } from "../../../reusuableComponents/inputFields/AuthInput";
import { Formik } from "formik";
import Logo from "../../../../assets/img/logo/sharplooklogo.svg";
import FBicon from "../../../../assets/img/logo/fbicon.svg";
import Twittericon from "../../../../assets/img/logo/twittericon.svg";
import Appleicon from "../../../../assets/img/logo/appleicon.svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { useStatusBar } from "../../../../context/StatusBarContext";
import { registerSchema } from "../../../../utils/validationSchemas";
import Dropdown from "../../../reusuableComponents/inputFields/Dropdown";
import * as DocumentPicker from "expo-document-picker";

const SERVICE_OPTIONS = [
  { label: "In-shop", value: "in-shop" },
  { label: "Home Service", value: "home-service" },
];

export default function VendorRegisterScreen({ navigation }) {
  const [rememberMe, setRememberMe] = useState(false);
  const { setBarType } = useStatusBar();

  useEffect(() => {
    setBarType("secondary");
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        className="bg-secondary"
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={styles.container}
          className="flex-1 pt-[60px] bg-secondary w-full p-4"
        >
          <View className="items-center justify-center">
            <View className="items-center">
              <Logo width={112} height={112} />
              <Text
                style={{ fontFamily: "poppinsBold" }}
                className="text-center text-[20px] mt-2"
              >
                Create Your Account
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
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              serviceType: "",
              document: null,
            }}
            validationSchema={registerSchema}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate("VendorEmailVerification", {
                email: values.email,
              });
            }}
          >
            {({
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              handleSubmit,
              setFieldValue,
            }) => (
              <View className="mt-10">
                <View className="flex-row items-center justify-between gap-3">
                  <View className="flex-1">
                    <AuthInput
                      label="First Name"
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      error={errors.firstName}
                      touched={touched.firstName}
                    />
                  </View>

                  <View className="flex-1">
                    <AuthInput
                      label="Last Name"
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      error={errors.lastName}
                      touched={touched.lastName}
                    />
                  </View>
                </View>
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
                <AuthInput
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  secureTextEntry
                />
                {/* Service Type Dropdown */}
                <Dropdown
                  value={values.serviceType}
                  label="Service Type"
                  onValueChange={(val) => setFieldValue("serviceType", val)}
                  error={errors.serviceType}
                  touched={touched.serviceType}
                  options={SERVICE_OPTIONS}
                />
                {/* Document Upload Box */}
                <Pressable
                  onPress={async () => {
                    const result = await DocumentPicker.getDocumentAsync({
                      type: [
                        "application/pdf",
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                      ],
                      copyToCacheDirectory: true,
                      multiple: false,
                    });
                    if (result.type === "success") {
                      setFieldValue("document", result);
                    }
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: "#EB278D",
                    borderStyle: "dashed",
                    borderRadius: 8,
                    padding: 14,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 4,
                  }}
                  className="mt-2 mb-1"
                >
                  <Text
                    className="text-[12px]"
                    style={{ fontFamily: "poppinsRegular", color: "#222" }}
                  >
                    {values.document?.name || "Upload any means of Identity"}
                  </Text>
                  <MaterialIcons name="add" size={16} color="#201E1F" />
                </Pressable>
                <Text
                  style={{
                    fontFamily: "poppinsRegular",
                    fontSize: 10,
                    marginTop: 4,
                    color: "#888",
                    marginBottom: 8,
                  }}
                >
                  Acceptable document type is PDF and Image only and it should
                  not be more than 5MB
                </Text>
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
                      I agree to the processing of{"  "}
                      <Text
                        className="text-xs text-primary"
                        style={{ fontFamily: "poppinsRegular" }}
                      >
                        Personal data
                      </Text>
                    </Text>
                  </View>
                </View>
                <AuthButton
                  title="Create Account"
                  isloading={false}
                  onPress={handleSubmit}
                />
                <View className="mt-8 w-full items-center">
                  <View className="flex-row justify-center gap-1 items-center mt-2">
                    <Text
                      className="text-sm text-[#6B6B6B]"
                      style={{ fontFamily: "latoRegular" }}
                    >
                      Already have an account?
                    </Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                      <Text
                        className="text-sm text-primary"
                        style={{ fontFamily: "latoRegular" }}
                      >
                        Login
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
