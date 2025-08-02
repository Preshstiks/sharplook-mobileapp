import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import SplashIcon from "../../../assets/splash-icon.svg"; // Import SVG as a component
import { useAuth } from "../../../context/AuthContext";

export default function SplashScreen({ navigation }) {
  const { hasSeenOnboarding, isLoading, resetOnboardingStatus } = useAuth();
  const timerRef = useRef(null);

  useEffect(() => {
    const handleNavigation = () => {
      // If still loading auth status, wait
      if (isLoading) return;

      // If user has seen onboarding, go to login
      // If not, go to onboarding
      if (hasSeenOnboarding) {
        navigation.replace("Login");
      } else {
        navigation.replace("Onboarding");
      }
    };

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer
    timerRef.current = setTimeout(handleNavigation, 4000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [navigation, hasSeenOnboarding, isLoading]);

  // Debug function for testing - long press to reset onboarding
  const handleDebugReset = async () => {
    if (__DEV__) {
      await resetOnboardingStatus();
      // Restart the navigation timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        navigation.replace("Onboarding");
      }, 1000);
    }
  };

  return (
    <TouchableOpacity
      className="flex-1 items-center justify-center bg-secondary"
      onLongPress={handleDebugReset}
      activeOpacity={1}
    >
      <SplashIcon width={300} height={300} />
    </TouchableOpacity>
  );
}
