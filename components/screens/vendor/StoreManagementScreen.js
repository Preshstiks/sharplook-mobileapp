import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStatusBar } from "../../../context/StatusBarContext";
import OutlineTextInput from "../../reusuableComponents/inputFields/OutlineTextInput";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { vendorBusinessInfoSchema } from "../../../utils/validationSchemas";
import { useAuth } from "../../../context/AuthContext";
import { HttpClient } from "../../../api/HttpClient";
import { showToast } from "../../ToastComponent/Toast";

const StoreManagementScreen = () => {
  const { setBarType } = useStatusBar();
  const navigation = useNavigation();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBarType("primary");
  }, []);

  // Helper to get initial values from user object
  const initialValues = {
    businessName: user?.vendorOnboarding?.businessName || "",
    bio:
      user?.vendorOnboarding?.businessDescription ||
      user?.vendorOnboarding?.bio ||
      "",
    businessEmail: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    location:
      user?.vendorOnboarding?.businessAddress ||
      user?.vendorOnboarding?.location ||
      "",
    registerationNumber:
      user?.vendorOnboarding?.businessRegNumber ||
      user?.vendorOnboarding?.registerationNumber ||
      "",
    portfolioLink: user?.vendorOnboarding?.portfolioLink || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const payload = {
        businessName: values.businessName,
        bio: values.businessDescription,
        location: values.businessAddress,
        registerationNumber: values.businessRegNumber,
        portfolioLink: values.portfolioLink,
      };
      const res = await HttpClient.put("/vendor/complete-profile", payload);
      showToast.success(res.data.message || "Profile updated successfully");
      // Optionally update user context
      if (res.data.user) setUser(res.data.user);
    } catch (error) {
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
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 pb-[50px] bg-secondary">
      {/* Header with logo, name, badge, address */}
      <View className="bg-primary rounded-b-[40px] items-center pt-[60px] pb-8">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-4 top-8"
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image
          source={
            user?.avatar
              ? { uri: user.avatar }
              : require("../../../assets/icon/avatar.png")
          }
          className="w-24 h-24 rounded-full mb-4 bg-white"
        />
        <Text
          className="text-white text-[16px] text-center"
          style={{ fontFamily: "poppinsMedium" }}
        >
          {user?.vendorOnboarding?.businessName ||
            "Heritage Spa and Beauty Services"}
        </Text>
        <View className="flex-row items-center mt-2">
          <View className="bg-white px-3 py-1 rounded-lg flex-row items-center mr-2">
            <View className="w-2 h-2 rounded-full bg-[#ED2584] mr-2" />
            <Text
              className="text-[12px] text-[#ED2584]"
              style={{ fontFamily: "poppinsMedium" }}
            >
              In-shop
            </Text>
          </View>
        </View>
        <View className="flex-row items-center mt-2">
          <Ionicons name="location-sharp" size={14} color="#fff" />
          <Text
            className="text-white text-[12px] ml-1"
            style={{ fontFamily: "poppinsLight" }}
          >
            {user?.vendorOnboarding?.location}
          </Text>
        </View>
      </View>
      {/* Form Body with KeyboardAvoidingView and ScrollView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={vendorBusinessInfoSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View className="flex-1 px-4 pt-10">
                <OutlineTextInput
                  label="Business Name"
                  value={values.businessName}
                  onChangeText={handleChange("businessName")}
                  onBlur={handleBlur("businessName")}
                  placeholder="Heritage Spa and Beauty Services"
                  error={errors.businessName}
                  touched={touched.businessName}
                />
                <OutlineTextInput
                  label="Business Description"
                  value={values.bio}
                  onChangeText={handleChange("bio")}
                  onBlur={handleBlur("bio")}
                  placeholder="Type here"
                  error={errors.bio}
                  touched={touched.bio}
                />
                <OutlineTextInput
                  label="Business Email Address"
                  value={values.businessEmail}
                  onChangeText={handleChange("businessEmail")}
                  onBlur={handleBlur("businessEmail")}
                  placeholder="rajibalikis@gmail.com"
                  keyboardType="email-address"
                  error={errors.businessEmail}
                  touched={touched.businessEmail}
                  editable={false}
                />
                <OutlineTextInput
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  placeholder="+2348065456789"
                  keyboardType="phone-pad"
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                  editable={false}
                />
                <OutlineTextInput
                  label="Business Address"
                  value={values.location}
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  placeholder="Lagos, Nigeria"
                  error={errors.location}
                  touched={touched.location}
                />
                <OutlineTextInput
                  label="Business Registration Number"
                  value={values.registerationNumber}
                  onChangeText={handleChange("registerationNumber")}
                  onBlur={handleBlur("registerationNumber")}
                  placeholder="Type here"
                  error={errors.registerationNumber}
                  touched={touched.registerationNumber}
                />
                <OutlineTextInput
                  label="Portfolio Link"
                  value={values.portfolioLink}
                  onChangeText={handleChange("portfolioLink")}
                  onBlur={handleBlur("portfolioLink")}
                  placeholder="Type here"
                  error={errors.portfolioLink}
                  touched={touched.portfolioLink}
                />
                <AuthButton
                  title="Save Changes"
                  isloading={loading || isSubmitting}
                  loadingMsg="Saving..."
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StoreManagementScreen;
