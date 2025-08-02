import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useContext, useEffect } from "react";
import { HttpClient } from "../api/HttpClient";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true for initial auth check
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserID] = useState(null);
  const [userType, setUserType] = useState(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [lastAttemptedCredentials, setLastAttemptedCredentials] =
    useState(null);

  const clearUserID = () => setUserID(null);
  const clearLastAttemptedCredentials = () => setLastAttemptedCredentials(null);

  // Check authentication status and onboarding status on app start
  useEffect(() => {
    checkAuthStatus();
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingCompleted = await AsyncStorage.getItem(
        "onboardingCompleted"
      );
      setHasSeenOnboarding(onboardingCompleted === "true");
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setHasSeenOnboarding(false);
    }
  };

  const markOnboardingAsCompleted = async () => {
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error("Error marking onboarding as completed:", error);
    }
  };

  const resetOnboardingStatus = async () => {
    try {
      await AsyncStorage.removeItem("onboardingCompleted");
      setHasSeenOnboarding(false);
    } catch (error) {
      console.error("Error resetting onboarding status:", error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (token) {
        // Verify token is still valid by fetching user data
        const response = await HttpClient.get("/auth/me");
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setUserID(response.data.user.id);
          setUserType(response.data.user.type || response.data.user.role); // Adjust based on your API
          setIsAuthenticated(true);
        } else {
          // Token invalid, clear it
          await AsyncStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      // If token is invalid, clear it
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token, userTypeFromLogin = null) => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem("token", token);

      // Fetch user details after saving token
      const response = await HttpClient.get("/auth/me");
      if (response.data && response.data.user) {
        const userData = response.data.user;
        setUser(userData);
        setUserID(userData.id);

        // Set user type from API response or parameter
        const type = userTypeFromLogin || userData.type || userData.role;
        setUserType(type);
        setIsAuthenticated(true);

        // Clear any previous login attempts
        setLastAttemptedCredentials(null);
      }
    } catch (error) {
      console.error("Error during login or fetching user details:", error);
      // Clear token if login fails
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
      throw error; // Re-throw to handle in UI
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
      setUserID(null);
      setUserType(null);
      setLastAttemptedCredentials(null);

      // Clear subscription data on logout
      await clearSubscription();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to check if user has specific role/type
  const hasRole = (requiredRole) => {
    if (!isAuthenticated || !userType) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userType);
    }
    return userType === requiredRole;
  };

  // Helper function to check if user is authenticated and has required role
  const canAccess = (requiredRoles = []) => {
    if (!isAuthenticated) return false;
    if (requiredRoles.length === 0) return true; // No specific role required
    return hasRole(requiredRoles);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isLoading,
        setIsLoading,
        isAuthenticated,
        setIsAuthenticated,
        userId,
        setUserID,
        clearUserID,
        userType, // Add userType
        setUserType, // Add setUserType
        hasSeenOnboarding, // Add onboarding status
        markOnboardingAsCompleted, // Add method to mark onboarding as completed
        login,
        lastAttemptedCredentials,
        setLastAttemptedCredentials,
        clearLastAttemptedCredentials,
        checkAuthStatus, // Expose checkAuthStatus
        hasRole, // Helper for role checking
        canAccess, // Helper for access control
        resetOnboardingStatus, // Add reset onboarding status
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
