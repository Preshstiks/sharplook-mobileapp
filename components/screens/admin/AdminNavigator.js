import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHomeScreen from "./AdminHomeScreen";

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
