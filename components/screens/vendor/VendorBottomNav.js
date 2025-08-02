import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardScreen from "./Dashboard/DashboardScreen";
import MyProductsScreen from "./MyProductsScreen";
import VendorBookingsScreen from "./VendorBookingsScreen";
import VendorProfileScreen from "./VendorProfileScreen";
import MyServicesScreen from "./MyServicesScreen";
import DashboardStack from "./Dashboard/DashboardStack";

function Bookings() {
  return (
    <SafeAreaView
      className="flex-1 bg-secondary"
      edges={["bottom", "left", "right"]}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Bookings Screen</Text>
      </View>
    </SafeAreaView>
  );
}

function MyProducts() {
  return (
    <SafeAreaView
      className="flex-1 bg-secondary"
      edges={["bottom", "left", "right"]}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>My Products Screen</Text>
      </View>
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-secondary"
      edges={["bottom", "left", "right"]}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function VendorBottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Dashboard") {
            return <MaterialIcons name="dashboard" size={size} color={color} />;
          } else if (route.name === "Bookings") {
            return <MaterialIcons name="event" size={size} color={color} />;
          } else if (route.name === "My Products") {
            return <MaterialIcons name="inventory" size={size} color={color} />;
          } else if (route.name === "My Services") {
            return <MaterialIcons name="face" size={size} color={color} />;
          } else if (route.name === "Profile") {
            return <AntDesign name="user" size={24} color={color} />;
          }
        },
        tabBarActiveTintColor: "#EB278D",
        tabBarInactiveTintColor: "#00000099",
        tabBarStyle: { backgroundColor: "#FFFAFD", borderTopWidth: 0 },
        tabBarPressColor: "#EB278D",
        tabBarPressOpacity: 0.7,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Bookings" component={VendorBookingsScreen} />
      <Tab.Screen name="My Products" component={MyProductsScreen} />
      <Tab.Screen name="My Services" component={MyServicesScreen} />
      <Tab.Screen name="Profile" component={VendorProfileScreen} />
    </Tab.Navigator>
  );
}
