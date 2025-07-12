import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import SplashIcon from "../../../assets/splash-icon.svg"; // Import SVG as a component
export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center bg-secondary">
      <SplashIcon width={300} height={300} />
    </View>
  );
}
