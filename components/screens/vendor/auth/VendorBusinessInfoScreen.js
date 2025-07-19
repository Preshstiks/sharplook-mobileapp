import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { AuthInput } from "../../../reusuableComponents/inputFields/AuthInput";
import { useStatusBar } from "../../../../context/StatusBarContext";
import { Formik } from "formik";
import { vendorBusinessInfoSchema } from "../../../../utils/validationSchemas";
import { showToast } from "../../../ToastComponent/Toast";
import { HttpClient } from "../../../../api/HttpClient";
import { useAuth } from "../../../../context/AuthContext";
export default function VendorBusinessInfoScreen({ navigation }) {
  const { setBarType } = useStatusBar();
  const { userId, setUser, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setBarType("primary");
  }, []);

  const handleSubmitBus = async (values) => {
    setLoading(true);
    console.log("[DEBUG] handleSubmit called with values:", values);
    try {
      console.log("[DEBUG] handleSubmit payload:", values);
      const res = await HttpClient.put("/vendor/complete-profile", values);
      console.log("[DEBUG] handleSubmit response:", res);
      showToast.success(res.data.message);

      navigation.navigate("AddLocation");
    } catch (error) {
      console.log("[DEBUG] handleSubmit error:", error.response);
      let errorMsg = "An error occurred. Please try again.";
      if (error.response && error.response.data) {
        errorMsg =
          error.response.data.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMsg = error.message;
      }
      showToast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="pb-[60px]" style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#EB278D",
          paddingTop: 60,
          paddingBottom: 16,
          paddingHorizontal: 16,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
        </Pressable>
        <Text
          style={{ color: "#fff", fontFamily: "poppinsMedium", fontSize: 16 }}
        >
          Vendor's Information
        </Text>
        <TouchableOpacity onPress={() => navigation.replace("Home")}>
          {" "}
          {/* Replace with your skip logic */}
          <Text
            style={{
              color: "#fff",
              fontFamily: "poppinsRegular",
              fontSize: 10,
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={{ flex: 1 }}>
        <Formik
          initialValues={{
            businessName: "",
            bio: "",
            location: "",
            registerationNumber: "",
            // portfolioLink: "",
          }}
          validationSchema={vendorBusinessInfoSchema}
          onSubmit={handleSubmitBus}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <ScrollView
              contentContainerStyle={{ padding: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <Text
                style={{
                  fontFamily: "poppinsMedium",
                  fontSize: 16,
                  marginBottom: 20,
                  marginTop: 10,
                }}
              >
                Please fill in the information below
              </Text>
              {/* Business Name */}
              <AuthInput
                label="Business Name"
                value={values.businessName}
                onChangeText={handleChange("businessName")}
                onBlur={handleBlur("businessName")}
                error={errors.businessName}
                touched={touched.businessName}
              />
              <AuthInput
                label="Business Description"
                value={values.bio}
                onChangeText={handleChange("bio")}
                onBlur={handleBlur("bio")}
                error={errors.bio}
                touched={touched.bio}
              />
              <AuthInput
                label="Location"
                value={values.location}
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
                error={errors.location}
                touched={touched.location}
              />
              <AuthInput
                label="Business Registration Number (CAC)"
                value={values.registerationNumber}
                onChangeText={handleChange("registerationNumber")}
                onBlur={handleBlur("registerationNumber")}
                error={errors.registerationNumber}
                touched={touched.registerationNumber}
              />
              {/* <AuthInput
                label="Portfolio Link"
                value={values.portfolioLink}
                onChangeText={handleChange("portfolioLink")}
                onBlur={handleBlur("portfolioLink")}
                error={errors.portfolioLink}
                touched={touched.portfolioLink}
              /> */}
              {/* Button at bottom */}
              <View style={{ paddingTop: 20, paddingBottom: 30 }}>
                <AuthButton
                  loadingMsg="Submitting"
                  title="Continue"
                  onPress={handleSubmit}
                  isloading={loading}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
      </View>
    </View>
  );
}
