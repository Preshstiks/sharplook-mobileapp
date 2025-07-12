import React from "react";
import { View, Text, StyleSheet } from "react-native";

const backgroundColors = {
  success: "#10B981", // green
  error: "#EF4444", // red
  info: "#3B82F6", // blue
  warning: "#F59E42", // orange
  default: "#333", // fallback
};

export const CustomToast = ({ text1, type = "default", ...rest }) => (
  <View
    style={[
      styles.container,
      { backgroundColor: backgroundColors[type] || backgroundColors.default },
    ]}
  >
    <Text style={styles.text}>{text1}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 40,
    width: "90%",
  },
  text: {
    color: "#fff",
    fontSize: 13,
    flexWrap: "wrap", // Ensures text wraps
  },
});
