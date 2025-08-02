import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../../context/AuthContext";
import { io } from "socket.io-client";
import { Audio } from "expo-av";

export default function CallScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = useAuth();

  // Call state
  const [callState, setCallState] = useState("connecting"); // connecting, connected, ended
  const [isIncoming, setIsIncoming] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Socket refs
  const socketRef = useRef(null);
  const durationIntervalRef = useRef(null);

  // Route params
  const receiverId = route.params?.receiverId;
  const receiverName = route.params?.receiverName || "Calling...";
  const callType = route.params?.callType || "outgoing"; // outgoing, incoming
  const roomId = route.params?.roomId;

  // Initialize call
  useEffect(() => {
    if (callType === "incoming") {
      setIsIncoming(true);
      setCallState("incoming");
    } else {
      initializeCall();
    }

    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  // Call duration timer
  useEffect(() => {
    if (callState === "connected") {
      durationIntervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, [callState]);

  const initializeCall = async () => {
    try {
      // Request audio permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Microphone permission is required for calls"
        );
        endCall();
        return;
      }

      // Set audio mode for calls
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Initialize socket connection
      socketRef.current = io("https://sharplook-backend-2l7j.onrender.com", {
        query: { userId },
        transports: ["websocket"],
      });

      // Socket event listeners
      socketRef.current.on("connect", async () => {
        if (callType === "outgoing") {
          // Send call offer (without WebRTC for Expo Go)
          socketRef.current.emit("call:offer", {
            receiverId,
            roomId,
            callerId: userId,
            callerName: receiverName,
          });
        }
      });

      socketRef.current.on("call:offer", handleIncomingCall);
      socketRef.current.on("call:answer", handleCallAnswer);
      socketRef.current.on("call:end", handleCallEnd);

      // Simulate call connection after a delay
      setTimeout(() => {
        setCallState("connected");
      }, 2000);
    } catch (error) {
      console.error("Error initializing call:", error);
      Alert.alert("Error", "Failed to initialize call");
      endCall();
    }
  };

  const handleIncomingCall = async (data) => {
    if (data.callerId === receiverId) {
      setIsIncoming(true);
      setCallState("incoming");
    }
  };

  const handleCallAnswer = async (data) => {
    setCallState("connected");
  };

  const handleCallEnd = (data) => {
    if (data.roomId === roomId) {
      endCall();
    }
  };

  const answerCall = async () => {
    try {
      setCallState("connecting");
      setIsIncoming(false);

      // Request audio permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Microphone permission is required for calls"
        );
        endCall();
        return;
      }

      // Set audio mode for calls
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Send answer
      socketRef.current.emit("call:answer", {
        receiverId: route.params.callerId || receiverId,
        roomId,
      });

      setCallState("connected");
    } catch (error) {
      console.error("Error answering call:", error);
      endCall();
    }
  };

  const endCall = () => {
    setCallState("ended");

    // Clean up
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }

    // Notify other party
    if (socketRef.current) {
      socketRef.current.emit("call:end", {
        receiverId,
        roomId,
      });
    }

    // Navigate back
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In Expo Go, we can't directly control the microphone
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8FB]">
      <View className="flex-1 items-center justify-center px-6">
        {/* Profile Picture */}
        <View className="w-32 h-32 rounded-full bg-white items-center justify-center mb-8 overflow-hidden">
          <Image
            source={require("../../../../assets/icon/avatar.png")}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        </View>

        {/* Caller Name */}
        <Text
          className="text-2xl font-semibold text-center mb-2"
          style={{ fontFamily: "poppinsMedium" }}
        >
          {receiverName}
        </Text>

        {/* Call Status */}
        <Text
          className="text-base text-center mb-8"
          style={{ fontFamily: "poppinsRegular" }}
        >
          {callState === "connecting" && "Connecting..."}
          {callState === "connected" &&
            `Call in progress - ${formatDuration(callDuration)}`}
          {callState === "incoming" && "Incoming call..."}
          {callState === "ended" && "Call ended"}
        </Text>

        {/* Call Controls */}
        <View className="flex-row items-center justify-center space-x-8">
          {/* Mute Button */}
          <TouchableOpacity
            onPress={toggleMute}
            className={`w-16 h-16 rounded-full items-center justify-center ${
              isMuted ? "bg-red-500" : "bg-gray-300"
            }`}
          >
            <Ionicons
              name={isMuted ? "mic-off" : "mic"}
              size={24}
              color={isMuted ? "#fff" : "#666"}
            />
          </TouchableOpacity>

          {/* End Call Button */}
          <TouchableOpacity
            onPress={endCall}
            className="w-16 h-16 rounded-full bg-red-500 items-center justify-center"
          >
            <Ionicons name="call" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Answer Call Button (only for incoming calls) */}
          {callState === "incoming" && (
            <TouchableOpacity
              onPress={answerCall}
              className="w-16 h-16 rounded-full bg-green-500 items-center justify-center"
            >
              <Ionicons name="call" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
