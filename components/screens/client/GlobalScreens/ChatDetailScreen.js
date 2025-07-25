import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../../context/AuthContext";
import { io } from "socket.io-client";

export default function ChatDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { chat } = route.params;
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = React.useRef(null);
  const userId = user?.id;
  // Generate roomId from userId and chatPartnerId
  const chatPartnerId = chat.id;
  const generateRoomId = (userA, userB) => [userA, userB].sort().join("_");
  const roomId = generateRoomId(userId, chatPartnerId);

  React.useEffect(() => {
    if (!userId || !chatPartnerId) return;
    socketRef.current = io("https://sharplook-backend.onrender.com", {
      query: { userId },
      transports: ["websocket"],
    });
    // Join the room
    socketRef.current.emit("join-room", roomId);
    // Listen for new messages
    socketRef.current.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    // Optionally: fetch initial messages via REST or socket event
    fetch(`https://sharplook-backend.onrender.com/api/v1/messages/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMessages(data.data);
      });
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId, chatPartnerId, roomId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const messageData = {
      senderId: userId,
      receiverId: chatPartnerId,
      roomId,
      message: input.trim(),
    };
    socketRef.current.emit("sendMessage", messageData);
    setMessages((prev) => [
      ...prev,
      {
        ...messageData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        seen: false,
        sent: true,
      },
    ]);
    setInput("");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8FB]">
      <View className="flex-row items-center bg-primary pt-[50px] pb-6 px-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-2">
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <View className="w-10 h-10 rounded-full bg-white items-center justify-center mr-3 overflow-hidden">
          {/* Replace with SVG if needed */}
          <Image
            source={chat.avatar}
            style={{ width: 36, height: 36 }}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text
            className="text-white text-base font-semibold"
            style={{ fontFamily: "poppinsRegular" }}
          >
            {chat.name}
          </Text>
          <Text
            className="text-xs text-white mt-1"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Online <Text className="text-[#00FF00]">•</Text>
          </Text>
        </View>
      </View>
      <ScrollView className="flex-1 px-4 py-4">
        {messages.map((msg) => {
          const isOwn = msg.senderId === userId;
          return (
            <View
              key={msg.id}
              className={isOwn ? "items-end mb-2" : "items-start mb-2"}
            >
              <View
                className={
                  isOwn
                    ? "bg-primary rounded-xl px-4 py-2 max-w-[80%]"
                    : "bg-white border border-[#E5E5E5] rounded-xl px-4 py-2 max-w-[80%]"
                }
              >
                <Text
                  className={isOwn ? "text-white" : "text-faintDark"}
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  {msg.message}
                </Text>
              </View>
              <Text
                className="text-xs text-[#A9A9A9] mt-1"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {msg.seen ? "Seen " : "Sent "}
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString()
                  : msg.time || ""}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View className="flex-row items-center px-4 py-3 bg-white border-t border-[#E5E5E5]">
        <TextInput
          className="flex-1 bg-[#F5F5F5] rounded-full px-4 py-2 text-sm"
          placeholder="Type message..."
          value={input}
          onChangeText={setInput}
          style={{ fontFamily: "poppinsRegular" }}
        />
        <TouchableOpacity
          className="ml-2 bg-primary rounded-full p-2"
          onPress={sendMessage}
        >
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
