import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function VendorProfilePreviewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendor Profile Preview</Text>
      <Text>Name: Jane Doe</Text>
      <Text>Specialty: Hair Stylist</Text>
      <Text>Rating: 4.8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
