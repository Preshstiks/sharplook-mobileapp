import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({
  children,
  allowedUserTypes = [],
  fallback = null,
  showLoader = true,
}) => {
  const { isAuthenticated, isLoading, canAccess } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading && showLoader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#EB278D" />
      </View>
    );
  }

  // If not authenticated, return fallback or null
  if (!isAuthenticated) {
    return fallback;
  }

  // If specific user types are required, check them
  if (allowedUserTypes.length > 0 && !canAccess(allowedUserTypes)) {
    return fallback;
  }

  return children;
};

export default ProtectedRoute;
