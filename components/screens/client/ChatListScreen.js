import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import { io } from "socket.io-client";

const chats = [
  {
    id: "1",
    name: "Heritage Spa and Beauty",
    message: "Hi, can I order?",
    time: "09:20 AM",
    avatar: require("../../../assets/img/logo/bglogo.svg"),
  },
  {
    id: "2",
    name: "Beauty by Ayo",
    message: "I want to tell you that, ok?",
    time: "08:30 PM",
    avatar: require("../../../assets/img/logo/bglogo.svg"),
  },
  {
    id: "3",
    name: "Priti Beauty Services",
    message: "Ok, I will get back to you",
    time: "08:30 PM",
    avatar: require("../../../assets/img/logo/bglogo.svg"),
  },
  {
    id: "4",
    name: "Priti Store",
    message: "Let's chat on facebook",
    time: "08:30 PM",
    avatar: require("../../../assets/img/logo/bglogo.svg"),
  },
  {
    id: "5",
    name: "Jameco Store",
    message: "OH! my bad",
    time: "08:30 PM",
    avatar: require("../../../assets/img/logo/bglogo.svg"),
  },
];

export default function ChatListScreen() {
  const navigation = useNavigation();
  const { userId } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (userId) {
      socketRef.current = io("https://sharplook-backend.onrender.com", {
        query: { userId },
        transports: ["websocket"],
      });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId]);

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8FB]">
      <View className="bg-primary py-6 items-center">
        <Text
          className="text-white text-xl font-bold"
          style={{ fontFamily: "poppinsRegular" }}
        >
          My Chats
        </Text>
      </View>
      <View className="px-4 mt-4">
        <View className="flex-row items-center bg-white border border-[#F9BCDC] rounded-xl px-4 pt-3 pb-2">
          <MaterialIcons name="search" size={24} color="#8c817a" />
          <TextInput
            className="ml-2 text-xs flex-1"
            placeholder="Search messages"
            cursorColor="#BF6A37"
            style={{ fontFamily: "poppinsRegular" }}
          />
        </View>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row items-center mb-6"
            onPress={() =>
              navigation.navigate("ChatDetailScreen", { chat: item })
            }
          >
            <View className="w-14 h-14 rounded-full bg-white items-center justify-center mr-4 overflow-hidden">
              {/* Replace with SVG if needed */}
              <Image
                source={item.avatar}
                style={{ width: 48, height: 48 }}
                resizeMode="contain"
              />
            </View>
            <View className="flex-1 border-b border-[#E5E5E5] pb-3">
              <Text
                className="text-base font-semibold text-faintDark"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {item.name}
              </Text>
              <Text
                className="text-xs text-[#A9A9A9] mt-1"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {item.message}
              </Text>
            </View>
            <View className="ml-2">
              <Text
                className="text-xs text-[#A9A9A9]"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {item.time}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
