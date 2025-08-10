import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyOrderScreen from "./MyOrderScreen";
import OrderDetailsScreen from "./OrderDetailsScreen";

const Stack = createNativeStackNavigator();

export default function MyOrderStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyOrderScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
    </Stack.Navigator>
  );
}
