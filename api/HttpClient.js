import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { EXPO_PUBLIC_API_BASE_URL } from "@env";
export const HttpClient = axios.create({
  // baseURL: EXPO_PUBLIC_API_BASE_URL,
  baseURL: "https://sharplook-backend-2l7j.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

HttpClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: new Date().getTime(),
    };
    return config;
  },
  (error) => Promise.reject(error)
);
