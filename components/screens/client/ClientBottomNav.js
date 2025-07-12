import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  AntDesign,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileScreen from "./ProfileScreen";
import NotificationList from "./NotificationList";
import BookingsScreen from "./BookingsScreen";
import Market from "./Market";

function NotificationScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-secondary"
      edges={["bottom", "left", "right"]}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Notification Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function ClientBottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return (
              <FontAwesome6 name="fire-flame-curved" size={24} color={color} />
            );
          } else if (route.name === "Market") {
            return <FontAwesome6 name="shop" size={size} color={color} />;
          } else if (route.name === "Bookings") {
            return <MaterialIcons name="event" size={size} color={color} />;
          } else if (route.name === "Notification") {
            return (
              <Ionicons
                name="notifications-outline"
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            return <AntDesign name="user" size={24} color={color} />;
          }
        },
        tabBarActiveTintColor: "#EB278D",
        tabBarInactiveTintColor: "#00000099",
        tabBarStyle: { backgroundColor: "#FFFAFD", borderTopWidth: 0 },
        tabBarPressColor: "#EB278D", // <-- Ripple color for Android
        tabBarPressOpacity: 0.7,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Market" component={Market} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Notification" component={NotificationList} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
