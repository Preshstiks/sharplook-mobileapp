import React from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCall } from "../../context/CallContext";
import { useNavigation } from "@react-navigation/native";

export default function IncomingCallNotification() {
  const { incomingCall, answerCall, rejectCall } = useCall();
  const navigation = useNavigation();

  if (!incomingCall) return null;

  const handleAnswer = () => {
    const callData = answerCall();
    // Navigate to call screen with incoming call data
    navigation.navigate("CallScreen", {
      receiverId: callData.callerId,
      receiverName: callData.callerName,
      callType: "incoming",
      roomId: callData.roomId,
    });
  };

  const handleReject = () => {
    rejectCall();
  };

  return (
    <Modal
      visible={!!incomingCall}
      transparent={true}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6">
          {/* Caller Info */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-full bg-gray-200 items-center justify-center mb-4">
              <Image
                source={require("../../assets/icon/avatar.png")}
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
              />
            </View>
            <Text
              className="text-xl font-semibold text-center mb-1"
              style={{ fontFamily: "poppinsMedium" }}
            >
              {incomingCall.callerName || "Incoming Call"}
            </Text>
            <Text
              className="text-base text-gray-600 text-center"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Incoming call...
            </Text>
          </View>

          {/* Call Controls */}
          <View className="flex-row justify-center space-x-8 mb-6">
            {/* Reject Button */}
            <TouchableOpacity
              onPress={handleReject}
              className="w-16 h-16 rounded-full bg-red-500 items-center justify-center"
            >
              <Ionicons name="call" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Answer Button */}
            <TouchableOpacity
              onPress={handleAnswer}
              className="w-16 h-16 rounded-full bg-green-500 items-center justify-center"
            >
              <Ionicons name="call" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Swipe to answer hint */}
          <Text
            className="text-sm text-gray-500 text-center"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Swipe up to answer
          </Text>
        </View>
      </View>
    </Modal>
  );
}
