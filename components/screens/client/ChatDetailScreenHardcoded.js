import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useStatusBar } from "../../../context/StatusBarContext";

// Hardcoded chat data
const hardcodedChat = {
  name: "Sarah Johnson",
  avatar: require("../../../assets/img/alex.svg"),
  isOnline: true,
};

const hardcodedMessages = [
  {
    id: 1,
    text: "Hello! How can I help you today?",
    time: "10:30 AM",
    seen: true,
    sent: false,
  },
  {
    id: 2,
    text: "Hi Sarah! I'm interested in booking a facial treatment",
    time: "10:32 AM",
    seen: true,
    sent: true,
  },
  {
    id: 3,
    text: "Great! I have several facial treatments available. What's your skin type?",
    time: "10:33 AM",
    seen: true,
    sent: false,
  },
  {
    id: 4,
    text: "I have combination skin with some acne concerns",
    time: "10:35 AM",
    seen: true,
    sent: true,
  },
  {
    id: 5,
    text: "Perfect! I recommend our Deep Cleansing Facial with Acne Treatment. It's $85 for 60 minutes",
    time: "10:36 AM",
    seen: true,
    sent: false,
  },
  {
    id: 6,
    text: "That sounds perfect! Can I book it for tomorrow at 2 PM?",
    time: "10:38 AM",
    seen: true,
    sent: true,
  },
  {
    id: 7,
    text: "Absolutely! I have that slot available. I'll send you a confirmation shortly",
    time: "10:40 AM",
    seen: true,
    sent: false,
  },
  {
    id: 8,
    text: "Thank you so much! Looking forward to it",
    time: "10:41 AM",
    seen: false,
    sent: true,
  },
];

export default function ChatDetailScreenHardcoded() {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const scrollViewRef = useRef(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      // In a real app, you would send the message here
      console.log("Sending message:", input);
      setInput("");
    }
  };

  const { setBarType } = useStatusBar();
  useEffect(() => {
    setBarType("primary");
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        // Scroll to bottom when keyboard appears
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
    };
  }, []);

  return (
    <View className="flex-1 bg-[#FFF8FB]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-row items-center bg-primary pt-[50px] pb-6 px-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-2"
          >
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <View className="w-10 h-10 rounded-full bg-white items-center justify-center mr-3 overflow-hidden">
            <Image
              source={hardcodedChat.avatar}
              style={{ width: 36, height: 36 }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text
              className="text-white text-[14px] font-semibold"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {hardcodedChat.name}
            </Text>
            <Text
              className="text-[12px] text-white"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {hardcodedChat.isOnline ? (
                <>
                  Online <Text className="text-[#00FF00]">•</Text>
                </>
              ) : (
                "Offline"
              )}
            </Text>
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
        >
          {hardcodedMessages.map((msg) => (
            <View
              key={msg.id}
              className={msg.sent ? "items-end mb-2" : "items-start mb-2"}
            >
              <View
                className={
                  msg.sent
                    ? "bg-primary rounded-xl px-4 py-2 max-w-[80%]"
                    : "bg-white border border-[#E5E5E5] rounded-xl px-4 py-2 max-w-[80%]"
                }
              >
                <Text
                  className={
                    msg.sent
                      ? "text-white text-[13px]"
                      : "text-faintDark text-[13px]"
                  }
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  {msg.text}
                </Text>
              </View>
              <Text
                className="text-[10px] mt-1"
                style={{ fontFamily: "poppinsMedium" }}
              >
                {msg.seen ? `Seen ${msg.time}` : msg.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View className="flex-row items-center px-4 py-3 border-t border-[#E5E5E5]">
          <TextInput
            className="flex-1 rounded-[24px] border border-[#A5A5A5] px-6 pt-5 pb-4 text-sm"
            placeholder="Type message..."
            value={input}
            onChangeText={setInput}
            style={{ fontFamily: "poppinsRegular" }}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            className="ml-2 bg-primary rounded-full p-2"
            onPress={handleSendMessage}
          >
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
