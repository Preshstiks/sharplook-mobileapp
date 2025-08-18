import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNotifications } from "../../hooks/useNotifications";
import notificationService from "../../utils/notificationService";

export default function NotificationPermissionRequest() {
  const [isRequesting, setIsRequesting] = useState(false);
  const { sendTestNotification } = useNotifications();

  const requestPermissions = async () => {
    setIsRequesting(true);
    try {
      // This will trigger the permission request
      const success = await notificationService.registerForPushNotifications();
      if (success) {
        Alert.alert("Success", "Notification permissions granted!");
      } else {
        Alert.alert(
          "Permission Denied",
          "Please enable notifications in settings to receive updates."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to request notification permissions.");
    } finally {
      setIsRequesting(false);
    }
  };

  const testNotification = async () => {
    try {
      await sendTestNotification();
      Alert.alert(
        "Test Sent",
        "Check your notification! Tap it to navigate to notifications."
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send test notification.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enable Notifications</Text>
      <Text style={styles.description}>
        Stay updated with your bookings, messages, and important updates.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={requestPermissions}
        disabled={isRequesting}
      >
        <Text style={styles.buttonText}>
          {isRequesting ? "Requesting..." : "Enable Notifications"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.testButton]}
        onPress={testNotification}
      >
        <Text style={styles.buttonText}>Test Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#EB278D",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  testButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
