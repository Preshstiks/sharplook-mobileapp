import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OfferPriceScreen from "./OfferPriceScreen";
import BookingDetailScreen from "./BookingDetailScreen";
import BookingsScreen from "./BookingsScreen";
import VendorProfileScreen from "../GlobalScreens/VendorProfileScreen";

const Stack = createNativeStackNavigator();

export default function BookingStack() {
  return (
    <Stack.Navigator
      initialRouteName="BookingsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
      <Stack.Screen
        name="BookingDetailScreen"
        component={BookingDetailScreen}
      />
      <Stack.Screen name="OfferPriceScreen" component={OfferPriceScreen} />
      <Stack.Screen
        name="VendorProfileScreen"
        component={VendorProfileScreen}
      />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}
