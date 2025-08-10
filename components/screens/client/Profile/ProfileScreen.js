import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../../context/AuthContext";
import React, { useState } from "react";
import TawkToChatForClient from "../../../TawkToChatForClient";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const [chatVisible, setChatVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const clientName = `${user?.lastName || ""} ${user?.firstName || ""}`;
  const clientEmail = user?.email || "";
  const clientPhone = user?.phone || "";
  const clientAvatar = user?.avatar || "";
  const clientRole = "client";

  const handleLogout = async () => {
    await logout();
  };

  const handleChatOpen = () => {
    setChatVisible(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  const handleChatClose = () => {
    setChatVisible(false);
    setIsLoading(true);
  };

  const handleChatLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  return (
    <SafeAreaView className="flex-1 bg-secondary">
      {/* Header with avatar, name, email */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View className="bg-primary rounded-b-[40px] pt-[30px] pb-8 px-4">
        <TouchableOpacity className="pb-6" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View className="items-center ">
          <Image
            source={
              user?.avatar
                ? { uri: user.avatar }
                : require("../../../../assets/icon/avatar.png")
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
          onPress={handleChatOpen}
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
        {/* <TouchableOpacity className="flex-row items-center bg-white rounded-xl px-4 py-4 shadow-sm">
          <View className="bg-[#FF0000] p-2 rounded-full mr-4">
            <Ionicons name="trash" size={24} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-[#FF0000]"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Delete Account
          </Text>
        </TouchableOpacity> */}
      </View>
      {/* TawkToChatForClient Modal */}
      <Modal
        visible={chatVisible}
        animationType="slide"
        onRequestClose={handleChatClose}
      >
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
          {/* Loading Overlay */}
          {isLoading && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#f5f5f5",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 20,
              }}
            >
              <ActivityIndicator size="large" color="#EB278D" />
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 16,
                  fontFamily: "poppinsRegular",
                  color: "#666",
                }}
              >
                Loading chat...
              </Text>
            </View>
          )}
          {/* WebView */}
          <TawkToChatForClient
            name={clientName}
            email={clientEmail}
            phone={clientPhone}
            avatar={clientAvatar}
            role={clientRole}
            onLoadEnd={handleChatLoad}
          />
          {/* Close Button */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 40,
              right: 20,
              zIndex: 30,
              backgroundColor: "#fff",
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 8,
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
            onPress={handleChatClose}
          >
            <Text
              style={{ fontSize: 16, color: "#EB278D", fontWeight: "bold" }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;
