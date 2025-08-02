import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ChatConnectionLoader = ({
  visible,
  message = "Establishing connection...",
}) => {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black bg-opacity-50 items-center justify-center z-50">
      <View className="bg-white rounded-xl p-6 items-center mx-4">
        <ActivityIndicator size="large" color="#EB278D" />
        <Text
          className="text-gray-700 mt-4 text-center"
          style={{ fontFamily: "poppinsRegular" }}
        >
          {message}
        </Text>
        <View className="flex-row items-center mt-2">
          <Ionicons name="chatbubble-ellipses" size={16} color="#EB278D" />
          <Text
            className="text-xs text-gray-500 ml-1"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Connecting to SharpChat...
          </Text>
        </View>
      </View>
    </View>
  );
};
