// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createContext, useState, useContext, useEffect, useRef } from "react";
// import { HttpClient } from "../api/HttpClient";
// import { AppState } from "react-native";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true); // Start as true for initial auth check
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserID] = useState(null);
//   const [userType, setUserType] = useState(null);
//   const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
//   const [lastAttemptedCredentials, setLastAttemptedCredentials] =
//     useState(null);

//   // Refs for polling functionality
//   const pollingIntervalRef = useRef(null);
//   const appStateRef = useRef(AppState.currentState);

//   const clearUserID = () => setUserID(null);
//   const clearLastAttemptedCredentials = () => setLastAttemptedCredentials(null);

//   // Check authentication status and onboarding status on app start
//   useEffect(() => {
//     checkAuthStatus();
//     checkOnboardingStatus();
//   }, []);

//   // Set up automatic polling for user data
//   useEffect(() => {
//     const handleAppStateChange = (nextAppState) => {
//       if (
//         appStateRef.current.match(/inactive|background/) &&
//         nextAppState === "active"
//       ) {
//         // App has come to the foreground
//         console.log("App has come to the foreground!");
//         startPolling();
//       } else if (
//         appStateRef.current === "active" &&
//         nextAppState.match(/inactive|background/)
//       ) {
//         // App has gone to the background
//         console.log("App has gone to the background!");
//         stopPolling();
//       }
//       appStateRef.current = nextAppState;
//     };

//     const subscription = AppState.addEventListener(
//       "change",
//       handleAppStateChange
//     );

//     // Start polling if user is authenticated
//     if (isAuthenticated) {
//       startPolling();
//     }

//     return () => {
//       subscription?.remove();
//       stopPolling();
//     };
//   }, [isAuthenticated]);

//   // Start polling for user data updates
//   const startPolling = () => {
//     if (!isAuthenticated) return;

//     // Clear any existing interval
//     stopPolling();

//     // Set up new interval - refresh every 5 seconds
//     pollingIntervalRef.current = setInterval(async () => {
//       try {
//         console.log("🔄 Auto-refreshing user data...");
//         const response = await HttpClient.get("/auth/me");
//         if (response.data && response.data.user) {
//           const userData = response.data.user;

//           // Only update if there are actual changes
//           if (JSON.stringify(userData) !== JSON.stringify(user)) {
//             console.log(
//               "✅ User data changed detected by polling - updating state"
//             );
//             console.log("Changes detected in:", {
//               avatar:
//                 userData.avatar !== user?.avatar ? "Avatar updated" : null,
//               name: userData.name !== user?.name ? "Name updated" : null,
//               email: userData.email !== user?.email ? "Email updated" : null,
//               vendorOnboarding:
//                 userData.vendorOnboarding !== user?.vendorOnboarding
//                   ? "Vendor profile updated"
//                   : null,
//             });
//             setUser(userData);
//             setUserID(userData.id);
//             setUserType(userData.type || userData.role);
//           } else {
//             console.log("⏰ No changes detected in user data");
//           }
//         }
//       } catch (error) {
//         console.error("Error during auto-refresh:", error);
//         // If there's an auth error, stop polling and logout
//         if (error.response?.status === 401) {
//           stopPolling();
//           logout();
//         }
//       }
//     }, 5000); // 5 seconds
//   };

//   // Stop polling
//   const stopPolling = () => {
//     if (pollingIntervalRef.current) {
//       clearInterval(pollingIntervalRef.current);
//       pollingIntervalRef.current = null;
//     }
//   };

//   const checkOnboardingStatus = async () => {
//     try {
//       const onboardingCompleted = await AsyncStorage.getItem(
//         "onboardingCompleted"
//       );
//       setHasSeenOnboarding(onboardingCompleted === "true");
//     } catch (error) {
//       console.error("Error checking onboarding status:", error);
//       setHasSeenOnboarding(false);
//     }
//   };

//   const markOnboardingAsCompleted = async () => {
//     try {
//       await AsyncStorage.setItem("onboardingCompleted", "true");
//       setHasSeenOnboarding(true);
//     } catch (error) {
//       console.error("Error marking onboarding as completed:", error);
//     }
//   };

//   const resetOnboardingStatus = async () => {
//     try {
//       await AsyncStorage.removeItem("onboardingCompleted");
//       setHasSeenOnboarding(false);
//     } catch (error) {
//       console.error("Error resetting onboarding status:", error);
//     }
//   };

//   const checkAuthStatus = async () => {
//     try {
//       setIsLoading(true);
//       const token = await AsyncStorage.getItem("token");

//       if (token) {
//         // Verify token is still valid by fetching user data
//         const response = await HttpClient.get("/auth/me");
//         if (response.data && response.data.user) {
//           const userData = response.data.user;
//           setUser(userData);
//           setUserID(userData.id);
//           setUserType(userData.type || userData.role); // Adjust based on your API
//           setIsAuthenticated(true);
//         } else {
//           // Token invalid, clear it
//           await AsyncStorage.removeItem("token");
//           setUser(null);
//           setUserID(null);
//           setUserType(null);
//           setIsAuthenticated(false);
//         }
//       } else {
//         setUser(null);
//         setUserID(null);
//         setUserType(null);
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       console.error("Error checking auth status:", error);
//       // If token is invalid, clear it
//       await AsyncStorage.removeItem("token");
//       setUser(null);
//       setUserID(null);
//       setUserType(null);
//       setIsAuthenticated(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async (token, userTypeFromLogin = null) => {
//     try {
//       setIsLoading(true);
//       await AsyncStorage.setItem("token", token);

//       // Fetch user details after saving token
//       const response = await HttpClient.get("/auth/me");
//       if (response.data && response.data.user) {
//         const userData = response.data.user;
//         setUser(userData);
//         setUserID(userData.id);

//         // Set user type from API response or parameter
//         const type = userTypeFromLogin || userData.type || userData.role;
//         setUserType(type);
//         setIsAuthenticated(true);

//         // Clear any previous login attempts
//         setLastAttemptedCredentials(null);

//         // Start polling after successful login
//         startPolling();
//       }
//     } catch (error) {
//       console.error("Error during login or fetching user details:", error);
//       // Clear token if login fails
//       await AsyncStorage.removeItem("token");
//       setIsAuthenticated(false);
//       throw error; // Re-throw to handle in UI
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       setIsLoading(true);
//       // Stop polling before logout
//       stopPolling();

//       await AsyncStorage.removeItem("token");
//       setUser(null);
//       setIsAuthenticated(false);
//       setUserID(null);
//       setUserType(null);
//       setLastAttemptedCredentials(null);
//     } catch (error) {
//       console.error("Error during logout:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper function to check if user has specific role/type
//   const hasRole = (requiredRole) => {
//     if (!isAuthenticated || !userType) return false;
//     if (Array.isArray(requiredRole)) {
//       return requiredRole.includes(userType);
//     }
//     return userType === requiredRole;
//   };

//   // Helper function to check if user is authenticated and has required role
//   const canAccess = (requiredRoles = []) => {
//     if (!isAuthenticated) return false;
//     if (requiredRoles.length === 0) return true; // No specific role required
//     return hasRole(requiredRoles);
//   };

//   // Helper function to refresh user data from server
//   const refreshUserData = async () => {
//     try {
//       const response = await HttpClient.get("/auth/me");
//       if (response.data && response.data.user) {
//         const userData = response.data.user;
//         setUser(userData);
//         setUserID(userData.id);
//         setUserType(userData.type || userData.role);
//         return userData;
//       }
//     } catch (error) {
//       console.error("Error refreshing user data:", error);
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         logout,
//         isLoading,
//         setIsLoading,
//         isAuthenticated,
//         setIsAuthenticated,
//         userId,
//         setUserID,
//         clearUserID,
//         userType, // Add userType
//         setUserType, // Add setUserType
//         hasSeenOnboarding, // Add onboarding status
//         markOnboardingAsCompleted, // Add method to mark onboarding as completed
//         login,
//         lastAttemptedCredentials,
//         setLastAttemptedCredentials,
//         clearLastAttemptedCredentials,
//         checkAuthStatus, // Expose checkAuthStatus
//         hasRole, // Helper for role checking
//         canAccess, // Helper for access control
//         resetOnboardingStatus, // Add reset onboarding status
//         refreshUserData, // Add refresh user data function
//         startPolling, // Add polling control
//         stopPolling, // Add polling control
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useContext, useEffect, useRef } from "react";
import { HttpClient } from "../api/HttpClient";
import { AppState } from "react-native";
import notificationService from "../utils/notificationService";

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

  // Refs for polling functionality
  const pollingIntervalRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);

  const clearUserID = () => setUserID(null);
  const clearLastAttemptedCredentials = () => setLastAttemptedCredentials(null);

  // Check authentication status and onboarding status on app start
  useEffect(() => {
    checkAuthStatus();
    checkOnboardingStatus();
  }, []);

  // Set up automatic polling for user data
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        startPolling();
      } else if (
        appStateRef.current === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        stopPolling();
      }
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Start polling if user is authenticated
    if (isAuthenticated) {
      startPolling();
    }

    return () => {
      subscription?.remove();
      stopPolling();
    };
  }, [isAuthenticated]);

  // Start polling for user data updates
  const startPolling = () => {
    if (!isAuthenticated) return;

    // Clear any existing interval
    stopPolling();

    // Set up new interval - refresh every 5 seconds
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const response = await HttpClient.get("/auth/me");
        if (response.data && response.data.user) {
          const userData = response.data.user;

          // Use functional state update to prevent unnecessary re-renders
          setUser((prevUser) => {
            if (JSON.stringify(prevUser) !== JSON.stringify(userData)) {
              return userData;
            } else {
              return prevUser; // Return previous state to prevent re-render
            }
          });

          // Only update other states if they've actually changed
          setUserID((prevId) => {
            if (prevId !== userData.id) {
              return userData.id;
            }
            return prevId;
          });

          setUserType((prevType) => {
            const newType = userData.type || userData.role;
            if (prevType !== newType) {
              return newType;
            }
            return prevType;
          });
        }
      } catch (error) {
        // If there's an auth error, stop polling and logout
        if (error.response?.status === 401) {
          stopPolling();
          logout();
        }
      }
    }, 5000); // 5 seconds
  };

  // Stop polling
  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  const checkOnboardingStatus = async () => {
    try {
      const onboardingCompleted = await AsyncStorage.getItem(
        "onboardingCompleted"
      );
      setHasSeenOnboarding(onboardingCompleted === "true");
    } catch (error) {
      setHasSeenOnboarding(false);
    }
  };

  const markOnboardingAsCompleted = async () => {
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      setHasSeenOnboarding(true);
    } catch (error) {}
  };

  const resetOnboardingStatus = async () => {
    try {
      await AsyncStorage.removeItem("onboardingCompleted");
      setHasSeenOnboarding(false);
    } catch (error) {}
  };

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (token) {
        // Verify token is still valid by fetching user data
        const response = await HttpClient.get("/auth/me");
        if (response.data && response.data.user) {
          const userData = response.data.user;
          setUser(userData);
          setUserID(userData.id);
          setUserType(userData.type || userData.role); // Adjust based on your API
          setIsAuthenticated(true);
        } else {
          // Token invalid, clear it
          await AsyncStorage.removeItem("token");
          setUser(null);
          setUserID(null);
          setUserType(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setUserID(null);
        setUserType(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      // If token is invalid, clear it
      await AsyncStorage.removeItem("token");
      setUser(null);
      setUserID(null);
      setUserType(null);
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

        // Start polling after successful login
        startPolling();
      }
    } catch (error) {
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
      // Stop polling before logout
      stopPolling();

      // Clear notification service data
      await notificationService.clearStoredToken();
      notificationService.cleanup();

      await AsyncStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
      setUserID(null);
      setUserType(null);
      setLastAttemptedCredentials(null);
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

  // Helper function to refresh user data from server
  const refreshUserData = async () => {
    try {
      const response = await HttpClient.get("/auth/me");
      if (response.data && response.data.user) {
        const userData = response.data.user;

        // Use functional updates to prevent unnecessary re-renders
        setUser((prevUser) => {
          if (JSON.stringify(prevUser) !== JSON.stringify(userData)) {
            return userData;
          }
          return prevUser;
        });

        setUserID((prevId) => {
          if (prevId !== userData.id) {
            return userData.id;
          }
          return prevId;
        });

        setUserType((prevType) => {
          const newType = userData.type || userData.role;
          if (prevType !== newType) {
            return newType;
          }
          return prevType;
        });

        return userData;
      }
    } catch (error) {
      throw error;
    }
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
        userType,
        setUserType,
        hasSeenOnboarding,
        markOnboardingAsCompleted,
        login,
        lastAttemptedCredentials,
        setLastAttemptedCredentials,
        clearLastAttemptedCredentials,
        checkAuthStatus,
        hasRole,
        canAccess,
        resetOnboardingStatus,
        refreshUserData,
        startPolling,
        stopPolling,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
