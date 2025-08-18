import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../GlobalScreens/CartScreen";
import Market from "./Market";
import ProductDetailsScreen from "../ProductDetailsScreen";
import ServiceDetailsScreen from "../ServiceDetailsScreen";
import VendorProfileProductDetailsScreen from "../VendorProfileProductDetailsScreen";
import VendorProfileServiceDetailsScreen from "../VendorProfileServiceDetailsScreen";

const Stack = createNativeStackNavigator();

export default function MarketStack() {
  return (
    <Stack.Navigator
      initialRouteName="Market"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        name="ServiceDetailsScreen"
        component={ServiceDetailsScreen}
      />
      <Stack.Screen
        name="VendorProfileProductDetailsScreen"
        component={VendorProfileProductDetailsScreen}
      />
      <Stack.Screen
        name="VendorProfileServiceDetailsScreen"
        component={VendorProfileServiceDetailsScreen}
      />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}
