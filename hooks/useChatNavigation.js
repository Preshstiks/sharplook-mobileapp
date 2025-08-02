import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { chatConnectionService } from "../utils/chatConnectionService";

export const useChatNavigation = () => {
  const { user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const navigateToChat = useCallback(
    async (navigation, chatParams, options = {}) => {
      const {
        roomId,
        receiverId,
        receiverName,
        vendorId,
        showLoading = true,
        onConnectionStart,
        onConnectionSuccess,
        onConnectionError,
      } = chatParams;

      // Determine the actual roomId and receiverId
      let actualRoomId = roomId;
      let actualReceiverId = receiverId;

      // If we have vendorId but no roomId, generate roomId
      if (vendorId && !roomId) {
        const userId = user?.id;
        if (userId) {
          actualRoomId = [userId, vendorId].sort().join("_");
          actualReceiverId = vendorId;
        }
      }

      // If we have chat object with vendorId
      if (chatParams.chat?.vendorId) {
        const userId = user?.id;
        if (userId) {
          actualRoomId = [userId, chatParams.chat.vendorId].sort().join("_");
          actualReceiverId = chatParams.chat.vendorId;
        }
      }

      if (!actualRoomId || !user?.id) {
        console.error("❌ Missing required parameters for chat navigation:", {
          roomId: actualRoomId,
          userId: user?.id,
          chatParams,
        });
        return;
      }

      try {
        // Set connecting state
        setIsConnecting(true);

        // Call connection start callback
        if (onConnectionStart) {
          onConnectionStart();
        }

        // Show loading if requested
        if (showLoading) {
        }

        // Establish connection before navigation
        const connectionResult =
          await chatConnectionService.establishConnection(
            user.id,
            actualRoomId
          );

        // Call connection success callback
        if (onConnectionSuccess) {
          onConnectionSuccess(connectionResult);
        }

        // Navigate to chat screen with connection info
        navigation.navigate("ChatDetailScreen", {
          roomId: actualRoomId,
          receiverId: actualReceiverId,
          receiverName: receiverName || chatParams.chat?.name || "Chat",
          connectionEstablished: true,
          socket: connectionResult.socket,
          vendorPhone: chatParams.vendorPhone, // Pass vendor phone number
          ...options,
        });
      } catch (error) {
        console.error("❌ Failed to establish chat connection:", error);

        // Call connection error callback
        if (onConnectionError) {
          onConnectionError(error);
        }

        navigation.navigate("ChatDetailScreen", {
          roomId: actualRoomId,
          receiverId: actualReceiverId,
          receiverName: receiverName || chatParams.chat?.name || "Chat",
          connectionEstablished: false,
          vendorPhone: chatParams.vendorPhone, // Pass vendor phone number
          ...options,
        });
      } finally {
        setIsConnecting(false);
      }
    },
    [user]
  );

  const navigateToChatList = useCallback((navigation) => {
    navigation.navigate("ChatListScreen");
  }, []);

  return {
    navigateToChat,
    navigateToChatList,
    isConnecting,
    isConnectedToRoom: chatConnectionService.isConnectedToRoom.bind(
      chatConnectionService
    ),
    getSocket: chatConnectionService.getSocket.bind(chatConnectionService),
    isSocketConnected: chatConnectionService.isSocketConnected.bind(
      chatConnectionService
    ),
  };
};
