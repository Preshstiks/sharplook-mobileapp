import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import CloseNavBtn from "../../../assets/icon/closenav.svg";
export default function CustomDrawerContent(props) {
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
        onPress={() => {
          // handle logout logic here
        }}
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
