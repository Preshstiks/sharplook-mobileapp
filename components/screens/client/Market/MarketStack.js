import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../GlobalScreens/CartScreen";
import Market from "./Market";

const Stack = createNativeStackNavigator();

export default function MarketStack() {
  return (
    <Stack.Navigator
      initialRouteName="Market"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}
