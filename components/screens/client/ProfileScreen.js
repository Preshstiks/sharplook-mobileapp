import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useStatusBar } from "../../../context/StatusBarContext";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomModal from "../../reusuableComponents/BottomModal";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";

const ProfileScreen = () => {
  const { setBarType } = useStatusBar();
  const navigation = useNavigation();
  const { user } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    setBarType("primary");
  }, []);

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
  console.log({ USER: user });
  return (
    <SafeAreaView className="flex-1 bg-secondary">
      {/* Header with avatar, name, email */}
      <View className="bg-primary rounded-b-[40px] items-center pt-[60px] pb-8">
        <Image
          source={
            user?.avatar
              ? { uri: user.avatar }
              : require("../../../assets/icon/avatar.png")
          }
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text
          className="text-white text-[16px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          {`${user?.lastName} ${user?.firstName}`}
        </Text>
        <Text
          className="text-white text-[12px] mt-1"
          style={{ fontFamily: "poppinsLight" }}
        >
          {user?.email}
        </Text>
      </View>
      {/* Options List */}
      <View className="mt-8 px-4 space-y-4">
        {/* My Account */}
        <TouchableOpacity
          className="flex-row items-center bg-white mb-1 rounded-xl px-4 py-4 shadow-sm"
          onPress={() => navigation.navigate("UserProfileScreen")}
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <Ionicons name="person" size={24} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-faintDark"
            style={{ fontFamily: "poppinsRegular" }}
          >
            My Account
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        {/* Settings */}
        <TouchableOpacity
          className="flex-row items-center mb-1 bg-white rounded-xl px-4 py-4 shadow-sm"
          onPress={() => navigation.navigate("Settings")}
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
          onPress={() => navigation.navigate("HelpSupportScreen")}
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
          onPress={() => navigation.navigate("LegalScreen")}
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
        {/* Privacy Policy (as a sub-item or separate button) */}
        {/* <TouchableOpacity
          className="flex-row items-center mb-1 bg-white rounded-xl px-4 py-4 shadow-sm"
          onPress={() => navigation.navigate("PrivacyPolicyScreen")}
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <Ionicons name="information-circle" size={24} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-faintDark"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Privacy Policy
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity> */}
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

export default ProfileScreen;
