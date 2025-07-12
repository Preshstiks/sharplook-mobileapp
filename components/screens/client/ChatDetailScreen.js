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

const messages = [
  { id: 1, text: "Hello!", time: "03:14 PM", seen: true, sent: true },
  { id: 2, text: "Hi", time: "03:15 PM", seen: true, sent: false },
  {
    id: 3,
    text: "I just booked a session",
    time: "03:17 PM",
    seen: true,
    sent: true,
  },
  {
    id: 4,
    text: "Just want to message to know because it is urgent?",
    time: "03:17 PM",
    seen: true,
    sent: true,
  },
  {
    id: 5,
    text: "Okay, kindly come to the spa at your scheduled time",
    time: "03:20 PM",
    seen: true,
    sent: false,
  },
  {
    id: 6,
    text: "Okay, my information is below\nName: Raji Balikis\nAddress: 25, Dosunmu str. Mafoluku, Osodi\nTel: 09071682117",
    time: "03:20 PM",
    seen: true,
    sent: true,
  },
];

export default function ChatDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { chat } = route.params;
  const [input, setInput] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8FB]">
      <View className="flex-row items-center bg-primary py-4 px-4">
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
        {messages.map((msg) => (
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
                className={msg.sent ? "text-white" : "text-faintDark"}
                style={{ fontFamily: "poppinsRegular" }}
              >
                {msg.text}
              </Text>
            </View>
            <Text
              className="text-xs text-[#A9A9A9] mt-1"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Seen {msg.time}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row items-center px-4 py-3 bg-white border-t border-[#E5E5E5]">
        <TextInput
          className="flex-1 bg-[#F5F5F5] rounded-full px-4 py-2 text-sm"
          placeholder="Type message..."
          value={input}
          onChangeText={setInput}
          style={{ fontFamily: "poppinsRegular" }}
        />
        <TouchableOpacity className="ml-2 bg-primary rounded-full p-2">
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
