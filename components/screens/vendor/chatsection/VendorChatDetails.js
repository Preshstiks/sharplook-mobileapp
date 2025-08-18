import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
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
  AppState,
  Keyboard,
  Linking,
  Alert,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { useAuth } from "../../../../context/AuthContext";
import { io } from "socket.io-client";
import { HttpClient } from "../../../../api/HttpClient";

export default function VendorChatDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user, userId } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Refs
  const socketRef = useRef(null);
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null);
  const markAsReadTimeoutRef = useRef(null);
  const hasUnreadMessages = useRef(false);
  const isInitialized = useRef(false);

  // Memoized route params to prevent re-computation
  const routeParams = useMemo(
    () => ({
      roomId: route.params.roomId,
      receiverName: route.params.receiverName || "Chat",
      connectionEstablished: route.params.connectionEstablished || false,
      preEstablishedSocket: route.params.socket,
      clientPhone: route.params.clientPhone,
      chat: route.params.chat,
      receiverId:
        route.params.receiverId ||
        getReceiverIdFromRoomId(route.params.roomId, userId),
    }),
    [route.params, userId]
  );

  const { roomId, receiverName, clientPhone, chat, receiverId } = routeParams;

  // Extract receiverId from roomId if not provided
  function getReceiverIdFromRoomId(roomId, currentUserId) {
    if (!roomId || !currentUserId) return null;
    const participants = roomId.split("_");
    return participants.find((id) => id !== currentUserId);
  }

  // Hide bottom tab bar when this screen is focused
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });

      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: { backgroundColor: "#FFFAFD", borderTopWidth: 0 },
        });
      };
    }, [navigation])
  );

  // Optimized mark messages as read
  const markMessagesAsRead = useCallback(async () => {
    try {
      if (!hasUnreadMessages.current) return;

      const response = await HttpClient.patch(`/messages/${roomId}/read`);
      if (response.data.success) {
        hasUnreadMessages.current = false;

        setMessages((prevMessages) =>
          prevMessages.map((msg) => ({
            ...msg,
            seen: msg.senderId !== userId ? true : msg.seen,
            seenAt:
              msg.senderId !== userId ? new Date().toISOString() : msg.seenAt,
          }))
        );

        if (socketRef.current?.connected) {
          socketRef.current.emit("messagesRead", { roomId, userId });
        }
      }
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  }, [roomId, userId]);

  // Debounced mark as read function
  const debouncedMarkAsRead = useCallback(() => {
    if (markAsReadTimeoutRef.current) {
      clearTimeout(markAsReadTimeoutRef.current);
    }

    markAsReadTimeoutRef.current = setTimeout(() => {
      markMessagesAsRead();
    }, 1000);
  }, [markMessagesAsRead]);

  // Optimized fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      const response = await HttpClient.get(`/messages/user/getVendorChats`);
      if (response.data.success && response.data.data) {
        const currentChat = response.data.data.find(
          (chat) => chat.roomId === roomId
        );

        if (currentChat && currentChat.messages) {
          const chatMessages = currentChat.messages.map((msg, index) => ({
            id: msg.id || `msg_${index}_${Date.now()}`,
            senderId: msg.senderId,
            message: msg.message,
            createdAt: msg.createdAt,
            type: "text",
            sent: true,
            delivered: true,
            seen: msg.seen || false,
            seenAt: msg.seenAt || null,
          }));

          const sortedMessages = chatMessages.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          setMessages(sortedMessages);

          const unreadMessages = sortedMessages.filter(
            (msg) => msg.senderId !== userId && !msg.seen
          );
          hasUnreadMessages.current = unreadMessages.length > 0;

          if (hasUnreadMessages.current) {
            debouncedMarkAsRead();
          }
        } else {
          setMessages([]);
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [roomId, userId, debouncedMarkAsRead]);

  // Optimized socket setup
  const setupSocketConnection = useCallback(() => {
    if (!userId || !roomId || isInitialized.current) return;

    isInitialized.current = true;
    setConnectionStatus("connecting");

    // Create new socket connection
    const socket = io("https://sharplook-backend-zd8j.onrender.com", {
      query: { userId },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      forceNew: false,
      autoConnect: true,
    });

    socketRef.current = socket;

    // Connection event handlers
    socket.on("connect", () => {
      setConnectionStatus("connected");
      socket.emit("join-room", roomId);
    });

    socket.on("disconnect", () => {
      setConnectionStatus("disconnected");
    });

    socket.on("reconnect", () => {
      setConnectionStatus("connected");
      socket.emit("join-room", roomId);
    });

    socket.on("connect_error", () => {
      setConnectionStatus("error");
    });

    // Message event handlers
    socket.on("newMessage", (message) => {
      if (message.roomId === roomId) {
        setMessages((prevMessages) => {
          const messageExists = prevMessages.some(
            (msg) =>
              msg.id === message.id ||
              (msg.tempId && msg.tempId === message.tempId)
          );

          if (!messageExists) {
            if (message.senderId !== userId) {
              hasUnreadMessages.current = true;
              debouncedMarkAsRead();
            }
            return [...prevMessages, message];
          }

          return prevMessages.map((msg) =>
            msg.tempId === message.tempId ? message : msg
          );
        });
      }
    });

    socket.on(
      "messageDelivered",
      ({ messageId, tempId, status, roomId: msgRoomId }) => {
        if (msgRoomId === roomId) {
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === messageId || msg.tempId === tempId
                ? { ...msg, delivered: true, status: status || "delivered" }
                : msg
            )
          );
        }
      }
    );

    socket.on(
      "messageSeen",
      ({ messageId, tempId, seenAt, roomId: msgRoomId }) => {
        if (msgRoomId === roomId) {
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === messageId || msg.tempId === tempId
                ? { ...msg, seen: true, seenAt }
                : msg
            )
          );
        }
      }
    );

    socket.on("messagesRead", ({ roomId: readRoomId, userId: readUserId }) => {
      if (readRoomId === roomId && readUserId !== userId) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) => ({
            ...msg,
            seen: msg.senderId === userId ? true : msg.seen,
            seenAt:
              msg.senderId === userId ? new Date().toISOString() : msg.seenAt,
          }))
        );
      }
    });

    socket.on("messageSent", (data) => {
      const { tempId, message: sentMessage } = data;
      if (sentMessage.roomId === roomId) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.tempId === tempId
              ? {
                  ...msg,
                  id: sentMessage.id || tempId,
                  sending: false,
                  sent: true,
                  delivered: true,
                  createdAt: sentMessage.createdAt || msg.createdAt,
                }
              : msg
          )
        );
      }
    });

    socket.on("messageError", (data) => {
      const { tempId, error } = data;
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === tempId
            ? { ...msg, sending: false, error: true, errorMessage: error }
            : msg
        )
      );
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageDelivered");
      socket.off("messageSeen");
      socket.off("messagesRead");
      socket.off("messageSent");
      socket.off("messageError");
      socket.disconnect();
      isInitialized.current = false;
    };
  }, [userId, roomId, debouncedMarkAsRead]);

  // Initialize screen
  useEffect(() => {
    if (!userId || !roomId) return;

    // Fetch messages immediately
    fetchMessages();

    // Setup socket connection
    const cleanup = setupSocketConnection();

    return cleanup;
  }, [userId, roomId, fetchMessages, setupSocketConnection]);

  // Keyboard listeners
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardWillShowListener?.remove();
      keyboardWillHideListener?.remove();
    };
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  // Handle screen focus to mark messages as read
  useFocusEffect(
    useCallback(() => {
      if (hasUnreadMessages.current) {
        debouncedMarkAsRead();
      }
      return () => {
        if (markAsReadTimeoutRef.current) {
          clearTimeout(markAsReadTimeoutRef.current);
        }
      };
    }, [debouncedMarkAsRead])
  );

  // App state change handler
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active" && hasUnreadMessages.current) {
        debouncedMarkAsRead();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription?.remove();
  }, [debouncedMarkAsRead]);

  // Send message function
  const sendMessage = useCallback(() => {
    if (!input.trim() || !socketRef.current?.connected || !receiverId) {
      return;
    }

    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const messageData = {
      tempId,
      senderId: userId,
      receiverId: receiverId,
      roomId,
      message: input.trim(),
      createdAt: new Date().toISOString(),
      type: "text",
    };

    const optimisticMessage = {
      ...messageData,
      id: tempId,
      sent: false,
      delivered: false,
      seen: false,
      sending: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInput("");

    socketRef.current.emit("sendMessage", messageData);

    // Fallback timeout
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === tempId && msg.sending
            ? { ...msg, sending: false, sent: true, error: false }
            : msg
        )
      );
    }, 5000);
  }, [input, userId, receiverId, roomId]);

  // Retry message function
  const retryMessage = useCallback(
    (message) => {
      if (!socketRef.current?.connected) return;

      const newTempId = `retry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const messageData = {
        tempId: newTempId,
        senderId: userId,
        receiverId: receiverId,
        roomId,
        message: message.message,
        createdAt: new Date().toISOString(),
        type: "text",
      };

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === message.tempId || msg.id === message.id
            ? { ...msg, sending: true, error: false, tempId: newTempId }
            : msg
        )
      );

      socketRef.current.emit("sendMessage", messageData);
    },
    [userId, receiverId, roomId]
  );

  // Phone call handler
  const handlePhoneCall = useCallback(() => {
    if (!clientPhone) {
      Alert.alert(
        "No Phone Number",
        `${receiverName}'s phone number is not available.`
      );
      return;
    }

    Alert.alert(
      "Call Client",
      `Would you like to call ${receiverName} at ${clientPhone}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call",
          onPress: () => {
            const phoneUrl = `tel:${clientPhone}`;
            Linking.canOpenURL(phoneUrl)
              .then((supported) => {
                if (supported) {
                  return Linking.openURL(phoneUrl);
                } else {
                  Alert.alert(
                    "Error",
                    "Phone app is not available on this device."
                  );
                }
              })
              .catch(() => {
                Alert.alert("Error", "Failed to open phone app.");
              });
          },
        },
      ]
    );
  }, [clientPhone, receiverName]);

  // Utility functions
  const formatTime = useCallback((timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const getMessageStatus = useCallback(
    (msg) => {
      if (msg.sending) return "Sending...";
      if (msg.error) return "Failed";
      if (msg.seen) return `Seen ${formatTime(msg.seenAt)}`;
      if (msg.delivered) return `Delivered ${formatTime(msg.createdAt)}`;
      if (msg.sent) return `Sent ${formatTime(msg.createdAt)}`;
      return formatTime(msg.createdAt);
    },
    [formatTime]
  );

  const formatDateLabel = useCallback((timestamp) => {
    if (!timestamp) return "";

    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    }

    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    const daysDiff = Math.floor((today - messageDate) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
      return messageDate.toLocaleDateString("en-US", { weekday: "long" });
    }

    return messageDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  // Group messages by date - memoized
  const groupedMessages = useMemo(() => {
    const grouped = [];
    let currentDate = null;
    let currentGroup = [];

    messages.forEach((message) => {
      const dateLabel = formatDateLabel(message.createdAt);

      if (dateLabel !== currentDate) {
        if (currentGroup.length > 0) {
          grouped.push({
            date: currentDate,
            messages: currentGroup,
          });
        }
        currentDate = dateLabel;
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      grouped.push({
        date: currentDate,
        messages: currentGroup,
      });
    }

    return grouped;
  }, [messages, formatDateLabel]);

  // Render message item - memoized
  const renderMessageItem = useCallback(
    (msg, index) => {
      const isVendorMessage = msg.senderId === userId;

      return (
        <View
          key={msg.id || msg.tempId || index}
          className={isVendorMessage ? "items-end mb-5" : "items-start mb-5"}
        >
          <TouchableOpacity
            className={
              isVendorMessage
                ? "bg-primary rounded-xl px-4 py-2 max-w-[80%]"
                : "bg-white border border-[#E5E5E5] rounded-xl px-4 py-2 max-w-[80%]"
            }
            onPress={msg.error ? () => retryMessage(msg) : undefined}
            disabled={!msg.error}
            activeOpacity={msg.error ? 0.7 : 1}
          >
            <Text
              className={
                isVendorMessage
                  ? "text-white text-[14px]"
                  : "text-faintDark text-[14px]"
              }
              style={{ fontFamily: "poppinsRegular" }}
            >
              {msg.message}
            </Text>
            {msg.error && (
              <View className="flex-row items-center mt-1">
                <Ionicons name="alert-circle" size={12} color="#ff4444" />
                <Text className="text-sm text-[#ff4444] ml-1">
                  Tap to retry
                </Text>
              </View>
            )}
          </TouchableOpacity>
          {isVendorMessage && (
            <Text
              className="text-sm text-[#A9A9A9] mt-1"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {getMessageStatus(msg)}
            </Text>
          )}
        </View>
      );
    },
    [userId, retryMessage, getMessageStatus]
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#FFF8FB] items-center justify-center">
        <Text style={{ fontFamily: "poppinsRegular", fontSize: 16 }}>
          Loading messages...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8FB]">
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center bg-primary pt-[40px] pb-6 px-6">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-2"
            >
              <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
            <View className="w-10 h-10 rounded-full bg-white items-center justify-center mr-3 overflow-hidden">
              <Image
                source={
                  chat?.client?.avatar
                    ? { uri: chat.client.avatar }
                    : require("../../../../assets/icon/avatar.png")
                }
                style={{ width: 36, height: 36 }}
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-white text-lg font-semibold"
                style={{ fontFamily: "poppinsRegular" }}
                numberOfLines={1}
              >
                {receiverName}
              </Text>
              <View className="flex-row items-center mt-1">
                <Text
                  className="text-sm text-white"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  {connectionStatus === "connected" &&
                  socketRef.current?.connected ? (
                    <>
                      Online <Text className="text-[#00FF00]">•</Text>
                    </>
                  ) : connectionStatus === "connecting" ? (
                    "Connecting..."
                  ) : connectionStatus === "error" ? (
                    "Connection failed - Retrying..."
                  ) : (
                    "Offline"
                  )}
                </Text>
                {connectionStatus === "error" && (
                  <TouchableOpacity
                    onPress={() => {
                      if (socketRef.current) {
                        socketRef.current.connect();
                      }
                    }}
                    className="ml-2 bg-white/20 rounded-full px-2 py-1"
                  >
                    <Text
                      className="text-sm text-white"
                      style={{ fontFamily: "poppinsRegular" }}
                    >
                      Retry
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* Call Button */}
            {clientPhone && (
              <TouchableOpacity onPress={handlePhoneCall} className="ml-4 p-2">
                <Ionicons name="call" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          {/* Messages Container */}
          <View className="flex-1">
            {messages.length === 0 ? (
              <View className="flex-1 items-center justify-center px-8">
                <Text
                  className="text-gray-500 text-center text-base"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  No messages yet. Start a conversation with {receiverName}!
                </Text>
              </View>
            ) : (
              <ScrollView
                ref={scrollViewRef}
                className="flex-1 px-4 py-4"
                showsVerticalScrollIndicator={false}
                onScrollEndDrag={debouncedMarkAsRead}
                onMomentumScrollEnd={debouncedMarkAsRead}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
                // Performance optimizations
                removeClippedSubviews={true}
                maxToRenderPerBatch={50}
                windowSize={10}
                onContentSizeChange={() => {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }}
              >
                {groupedMessages.map((group, groupIndex) => (
                  <View key={groupIndex}>
                    {/* Date Label */}
                    <View className="items-center mb-4">
                      <View className="bg-[#F0F0F0] rounded-full px-4 py-1">
                        <Text
                          className="text-sm text-[#666]"
                          style={{ fontFamily: "poppinsRegular" }}
                        >
                          {group.date}
                        </Text>
                      </View>
                    </View>

                    {/* Messages in this group */}
                    {group.messages.map((msg, index) =>
                      renderMessageItem(msg, index)
                    )}
                  </View>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Input Container */}
          <View className="flex-row items-end px-4 pt-4 pb-10 bg-white border-t border-[#E5E5E5]">
            <View className="flex-1 max-h-[100px]">
              <TextInput
                ref={textInputRef}
                className="bg-[#F5F5F5] rounded-[8px] px-4 py-3 text-base"
                placeholder="Type message..."
                value={input}
                onChangeText={setInput}
                style={{
                  fontFamily: "poppinsRegular",
                  minHeight: 40,
                  maxHeight: 100,
                  textAlignVertical: "center",
                }}
                multiline
                maxLength={1000}
                editable={
                  connectionStatus === "connected" &&
                  socketRef.current?.connected
                }
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }, 300);
                }}
                blurOnSubmit={false}
                returnKeyType="default"
                onSubmitEditing={sendMessage}
              />
            </View>
            <TouchableOpacity
              className={`ml-3 rounded-full p-3 ${
                input.trim() &&
                connectionStatus === "connected" &&
                socketRef.current?.connected &&
                receiverId
                  ? "bg-primary"
                  : "bg-gray-300"
              }`}
              onPress={sendMessage}
              disabled={
                !input.trim() ||
                connectionStatus !== "connected" ||
                !socketRef.current?.connected ||
                !receiverId
              }
            >
              <Ionicons
                name="send"
                size={20}
                color={
                  input.trim() &&
                  connectionStatus === "connected" &&
                  socketRef.current?.connected &&
                  receiverId
                    ? "#fff"
                    : "#999"
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
