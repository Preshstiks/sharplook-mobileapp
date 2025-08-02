import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import CloseNavBtn from "../../../assets/icon/closenav.svg";
import { useAuth } from "../../../context/AuthContext";

export default function CustomDrawerContent(props) {
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
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
            className="border border-primary"
            source={
              user?.avatar
                ? { uri: user?.avatar }
                : require("../../../assets/icon/avatar.png")
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              marginBottom: 10,
            }}
          />
          <View>
            <Text style={{ fontFamily: "poppinsMedium", fontSize: 16 }}>
              {user?.lastName} {user?.firstName}
            </Text>
            <Text
              className="text-faintDark"
              style={{
                fontFamily: "poppinsRegular",
                fontSize: 14,
              }}
            >
              {user?.email}
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
    </DrawerContentScrollView>
  );
}
