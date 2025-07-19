import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomModal from "../../reusuableComponents/BottomModal";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";

const VendorProfileScreen = () => {
  const navigation = useNavigation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    // setBarType("primary"); // This line is removed as per the edit hint.
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleClientSelect = () => {
    setShowLogoutModal(false);
    navigation.replace("Login");
  };

  const handleVendorSelect = () => {
    setShowLogoutModal(false);
    navigation.replace("VendorLogin");
  };
  console.log({ user });
  return (
    <SafeAreaView className="flex-1 bg-secondary">
      {/* Header with logo, name, badge, address */}
      <View className="bg-primary rounded-b-[40px] items-center pt-[60px] pb-8">
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
          {user?.vendorOnboarding?.businessName}
        </Text>
        <View className="flex-row items-center mt-2">
          <View className="bg-white px-3 py-1 rounded-lg flex-row items-center mr-2">
            <View className="w-2 h-2 rounded-full bg-[#ED2584] mr-2" />
            <Text
              className="text-[12px] text-[#ED2584]"
              style={{ fontFamily: "poppinsMedium" }}
            >
              {user?.vendorOnboarding?.serviceType === "IN_SHOP"
                ? "In-shop"
                : "Home Service"}
            </Text>
          </View>
        </View>
        <View className="flex-row w-[70%] mt-2">
          <Ionicons name="location-sharp" size={14} color="#fff" />
          <Text
            className="text-white text-center text-[12px] ml-1"
            style={{ fontFamily: "poppinsLight" }}
          >
            {user?.vendorOnboarding?.location}
          </Text>
        </View>
      </View>
      {/* Options List */}
      <View className="mt-8 px-4 space-y-4">
        {/* Store Setup and Management */}
        <TouchableOpacity
          className="flex-row items-center bg-white mb-1 rounded-xl px-4 py-4 shadow-sm"
          onPress={() => navigation.navigate("StoreManagement")}
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <Ionicons name="storefront" size={24} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-faintDark"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Store Setup and Management
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        {/* Settings */}
        <TouchableOpacity
          className="flex-row items-center mb-1 bg-white rounded-xl px-4 py-4 shadow-sm"
          onPress={() => navigation.navigate("VendorSettingsScreen")}
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <Ionicons name="settings" size={24} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-faintDark"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Settings
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        {/* Help and Support */}
        <TouchableOpacity
          className="flex-row items-center mb-1 bg-white rounded-xl px-4 py-4 shadow-sm"
          onPress={() => navigation.navigate("VendorHelpSupportScreen")}
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <Ionicons name="help-circle" size={24} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-faintDark"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Help and Support
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        {/* Legal */}
        <TouchableOpacity
          className="flex-row items-center mb-1 bg-white rounded-xl px-4 py-4 shadow-sm"
          onPress={() => navigation.navigate("VendorLegalScreen")}
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <FontAwesome name="legal" size={24} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-faintDark"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Legal
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          className="flex-row items-center mb-1 bg-white rounded-xl px-4 py-4 shadow-sm"
          onPress={handleLogout}
        >
          <View className="bg-[#FF0000] p-2 rounded-full mr-4">
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-[#FF0000]"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Logout
          </Text>
        </TouchableOpacity>
        {/* Delete Account */}
        <TouchableOpacity className="flex-row items-center bg-white rounded-xl px-4 py-4 shadow-sm">
          <View className="bg-[#FF0000] p-2 rounded-full mr-4">
            <Ionicons name="trash" size={24} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-[#FF0000]"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logout Modal */}
      <BottomModal
        isVisible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        backgroundcolor="#FCFCFC"
      >
        <View className="pt-10">
          <OutlineButton
            title="Are you a Client?"
            onPress={handleClientSelect}
            icon={<AntDesign name="user" size={20} color="#EB278D" />}
            iconPosition="left"
          />
          <OutlineButton
            title="Are you a Vendor?"
            onPress={handleVendorSelect}
            icon={<MaterialIcons name="storefront" size={20} color="#EB278D" />}
            iconPosition="left"
          />
        </View>
      </BottomModal>
    </SafeAreaView>
  );
};

export default VendorProfileScreen;
