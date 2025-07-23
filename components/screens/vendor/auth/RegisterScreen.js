import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AuthInput } from "../../../reusuableComponents/inputFields/AuthInput";
import { Formik } from "formik";
import Logo from "../../../../assets/img/logo/sharplooklogo.svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { registerSchema } from "../../../../utils/validationSchemas";
import Dropdown from "../../../reusuableComponents/inputFields/Dropdown";
import * as DocumentPicker from "expo-document-picker";
import { HttpClient } from "../../../../api/HttpClient";
import { showToast } from "../../../ToastComponent/Toast";
import LoaderOverlay from "../../../reusuableComponents/LoaderOverlay";

const SERVICE_OPTIONS = [
  { label: "In-shop", value: "IN_SHOP" },
  { label: "Home Service", value: "HOME_SERVICE" },
];

export default function VendorRegisterScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (values) => {
    setLoading(true);
    console.log("handleSignup called with values:", values);
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("serviceType", values.serviceType);
      formData.append("referredByCode", values.referredByCode || "");
      formData.append("role", values.role);
      formData.append("acceptedPersonalData", values.acceptedPersonalData);

      if (values.identityImage && values.identityImage.uri) {
        formData.append("identityImage", {
          uri: values.identityImage.uri,
          name: values.identityImage.name || "identity.jpg",
          type: values.identityImage.mimeType || "image/jpeg",
        });
      }
      const res = await HttpClient.post("/auth/register-vendor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast.success(res.data.message);
      navigation.navigate("VendorEmailVerification", { email: values.email });
    } catch (error) {
      console.log("Debug: error", error.response);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error;
        showToast.error(errorMessage);
      } else {
        showToast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
              serviceType: "",
              referredByCode: "",
              identityImage: null,
              role: "VENDOR",
              acceptedPersonalData: false,
            }}
            validationSchema={registerSchema}
            onSubmit={handleSignup}
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
                <AuthInput
                  label="Referral ID (optional)"
                  value={values.referredByCode}
                  onChangeText={handleChange("referredByCode")}
                  onBlur={handleBlur("referredByCode")}
                  error={errors.referredByCode}
                  touched={touched.referredByCode}
                />
                {/* Service Type Dropdown */}
                <Dropdown
                  value={values.serviceType}
                  label="Service Type"
                  placeholder="Select Service Type"
                  onValueChange={(val) => setFieldValue("serviceType", val)}
                  error={errors.serviceType}
                  touched={touched.serviceType}
                  options={SERVICE_OPTIONS}
                />
                {/* Document Upload Box */}
                <Pressable
                  onPress={async () => {
                    try {
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
                      if (
                        !result.canceled &&
                        result.assets &&
                        result.assets.length > 0
                      ) {
                        const selectedFile = result.assets[0];
                        console.log("[DEBUG] Selected file:", selectedFile);
                        setFieldValue("identityImage", selectedFile);
                      }
                    } catch (error) {
                      console.log("[DEBUG] Document picker error:", error);
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
                    {values.identityImage?.name ||
                      "Upload any means of Identity"}
                  </Text>
                  {!values.identityImage?.name && (
                    <MaterialIcons name="add" size={16} color="#201E1F" />
                  )}
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
                      onPress={() =>
                        setFieldValue(
                          "acceptedPersonalData",
                          !values.acceptedPersonalData
                        )
                      }
                    >
                      {values.acceptedPersonalData && (
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
                  loadingMsg="Creating"
                  isloading={loading}
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
      <LoaderOverlay visible={loading} />
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
