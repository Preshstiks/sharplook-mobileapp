import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import CloseNavBtn from "../../../assets/icon/closenav.svg";
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
        <View className="justify-end flex-row">
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <CloseNavBtn width={40} height={40} />
          </TouchableOpacity>
        </View>
        {/* User Info */}
        <View className="flex-row mt-8 gap-3 items-center">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              marginBottom: 10,
            }}
          />
          <View>
            <Text style={{ fontFamily: "poppinsMedium", fontSize: 16 }}>
              Team Green
            </Text>
            <Text
              className="text-faintDark"
              style={{
                fontFamily: "poppinsRegular",
                fontSize: 14,
              }}
            >
              teamgreen@gmail.com
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 30 }}>
        <DrawerItemList {...props} />
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 20,
          marginBottom: 30,
        }}
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={24} color="red" />
        <Text
          style={{ color: "red", fontFamily: "poppinsRegular", marginLeft: 10 }}
        >
          Logout
        </Text>
      </TouchableOpacity>

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
