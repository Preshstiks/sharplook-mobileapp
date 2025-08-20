import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNotifications } from "../../hooks/useNotifications";
import notificationService from "../../utils/notificationService";

export default function NotificationPermissionRequest() {
  const [isRequesting, setIsRequesting] = useState(false);
  const [status, setStatus] = useState({});
  const { sendTestNotification } = useNotifications();

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    try {
      const permissions =
        await notificationService.getNotificationPermissions();
      const currentToken = notificationService.getCurrentToken();

      setStatus({
        permissions: permissions?.status || "unknown",
        hasToken: !!currentToken,
        tokenPreview: currentToken
          ? `${currentToken.substring(0, 20)}...`
          : "No token",
        isInitialized: notificationService.isInitialized,
      });
    } catch (error) {
      console.error("Error checking notification status:", error);
    }
  };

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
      await checkNotificationStatus();
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

  const forceReinitialize = async () => {
    try {
      await notificationService.clearStoredToken();
      await notificationService.initialize();
      await checkNotificationStatus();
      Alert.alert("Success", "Notification service reinitialized!");
    } catch (error) {
      Alert.alert("Error", "Failed to reinitialize notification service.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notification Debug Panel</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Current Status:</Text>
        <Text style={styles.statusText}>Permissions: {status.permissions}</Text>
        <Text style={styles.statusText}>
          Has Token: {status.hasToken ? "Yes" : "No"}
        </Text>
        <Text style={styles.statusText}>Token: {status.tokenPreview}</Text>
        <Text style={styles.statusText}>
          Initialized: {status.isInitialized ? "Yes" : "No"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={requestPermissions}
        disabled={isRequesting}
      >
        <Text style={styles.buttonText}>
          {isRequesting ? "Requesting..." : "Request Permissions"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={testNotification}>
        <Text style={styles.buttonText}>Send Test Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={forceReinitialize}>
        <Text style={styles.buttonText}>Force Reinitialize</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={checkNotificationStatus}>
        <Text style={styles.buttonText}>Refresh Status</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  statusContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  statusText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
  },
  button: {
    backgroundColor: "#EB278D",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
