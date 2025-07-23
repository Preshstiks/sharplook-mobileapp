import React from "react";
import "./global.css";
import AppNavigator from "./AppNavigator";
import { AuthProvider } from "./context/AuthContext";
import { StatusBar } from "react-native";
import { StatusBarProvider, useStatusBar } from "./context/StatusBarContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/ToastComponent/ToastConfig";
import { CartProvider } from "./context/CartContext";
import { PaystackProvider } from "react-native-paystack-webview";
if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaystackProvider publicKey="pk_test_7e789e881038b9ff8880ef8e6dac12be50defaf2">
        <StatusBarProvider>
          <StatusBar barStyle="light-content" backgroundColor="#EB278D" />
          <AuthProvider>
            <CartProvider>
              <AppNavigator />
              <Toast config={toastConfig} />
            </CartProvider>
          </AuthProvider>
        </StatusBarProvider>
      </PaystackProvider>
    </GestureHandlerRootView>
  );
}
