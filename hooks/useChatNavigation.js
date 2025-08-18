import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { chatConnectionService } from "../utils/chatConnectionService";

export const useChatNavigation = () => {
  const { user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const navigateToChat = useCallback(
    (navigation, chatParams, options = {}) => {
      const {
        roomId,
        receiverId,
        receiverName,
        vendorId,
        showLoading = false, // Changed default to false
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

      // ✅ NAVIGATE IMMEDIATELY - Don't wait for connection
      navigation.navigate("ChatDetailScreen", {
        roomId: actualRoomId,
        receiverId: actualReceiverId,
        receiverName: receiverName || chatParams.chat?.name || "Chat",
        connectionEstablished: false, // Initially false
        socket: null, // Let ChatDetail handle connection
        vendorPhone: chatParams.vendorPhone,
        vendorAvatar: chatParams.vendorAvatar,
        ...options,
      });

      // ✅ ESTABLISH CONNECTION IN BACKGROUND (non-blocking)
      (async () => {
        try {
          setIsConnecting(true);

          if (onConnectionStart) {
            onConnectionStart();
          }

          // Get existing connection or create new one
          const existingSocket = chatConnectionService.getSocket();

          if (existingSocket && chatConnectionService.isSocketConnected()) {
            // Use existing connection
            if (onConnectionSuccess) {
              onConnectionSuccess({ socket: existingSocket });
            }
          } else {
            // Establish new connection in background
            const connectionResult =
              await chatConnectionService.establishConnection(
                user.id,
                actualRoomId
              );

            if (onConnectionSuccess) {
              onConnectionSuccess(connectionResult);
            }
          }
        } catch (error) {
          console.error("❌ Background connection failed:", error);

          if (onConnectionError) {
            onConnectionError(error);
          }
        } finally {
          setIsConnecting(false);
        }
      })();
    },
    [user]
  );

  // ✅ OPTIMIZED VERSION WITH IMMEDIATE NAVIGATION
  const navigateToChatOptimized = useCallback(
    (navigation, chatParams, options = {}) => {
      const {
        roomId,
        receiverId,
        receiverName,
        vendorId,
        vendorPhone,
        vendorAvatar,
      } = chatParams;

      // Calculate room and receiver IDs
      let actualRoomId = roomId;
      let actualReceiverId = receiverId;

      if (vendorId && !roomId) {
        const userId = user?.id;
        if (userId) {
          actualRoomId = [userId, vendorId].sort().join("_");
          actualReceiverId = vendorId;
        }
      }

      if (chatParams.chat?.vendorId) {
        const userId = user?.id;
        if (userId) {
          actualRoomId = [userId, chatParams.chat.vendorId].sort().join("_");
          actualReceiverId = chatParams.chat.vendorId;
        }
      }

      if (!actualRoomId || !user?.id) {
        console.error("❌ Missing required parameters");
        return;
      }

      // ✅ IMMEDIATE NAVIGATION WITH OPTIMISTIC CONNECTION
      const existingSocket = chatConnectionService.getSocket();
      const isConnected =
        existingSocket && chatConnectionService.isSocketConnected();

      navigation.navigate("ChatDetailScreen", {
        roomId: actualRoomId,
        receiverId: actualReceiverId,
        receiverName: receiverName || chatParams.chat?.name || "Chat",
        connectionEstablished: isConnected,
        socket: isConnected ? existingSocket : null,
        vendorPhone: vendorPhone || chatParams.chat?.phoneNumber,
        vendorAvatar: vendorAvatar || chatParams.chat?.avatar,
        ...options,
      });

      // Background connection establishment (if needed)
      if (!isConnected) {
        chatConnectionService
          .establishConnection(user.id, actualRoomId)
          .catch((error) => {
            console.warn("Background connection failed:", error);
          });
      }
    },
    [user]
  );

  const navigateToChatList = useCallback((navigation) => {
    navigation.navigate("ChatListScreen");
  }, []);

  return {
    navigateToChat: navigateToChatOptimized, // Use optimized version
    navigateToChatOriginal: navigateToChat, // Keep original as fallback
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

// ✅ ALTERNATIVE SUPER FAST VERSION
export const useFastChatNavigation = () => {
  const { user } = useAuth();

  const navigateToChat = useCallback(
    (navigation, chatParams, options = {}) => {
      // Quick parameter extraction
      const userId = user?.id;
      if (!userId) return;

      const {
        roomId,
        receiverId,
        vendorId,
        receiverName,
        vendorPhone,
        vendorAvatar,
      } = chatParams;

      // Quick room ID calculation
      let actualRoomId = roomId;
      let actualReceiverId = receiverId;

      if (vendorId && !roomId) {
        actualRoomId = [userId, vendorId].sort().join("_");
        actualReceiverId = vendorId;
      }

      if (!actualRoomId) return;

      // ✅ INSTANT NAVIGATION - No async operations
      navigation.navigate("ChatDetailScreen", {
        roomId: actualRoomId,
        receiverId: actualReceiverId,
        receiverName: receiverName || "Chat",
        connectionEstablished: false,
        socket: null,
        vendorPhone,
        vendorAvatar,
        ...options,
      });
    },
    [user?.id]
  );

  return { navigateToChat };
};
