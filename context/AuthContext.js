import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useContext } from "react";
import { HttpClient } from "../api/HttpClient";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserID] = useState(null); // Add userID state
  const clearUserID = () => setUserID(null); // Add clearUserID function

  const login = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      // Fetch user details after saving token
      const response = await HttpClient.get("/auth/me");
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error during login or fetching user details:", error);
    }
  };
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setUserID(null); // Clear userID on logout as well
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
        userId, // Provide userID
        setUserID, // Provide setUserID
        clearUserID, // Provide clearUserID
        login, // Provide the enhanced login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
