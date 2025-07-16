import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import CloseNavBtn from "../../../assets/icon/opennav.svg";
import BottomModal from "../../reusuableComponents/BottomModal";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";
import { AntDesign } from "@expo/vector-icons";

export default function CustomDrawerContent(props) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleClientSelect = () => {
    setShowLogoutModal(false);
    props.navigation.replace("Login");
  };

  const handleVendorSelect = () => {
    setShowLogoutModal(false);
    props.navigation.replace("VendorLogin");
  };
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: "#FFFAFD" }}
    >
      <View style={{ marginTop: 30 }}>
        {/* Menu Icon */}
        <View className="justify-start flex-row">
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <CloseNavBtn width={40} height={40} />
          </TouchableOpacity>
        </View>
        {/* Vendor Info */}
        <View className="flex-row mt-8 gap-3 items-center">
          <Image
            source={require("../../../assets/img/logo/applogo.svg")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              marginBottom: 10,
            }}
          />
          <View>
            <Text style={{ fontFamily: "poppinsMedium", fontSize: 16 }}>
              Heritage Spa and Beauty Services
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 30 }}>
        {/* Store Setup and Management */}
        <TouchableOpacity
          className="flex-row items-center px-6 py-4"
          onPress={() => props.navigation.navigate("StoreManagement")}
        >
          <Ionicons name="storefront" size={22} color="#ED2584" />
          <Text
            className="ml-4 text-[14px] text-faintDark"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Store Setup and Management
          </Text>
        </TouchableOpacity>
        {/* Analytics and Insight */}
        <TouchableOpacity
          className="flex-row items-center px-6 py-4"
          onPress={() => props.navigation.navigate("AnalyticsAndInsight")}
        >
          <FontAwesome5 name="chart-line" size={20} color="#ED2584" />
          <Text
            className="ml-4 text-[15px] text-faintDark"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Analytics and Insight
          </Text>
        </TouchableOpacity>
        {/* Notification */}
        <TouchableOpacity
          className="flex-row items-center px-6 py-4"
          onPress={() => props.navigation.navigate("Notification")}
        >
          <Ionicons name="notifications-outline" size={22} color="#ED2584" />
          <Text
            className="ml-4 text-[14px] text-faintDark"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Notification
          </Text>
        </TouchableOpacity>
        {/* Settings */}
        <TouchableOpacity
          className="flex-row items-center px-6 py-4"
          onPress={() => props.navigation.navigate("VendorSettingsScreen")}
        >
          <Ionicons name="settings-outline" size={22} color="#ED2584" />
          <Text
            className="ml-4 text-[14px] text-faintDark"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Settings
          </Text>
        </TouchableOpacity>
        {/* Logout */}
        <TouchableOpacity
          className="flex-row items-center px-6 py-4"
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={22} color="#FF0000" />
          <Text
            className="ml-4 text-[14px] text-[#FF0000]"
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
    </DrawerContentScrollView>
  );
}
