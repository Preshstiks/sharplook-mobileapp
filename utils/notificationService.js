import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HttpClient } from "../api/HttpClient";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Storage key for device token (independent of user auth)
const DEVICE_TOKEN_KEY = "@device_push_token";

class NotificationService {
  constructor() {
    this.expoPushToken = null;
    this.notificationListener = null;
    this.responseListener = null;
    this.navigationRef = null;
    this.userType = null; // 'CLIENT' or 'VENDOR'
  }

  /**
   * Set navigation reference for handling notification navigation
   */
  setNavigationRef(navigationRef, userType) {
    this.navigationRef = navigationRef;
    this.userType = userType;
    console.log("Navigation ref set for user type:", userType);
  }

  /**
   * Navigate based on notification data
   */
  handleNotificationNavigation(data) {
    console.log("handleNotificationNavigation called with data:", data);
    console.log("Navigation ref exists:", !!this.navigationRef);
    console.log("User type:", this.userType);

    if (!this.navigationRef || !this.userType) {
      console.log("Navigation ref or user type not set");
      return;
    }

    try {
      console.log(
        "Attempting to navigate to notification list for user type:",
        this.userType
      );

      // Navigate to notification list for both client and vendor
      if (this.userType === "CLIENT") {
        console.log("Navigating to ClientApp -> Main -> NotificationStack");
        this.navigationRef.navigate("ClientApp", {
          screen: "Main",
          params: {
            screen: "NotificationStack",
          },
        });
      } else if (this.userType === "VENDOR") {
        console.log("Navigating to VendorApp -> NotificationList");
        this.navigationRef.navigate("VendorApp", {
          screen: "NotificationList",
        });
      } else {
        console.log("Unknown user type:", this.userType);
      }
    } catch (error) {
      console.error("Error handling notification navigation:", error);
    }
  }

  /**
   * Request notification permissions and register for push tokens
   */
  async registerForPushNotifications() {
    try {
      // Check if device supports notifications
      if (!Device.isDevice) {
        console.log("Must use physical device for Push Notifications");
        return false;
      }

      // Request permissions
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return false;
      }

      // Get the token
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: "5fefe00a-d2c0-4a4e-974a-85bafc3c0f16", // Your EAS project ID
      });

      this.expoPushToken = token.data;
      console.log("Expo push token:", this.expoPushToken);

      // Store token locally (independent of user auth)
      await this.storePushToken(this.expoPushToken);

      // Register token with your backend
      await this.registerTokenWithBackend(this.expoPushToken);

      // Set up notification listeners
      this.setupNotificationListeners();

      return true;
    } catch (error) {
      console.error("Error registering for push notifications:", error);
      return false;
    }
  }

  /**
   * Store push token locally (independent of user auth state)
   */
  async storePushToken(token) {
    try {
      await AsyncStorage.setItem(DEVICE_TOKEN_KEY, token);
      console.log("Device token stored locally:", token);
    } catch (error) {
      console.error("Error storing push token:", error);
    }
  }

  /**
   * Get stored push token (independent of user auth state)
   */
  async getStoredPushToken() {
    try {
      const token = await AsyncStorage.getItem(DEVICE_TOKEN_KEY);
      console.log("Retrieved stored device token:", token);
      return token;
    } catch (error) {
      console.error("Error getting stored push token:", error);
      return null;
    }
  }

  /**
   * Register token with your backend
   */
  async registerTokenWithBackend(token) {
    try {
      const response = await HttpClient.put("/user/updateFcmToken", {
        fcmToken: token,
      });

      // Only log the token registration success, not the entire user object
      console.log("TOKEN REGISTERED WITH BACKEND:", response);
    } catch (error) {
      console.error("Error registering token with backend:", error);
    }
  }

  /**
   * Set up notification listeners
   */
  setupNotificationListeners() {
    // Listen for incoming notifications when app is in foreground
    this.notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
        this.handleNotificationReceived(notification);
      }
    );

    // Listen for user interaction with notifications
    this.responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
        this.handleNotificationResponse(response);
      });
  }

  /**
   * Handle received notifications
   */
  handleNotificationReceived(notification) {
    // You can add custom logic here to handle different types of notifications
    const { title, body, data } = notification.request.content;

    // Example: Update badge count, show custom UI, etc.
    console.log("Received notification:", { title, body, data });
  }

  /**
   * Handle user interaction with notifications
   */
  handleNotificationResponse(response) {
    const { title, body, data } = response.notification.request.content;

    console.log("User tapped notification:", { title, body, data });

    // Always navigate to notification list when user taps notification
    this.handleNotificationNavigation(data);
  }

  /**
   * Send local notification (for testing)
   */
  async sendLocalNotification(title, body, data = {}) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error("Error sending local notification:", error);
    }
  }

  /**
   * Clear notification badge
   */
  async clearBadge() {
    try {
      await Notifications.setBadgeCountAsync(0);
    } catch (error) {
      console.error("Error clearing badge:", error);
    }
  }

  /**
   * Get current notification permissions
   */
  async getNotificationPermissions() {
    try {
      return await Notifications.getPermissionsAsync();
    } catch (error) {
      console.error("Error getting notification permissions:", error);
      return null;
    }
  }

  /**
   * Clean up listeners
   */
  cleanup() {
    if (this.notificationListener) {
      this.notificationListener.remove();
    }
    if (this.responseListener) {
      this.responseListener.remove();
    }
  }

  /**
   * Initialize notification service
   */
  async initialize() {
    try {
      // Check if we already have a stored token
      const storedToken = await this.getStoredPushToken();

      if (storedToken) {
        console.log("Using stored device token:", storedToken);
        this.expoPushToken = storedToken;

        // Set up listeners
        this.setupNotificationListeners();

        // Register stored token with backend
        await this.registerTokenWithBackend(storedToken);

        return true;
      } else {
        console.log("No stored token found - generating new token");

        // Set up listeners
        this.setupNotificationListeners();

        // Generate and register new token
        await this.registerForPushNotifications();

        return true;
      }
    } catch (error) {
      console.error("Error initializing notification service:", error);
      return false;
    }
  }

  /**
   * Clear stored device token (useful for logout scenarios)
   */
  async clearStoredToken() {
    try {
      await AsyncStorage.removeItem(DEVICE_TOKEN_KEY);
      this.expoPushToken = null;
      console.log("Stored device token cleared");
    } catch (error) {
      console.error("Error clearing stored token:", error);
    }
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;
