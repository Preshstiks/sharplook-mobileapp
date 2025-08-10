import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TawkToChat from "../../TawkToChat";
import { useAuth } from "../../../context/AuthContext";

export default function HelpSupportScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-[60px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[14px] text-faintDark"
        >
          Help and Support
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Search Bar */}
      <View className="px-4 mt-4">
        <View className="flex-row items-center bg-[#F6F6F6] rounded-lg px-3 py-2 mb-4">
          <Ionicons name="search" size={18} color="#BDBDBD" />
          <TextInput
            className="flex-1 ml-2 text-[14px]"
            placeholder="Search Help Center"
            style={{ fontFamily: "latoRegular" }}
          />
        </View>
        <Text
          className="text-[16px] mb-5 pt-5"
          style={{ fontFamily: "latoBold" }}
        >
          Help Topics
        </Text>
        <TouchableOpacity className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]">
          <View className="bg-primary p-2 rounded-full mr-4">
            <FontAwesome name="flag" size={22} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-black"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Get Started
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]">
          <View className="bg-primary p-2 rounded-full mr-4">
            <MaterialIcons name="payment" size={22} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-black"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Payment
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]">
          <View className="bg-primary p-2 rounded-full mr-4">
            <MaterialIcons name="event-available" size={22} color="#fff" />
          </View>
          <Text
            className="flex-1 text-[14px] text-black"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Booking System
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#A9A9A9" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]">
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
        </TouchableOpacity>
      </View>

      {/* Contact Us Section */}
      <View className="items-center mt-10">
        <Text className="text-[16px] mb-4" style={{ fontFamily: "latoBold" }}>
          Contact Us
        </Text>
        <Text
          className="text-[12px] text-[#555] mb-3"
          style={{ fontFamily: "poppinsRegular" }}
        >
          We are ready to hear from you
        </Text>
        <View className="flex-row justify-center gap-[40px] items-center mb-4">
          <TouchableOpacity>
            <FontAwesome name="instagram" size={32} color="#EB278D" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="facebook-square" size={32} color="#1877F3" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="email" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <View className="absolute bottom-[65px] right-4">
          <View className="items-center">
            <TouchableOpacity className="items-center justify-center bg-primary h-[40px] w-[40px] rounded-full mt-2">
              <Entypo name="chat" size={22} color="#fff" />
            </TouchableOpacity>
            <Text
              className="text-center text-[12px] mt-2"
              style={{ fontFamily: "latoBold" }}
            >
              Live Chat
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    color: "#222",
    fontSize: 16,
    fontFamily: "poppinsMedium",
    flex: 1,
    textAlign: "center",
    marginLeft: -28,
  },
});
