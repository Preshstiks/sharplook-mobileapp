import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Linking,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TawkToChatForClient from "../../../TawkToChatForClient";
import { useAuth } from "../../../../context/AuthContext";

export default function HelpSupportScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [chatVisible, setChatVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const clientName = `${user?.lastName || ""} ${user?.firstName || ""}`;
  const clientEmail = user?.email || "";
  const clientPhone = user?.phone || "";
  const clientAvatar = user?.avatar || "";
  const clientRole = "client";
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
  const handleEmailPress = () => {
    Linking.openURL("mailto:hello@sharplook.beauty");
  };
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-[40px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[16px] text-faintDark"
        >
          Help and Support
        </Text>
        <View style={{ width: 26 }} />
      </View>
      {/* Search Bar */}
      <View className="px-4 mt-4">
        {/* <View className="flex-row items-center bg-[#F6F6F6] rounded-lg px-3 py-2 mb-4">
          <Ionicons name="search" size={18} color="#BDBDBD" />
          <TextInput
            className="flex-1 ml-2 text-[14px]"
            placeholder="Search Help Center"
            style={{ fontFamily: "latoRegular" }}
          />
        </View> */}
        <Text
          className="text-[18px] mb-5 pt-5"
          style={{ fontFamily: "latoBold" }}
        >
          Help Topics
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("GetStartedScreen")}
          className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]"
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <FontAwesome name="flag" size={22} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[16px] text-black"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Get Started
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("PaymentScreen")}
          className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]"
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <MaterialIcons name="payment" size={22} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[16px] text-black"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Payment
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("BookingSystemScreen")}
          className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]"
        >
          <View className="bg-primary p-2 rounded-full mr-4">
            <MaterialIcons name="event-available" size={22} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[16px] text-black"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Booking System
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        {/* <TouchableOpacity className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]">
          <View className="bg-primary p-2 rounded-full mr-4">
            <Entypo name="chat" size={22} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-black"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Chat
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity> */}
      </View>
      {/* Contact Us Section */}
      <View className="items-center mt-10">
        <Text className="text-[18px] mb-4" style={{ fontFamily: "latoBold" }}>
          Contact Us
        </Text>
        <Text
          className="text-[14px] text-[#555] mb-3"
          style={{ fontFamily: "poppinsRegular" }}
        >
          We are ready to hear from you via email
        </Text>
        {/* <Text
          className="text-[12px] text-[#555] mb-3"
          style={{ fontFamily: "poppinsRegular" }}
        >
          We are ready to hear from you
        </Text> */}
        <View className="flex-row justify-center gap-[40px] items-center mb-4">
          {/* <TouchableOpacity>
            <FontAwesome name="instagram" size={32} color="#EB278D" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="facebook-square" size={32} color="#1877F3" />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={handleEmailPress}>
            <Text className="text-primary underline">
              hello@sharplook.beauty
            </Text>
            {/* <MaterialIcons name="email" size={32} color="black" /> */}
          </TouchableOpacity>
        </View>
      </View>
      <View className="absolute bottom-[85px] right-4">
        <View className="items-center">
          <TouchableOpacity
            onPress={handleChatOpen}
            className="items-center justify-center bg-primary h-[40px] w-[40px] rounded-full mt-2"
          >
            <Entypo name="chat" size={22} color="#fff" />
          </TouchableOpacity>
          <Text
            className="text-center text-[14px] mt-2"
            style={{ fontFamily: "latoBold" }}
          >
            Live Chat
          </Text>
        </View>
      </View>
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
                  fontSize: 18,
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
              style={{ fontSize: 18, color: "#EB278D", fontWeight: "bold" }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
