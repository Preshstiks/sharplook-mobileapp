import React, { useEffect, useRef, useState } from "react";
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
import { useAuth } from "../../../../context/AuthContext";
import { io } from "socket.io-client";
import { HttpClient } from "../../../../api/HttpClient";
import { EmptyData } from "../../../reusuableComponents/EmptyData";

export default function ChatListScreen() {
  const navigation = useNavigation();
  const { userId, isLoading: authLoading } = useAuth();
  const socketRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch chat list and previews from backend
  const fetchChats = async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const [chatsRes, previewsRes] = await Promise.all([
        HttpClient.get(`/messages/chats/${userId}`),
        HttpClient.get(`/messages/previews/${userId}`),
      ]);
      let previews = previewsRes.data.data || [];
      let chats = chatsRes.data.data || [];

      // Combine all chats and previews into one array
      const allItems = [...previews, ...chats];
      // console.log({ allItems });

      // Group by partnerId, keeping only the latest message per partner
      const chatMap = {};
      allItems.forEach((item) => {
        const ids = item.roomId.split("_");
        const partnerId = ids.find((id) => id !== userId);
        const msgTime = item.lastMessage?.createdAt || item.createdAt || null;

        // Try to get partner's name and avatar from lastMessage or item
        let partnerName = null;
        let partnerAvatar = null;
        if (item.lastMessage) {
          if (item.lastMessage.senderId === partnerId) {
            partnerName = item.lastMessage.senderName;
            partnerAvatar = item.lastMessage.senderAvatar;
          } else if (item.lastMessage.receiverId === partnerId) {
            partnerName = item.lastMessage.receiverName;
            partnerAvatar = item.lastMessage.receiverAvatar;
          }
        }
        // Fallbacks if not found in lastMessage
        partnerName = partnerName || item.partnerName || "Chat Partner";
        partnerAvatar =
          partnerAvatar ||
          item.partnerAvatar ||
          require("../../../../assets/img/logo/bglogo.svg");

        // Get last message text
        const lastMessageText =
          item.lastMessage?.text ||
          item.lastMessage?.message ||
          item.message ||
          "";

        if (
          !chatMap[partnerId] ||
          (msgTime && new Date(msgTime) > new Date(chatMap[partnerId].msgTime))
        ) {
          chatMap[partnerId] = {
            partnerId,
            roomId: item.roomId,
            name: partnerName,
            avatar: partnerAvatar,
            lastMessage: lastMessageText,
            msgTime,
          };
        }
      });

      // Convert to array and sort by latest message time
      const groupedChats = Object.values(chatMap)
        .sort((a, b) => new Date(b.msgTime) - new Date(a.msgTime))
        .map((item) => ({
          id: item.roomId,
          name: item.name,
          avatar: item.avatar,
          lastMessage: item.lastMessage,
          time: item.msgTime
            ? new Date(item.msgTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
        }));

      // console.log({ groupedChats });
      setChats(groupedChats);
    } catch (err) {
      setError("Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchChats();
      socketRef.current = io("https://sharplook-backend.onrender.com", {
        query: { userId },
        transports: ["websocket"],
      });
      // Listen for new messages to update chat list
      socketRef.current.on("newMessage", (msg) => {
        fetchChats(); // Optionally, you can optimize this to update only the relevant chat
      });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId]);

  if (authLoading || loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#FFF8FB] items-center justify-center">
        <Text style={{ fontFamily: "poppinsRegular" }}>Loading chats...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#FFF8FB] items-center justify-center">
        <Text style={{ fontFamily: "poppinsRegular", color: "red" }}>
          {error}
        </Text>
        <TouchableOpacity
          onPress={fetchChats}
          className="mt-4 bg-primary px-4 py-2 rounded"
        >
          <Text style={{ color: "#fff", fontFamily: "poppinsRegular" }}>
            Retry
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8FB]">
      <View className="bg-primary pt-[80px] pb-6 items-center">
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
        keyExtractor={(item) => item.id?.toString()}
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
                source={
                  item.avatar
                    ? item.avatar
                    : require("../../../../assets/img/logo/bglogo.svg")
                }
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
                {item.lastMessage || item.message}
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
        ListEmptyComponent={<EmptyData msg="No chats found" />}
      />
    </SafeAreaView>
  );
}
