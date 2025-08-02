import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomSwitch from "../../../reusuableComponents/CustomSwitch";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [emailNotif, setEmailNotif] = useState(false);
  const [biometric, setBiometric] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate("Profile");
            }
          }}
        >
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 28 }} />
      </View>
      {/* Notification Section */}
      <View className="px-4 mt-4">
        <Text className="text-[16px] mb-2" style={{ fontFamily: "latoBold" }}>
          Notification
        </Text>
        <View className="flex-row items-center justify-between bg-white rounded-xl px-4 py-4 mb-4 border-b border-[#0000000D]">
          <Text
            className="text-[14px] text-[#555555]"
            style={{ fontFamily: "latoRegular" }}
          >
            Email Notification
          </Text>
          <CustomSwitch
            value={emailNotif}
            onValueChange={setEmailNotif}
            style={{}}
          />
        </View>
      </View>
      {/* Security Section */}
      <View className="px-4 mt-2">
        <Text className="text-[16px] mb-2" style={{ fontFamily: "latoBold" }}>
          Security
        </Text>
        <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-xl px-4 py-4 mb-4">
          <Text
            className="text-[14px] text-[#555555]"
            style={{ fontFamily: "latoRegular" }}
          >
            Change Password
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-xl px-4 py-4 mb-4 border-b border-[#0000000D]">
          <Text
            className="text-[14px] text-[#555555]"
            style={{ fontFamily: "latoRegular" }}
          >
            Reset Pin
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#000" />
        </TouchableOpacity>
        <View className="flex-row items-center justify-between bg-white rounded-xl px-4 py-4 mb-4">
          <Text
            className="text-[14px] text-[#555555]"
            style={{ fontFamily: "latoRegular" }}
          >
            Biometric (Face ID)
          </Text>
          <CustomSwitch
            value={biometric}
            onValueChange={setBiometric}
            style={{}}
          />
        </View>
      </View>
      {/* Theme Section */}
      <View className="px-4 mt-2">
        <Text className="text-[16px] mb-2" style={{ fontFamily: "latoBold" }}>
          Theme
        </Text>
        <View className="flex-row items-center justify-between bg-white rounded-xl px-4 py-4 mb-4 border-b border-[#0000000D]">
          <Text
            className="text-[14px] text-[#555555]"
            style={{ fontFamily: "latoRegular" }}
          >
            Dark mode
          </Text>
          <CustomSwitch
            value={darkMode}
            onValueChange={setDarkMode}
            style={{}}
          />
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
