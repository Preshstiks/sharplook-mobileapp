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

const StoreManagementScreen = () => {
  const { setBarType } = useStatusBar();
  const navigation = useNavigation();
  // State for each form field
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessRegNumber, setBusinessRegNumber] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");

  useEffect(() => {
    setBarType("primary");
  }, []);

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
          source={require("../../../assets/img/logo/applogo.svg")}
          className="w-24 h-24 rounded-full mb-4 bg-white"
        />
        <Text
          className="text-white text-[16px] text-center"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Heritage Spa and Beauty Services
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
            No. 4 Lagos, Nigeria
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
          <View className="flex-1 px-4 pt-10">
            <OutlineTextInput
              label="Business Name"
              value={businessName}
              onChangeText={setBusinessName}
              placeholder="Heritage Spa and Beauty Services"
            />
            <OutlineTextInput
              label="Business Description"
              value={businessDescription}
              onChangeText={setBusinessDescription}
              placeholder="Type here"
            />
            <OutlineTextInput
              label="Business Email Address"
              value={businessEmail}
              onChangeText={setBusinessEmail}
              placeholder="rajibalikis@gmail.com"
              keyboardType="email-address"
            />
            <OutlineTextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="+2348065456789"
              keyboardType="phone-pad"
            />
            <OutlineTextInput
              label="Business Address"
              value={businessAddress}
              onChangeText={setBusinessAddress}
              placeholder="Lagos, Nigeria"
            />
            <OutlineTextInput
              label="Business Registration Number"
              value={businessRegNumber}
              onChangeText={setBusinessRegNumber}
              placeholder="Type here"
            />
            <OutlineTextInput
              label="Portfolio Link"
              value={portfolioLink}
              onChangeText={setPortfolioLink}
              placeholder="Type here"
            />
            <AuthButton title="Save Changes" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StoreManagementScreen;
