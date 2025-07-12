import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
