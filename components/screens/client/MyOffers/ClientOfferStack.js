import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClientOffersScreen from "./ClientOffersScreen";
import ClientOfferDetailsScreen from "./ClientOfferDetails";
import TipMoreScreen from "./TipMoreScreen";
import AcceptedOfferDetailScreen from "./AcceptedOfferDetailScreen";
import VendorProfileScreen from "../GlobalScreens/VendorProfileScreen";

const Stack = createNativeStackNavigator();

export default function ClientOfferStack() {
  return (
    <Stack.Navigator
      initialRouteName="ClientOffersScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ClientOffersScreen" component={ClientOffersScreen} />
      <Stack.Screen
        name="ClientOfferDetailsScreen"
        component={ClientOfferDetailsScreen}
      />
      <Stack.Screen name="TipMore" component={TipMoreScreen} />
      <Stack.Screen
        name="AcceptedOfferDetail"
        component={AcceptedOfferDetailScreen}
      />
      <Stack.Screen
        name="VendorProfileScreen"
        component={VendorProfileScreen}
      />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}
