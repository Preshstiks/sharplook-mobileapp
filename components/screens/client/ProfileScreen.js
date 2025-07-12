import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useStatusBar } from "../../../context/StatusBarContext";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const ProfileScreen = () => {
  const { setBarType } = useStatusBar();
  const navigation = useNavigation();

  useEffect(() => {
    setBarType("primary");
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-secondary">
      {/* Header with avatar, name, email */}
      <View className="bg-primary rounded-b-[40px] items-center pt-[60px] pb-8">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text
          className="text-white text-[16px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Team Green
        </Text>
        <Text
          className="text-white text-[12px] mt-1"
          style={{ fontFamily: "poppinsLight" }}
        >
          teamgreen@gmail.com
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
          onPress={() => navigation.replace("Login")}
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
    </SafeAreaView>
  );
};

export default ProfileScreen;
