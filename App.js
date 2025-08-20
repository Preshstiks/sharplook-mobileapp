import React, { useEffect } from "react";
import "./global.css";
import AppNavigator from "./AppNavigator";
import { AuthProvider } from "./context/AuthContext";
import { StatusBar } from "react-native";
import { StatusBarProvider, useStatusBar } from "./context/StatusBarContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/ToastComponent/ToastConfig";
import { CartProvider } from "./context/CartContext";
import { CallProvider } from "./context/CallContext";
import { FilterProvider } from "./context/FilterContext";
import notificationService from "./utils/notificationService";

if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;
}

const linking = {
  prefixes: ["sharplook://"],
  config: {
    screens: {
      ClientApp: {
        screens: {
          BookAppointmentScreen: "BookAppointmentScreen/:id",
        },
      },
    },
  },
};

export default function App() {
  useEffect(() => {
    // Initialize notification service when app starts
    const initializeNotifications = async () => {
      try {
        console.log("Initializing notification service...");
        const success = await notificationService.initialize();
        console.log("Notification service initialization result:", success);

        if (!success) {
          console.warn("Failed to initialize notification service");
        }
      } catch (error) {
        console.error("Error initializing notification service:", error);
      }
    };

    initializeNotifications();

    // Cleanup on unmount
    return () => {
      notificationService.cleanup();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBarProvider>
        <StatusBar barStyle="light-content" backgroundColor="#EB278D" />
        <AuthProvider>
          <CartProvider>
            <CallProvider>
              <FilterProvider>
                {/* Pass linking prop to AppNavigator */}
                <AppNavigator linking={linking} />
                <Toast config={toastConfig} />
              </FilterProvider>
            </CallProvider>
          </CartProvider>
        </AuthProvider>
      </StatusBarProvider>
    </GestureHandlerRootView>
  );
}
