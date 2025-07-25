import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletScreen from "./WalletScreen";
import TransactionHistoryScreen from "./TransactionHistoryScreen";
import FundClientWalletScreen from "./FundClientWallet";
import ClientWithdrawScreen from "./ClientWithdrawScreen";

const Stack = createNativeStackNavigator();

export default function WalletStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
      />
      <Stack.Screen
        name="FundClientWallet"
        component={FundClientWalletScreen}
      />
      <Stack.Screen
        name="ClientWithdrawScreen"
        component={ClientWithdrawScreen}
      />
    </Stack.Navigator>
  );
}
