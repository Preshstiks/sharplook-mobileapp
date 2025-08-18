import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import notificationService from "../utils/notificationService";

export const useNotifications = () => {
  const { user, userType, isAuthenticated } = useAuth();
  const navigationRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && userType) {
      // Initialize notification service
      notificationService.initialize();
    }
  }, [isAuthenticated, userType]);

  const setNavigationRef = (ref) => {
    navigationRef.current = ref;
    if (isAuthenticated && userType) {
      notificationService.setNavigationRef(ref, userType);
    }
  };

  const forceRegisterToken = async () => {
    try {
      await notificationService.registerForPushNotifications();
    } catch (error) {
      console.error("Error forcing token registration:", error);
    }
  };

  const sendTestNotification = async () => {
    try {
      await notificationService.sendLocalNotification(
        "Test Notification",
        "Tap to view notifications",
        {
          type: "NOTIFICATION",
        }
      );
    } catch (error) {
      console.error("Error sending test notification:", error);
    }
  };

  const clearBadge = async () => {
    try {
      await notificationService.clearBadge();
    } catch (error) {
      console.error("Error clearing badge:", error);
    }
  };

  return {
    setNavigationRef,
    sendTestNotification,
    clearBadge,
    forceRegisterToken,
    notificationService,
  };
};
