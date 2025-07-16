import React from "react";
import "./global.css";
import AppNavigator from "./AppNavigator";
import { AuthProvider } from "./context/AuthContext";
import { StatusBar } from "react-native";
import { StatusBarProvider, useStatusBar } from "./context/StatusBarContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/ToastComponent/ToastConfig";
if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;
}
function GlobalStatusBar() {
  const { barType } = useStatusBar();
  return (
    <StatusBar
      barStyle={barType === "secondary" ? "dark-content" : "light-content"}
      backgroundColor={barType === "secondary" ? "#FFFAFD" : "#EB278D"}
    />
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBarProvider>
        <GlobalStatusBar />
        <AuthProvider>
          <AppNavigator />
          <Toast config={toastConfig} />
        </AuthProvider>
      </StatusBarProvider>
    </GestureHandlerRootView>
  );
}
