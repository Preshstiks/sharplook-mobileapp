import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { chatConnectionService } from "../utils/chatConnectionService";

export const useVendorChatNavigation = () => {
  const { user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const navigateToChat = useCallback(
    async (navigation, chatParams, options = {}) => {
      const {
        roomId,
        receiverId,
        receiverName,
        clientId,
        showLoading = true,
        onConnectionStart,
        onConnectionSuccess,
        onConnectionError,
      } = chatParams;

      // Determine the actual roomId and receiverId
      let actualRoomId = roomId;
      let actualReceiverId = receiverId;

      // If we have clientId but no roomId, generate roomId
      if (clientId && !roomId) {
        const userId = user?.id;
        if (userId) {
          actualRoomId = [userId, clientId].sort().join("_");
          actualReceiverId = clientId;
        }
      }

      // If we have chat object with clientId
      if (chatParams.chat?.clientId) {
        const userId = user?.id;
        if (userId) {
          actualRoomId = [userId, chatParams.chat.clientId].sort().join("_");
          actualReceiverId = chatParams.chat.clientId;
        }
      }

      if (!actualRoomId || !user?.id) {
        console.error(
          "❌ Missing required parameters for vendor chat navigation:",
          {
            roomId: actualRoomId,
            userId: user?.id,
            chatParams,
          }
        );
        return;
      }

      try {
        // Set connecting state
        setIsConnecting(true);

        // Call connection start callback
        if (onConnectionStart) {
          onConnectionStart();
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

        // Navigate to vendor chat screen with connection info
        navigation.navigate("VendorChatDetailScreen", {
          roomId: actualRoomId,
          receiverId: actualReceiverId,
          receiverName: receiverName || chatParams.chat?.name || "Chat",
          connectionEstablished: true,
          socket: connectionResult.socket,
          clientPhone: chatParams.clientPhone, // Pass client phone number
          ...options,
        });
      } catch (error) {
        console.error("❌ Failed to establish vendor chat connection:", error);

        // Call connection error callback
        if (onConnectionError) {
          onConnectionError(error);
        }

        navigation.navigate("VendorChatDetailScreen", {
          roomId: actualRoomId,
          receiverId: actualReceiverId,
          receiverName: receiverName || chatParams.chat?.name || "Chat",
          connectionEstablished: false,
          clientPhone: chatParams.clientPhone, // Pass client phone number
          ...options,
        });
      } finally {
        setIsConnecting(false);
      }
    },
    [user]
  );

  const navigateToChatList = useCallback((navigation) => {
    navigation.navigate("VendorChatListScreen");
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
