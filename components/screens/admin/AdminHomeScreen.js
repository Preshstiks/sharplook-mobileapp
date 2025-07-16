import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomModal from "../../reusuableComponents/BottomModal";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function AdminHomeScreen() {
  const navigation = useNavigation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleClientSelect = () => {
    setShowLogoutModal(false);
    navigation.replace("Login");
  };

  const handleVendorSelect = () => {
    setShowLogoutModal(false);
    navigation.replace("VendorLogin");
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      {/* Header */}
      <View className="bg-primary rounded-b-[40px] items-center pt-[60px] pb-8">
        <Text
          className="text-white text-[24px]"
          style={{ fontFamily: "poppinsBold" }}
        >
          Admin Dashboard
        </Text>
        <Text
          className="text-white text-[14px] mt-2"
          style={{ fontFamily: "poppinsLight" }}
        >
          Welcome to the admin panel
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 px-4 pt-8">
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Text
            className="text-[18px] text-center mb-4"
            style={{ fontFamily: "poppinsMedium" }}
          >
            Admin Dashboard Content
          </Text>
          <Text
            className="text-[14px] text-center text-faintDark"
            style={{ fontFamily: "poppinsRegular" }}
          >
            This is where admin functionality would be implemented.
          </Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="flex-row items-center bg-white rounded-xl px-4 py-4 shadow-sm mt-6"
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
}
