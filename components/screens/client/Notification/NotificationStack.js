import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationList from "./NotificationList";
import NotificationDetailScreen from "./NotificationDetailScreen";

const Stack = createNativeStackNavigator();

export default function NotificationStack() {
  return (
    <Stack.Navigator
      initialRouteName="NotificationList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="NotificationList" component={NotificationList} />
      <Stack.Screen
        name="NotificationDetailScreen"
        component={NotificationDetailScreen}
      />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}
