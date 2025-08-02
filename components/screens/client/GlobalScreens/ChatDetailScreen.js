import React, { useState, useEffect, useRef } from "react";
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
  StatusBar,
  Linking,
  Alert,
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
import { chatConnectionService } from "../../../../utils/chatConnectionService";

export default function ChatDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user, userId } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const socketRef = useRef(null);
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null);
  const pendingMessages = useRef(new Map());
  const markAsReadTimeoutRef = useRef(null);
  const hasUnreadMessages = useRef(false);

  // Get route params
  const roomId = route.params.roomId;
  const receiverName = route.params.receiverName || "Chat";
  const connectionEstablished = route.params.connectionEstablished || false;
  const preEstablishedSocket = route.params.socket;
  const vendorPhone = route.params.vendorPhone; // Get vendor's phone number

  // Extract receiverId from roomId if not provided
  const getReceiverIdFromRoomId = (roomId, currentUserId) => {
    if (!roomId || !currentUserId) return null;
    const participants = roomId.split("_");
    return participants.find((id) => id !== currentUserId);
  };

  const receiverId =
    route.params.receiverId || getReceiverIdFromRoomId(roomId, userId);

  // Hide bottom tab bar when this screen is focused
  useFocusEffect(
    React.useCallback(() => {
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

  // Keyboard listeners
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        // Scroll to bottom when keyboard shows
        setTimeout(() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
        }, 100);
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShowListener?.remove();
      keyboardWillHideListener?.remove();
    };
  }, []);

  // Mark messages as read
  const markMessagesAsRead = async () => {
    try {
      if (!hasUnreadMessages.current) return;

      const response = await HttpClient.patch(`/messages/${roomId}/read`);
      if (response.data.success) {
        hasUnreadMessages.current = false;

        // Update local state to reflect read status
        setMessages((prevMessages) =>
          prevMessages.map((msg) => ({
            ...msg,
            seen: msg.senderId !== userId ? true : msg.seen,
            seenAt:
              msg.senderId !== userId ? new Date().toISOString() : msg.seenAt,
          }))
        );

        // Emit socket event to notify other users
        if (socketRef.current?.connected) {
          socketRef.current.emit("messagesRead", { roomId, userId });
        }
      }
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  // Debounced mark as read function
  const debouncedMarkAsRead = () => {
    if (markAsReadTimeoutRef.current) {
      clearTimeout(markAsReadTimeoutRef.current);
    }

    markAsReadTimeoutRef.current = setTimeout(() => {
      markMessagesAsRead();
    }, 1000);
  };

  // Fetch initial messages
  const fetchMessages = async () => {
    try {
      const response = await HttpClient.get(`/messages/${roomId}`);
      if (response.data.success && response.data.data) {
        const sortedMessages = response.data.data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setMessages(sortedMessages);

        // Check if there are unread messages from other users
        const unreadMessages = sortedMessages.filter(
          (msg) => msg.senderId !== userId && !msg.seen
        );
        if (unreadMessages.length > 0) {
          hasUnreadMessages.current = true;
          debouncedMarkAsRead();
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Setup socket connection
  useEffect(() => {
    if (!userId || !roomId) return;

    // Use pre-established socket if available and connected
    if (
      connectionEstablished &&
      preEstablishedSocket &&
      preEstablishedSocket.connected
    ) {
      socketRef.current = preEstablishedSocket;
      setConnectionStatus("connected");

      // Ensure we're joined to the room
      socketRef.current.emit("join-room", roomId);
    } else if (
      connectionEstablished &&
      preEstablishedSocket &&
      !preEstablishedSocket.connected
    ) {
      socketRef.current = preEstablishedSocket;
      setConnectionStatus("connecting");

      // Try to reconnect the existing socket
      socketRef.current.connect();
    } else {
      setConnectionStatus("connecting");
      // Initialize socket connection with improved options
      socketRef.current = io("https://sharplook-backend-zd8j.onrender.com", {
        query: { userId },
        transports: ["websocket", "polling"], // Add polling as fallback
        reconnection: true,
        reconnectionAttempts: 10, // Increase attempts
        reconnectionDelay: 2000,
        reconnectionDelayMax: 10000,
        timeout: 30000, // Increase timeout
        forceNew: false,
        autoConnect: true,
      });
    }

    // Handle connection events
    socketRef.current.on("connect", () => {
      setConnectionStatus("connected");

      // Join the room when connected
      socketRef.current.emit("join-room", roomId);
    });

    socketRef.current.on("disconnect", (reason) => {
      setConnectionStatus("disconnected");
    });

    socketRef.current.on("reconnect", (attemptNumber) => {
      setConnectionStatus("connected");
      // Rejoin room on reconnect
      socketRef.current.emit("join-room", roomId);
    });

    socketRef.current.on("connect_error", (error) => {
      setConnectionStatus("error");

      // Try to reconnect after a delay
      setTimeout(() => {
        if (socketRef.current && !socketRef.current.connected) {
          socketRef.current.connect();
        }
      }, 3000);
    });

    // Listen for new messages
    socketRef.current.on("newMessage", (message) => {
      setMessages((prevMessages) => {
        // Check if message already exists (prevent duplicates)
        const messageExists = prevMessages.some(
          (msg) =>
            msg.id === message.id ||
            (msg.tempId && msg.tempId === message.tempId)
        );

        if (!messageExists) {
          // If it's a message from another user, mark that we have unread messages
          if (message.senderId !== userId) {
            hasUnreadMessages.current = true;
            debouncedMarkAsRead();
          }
          return [...prevMessages, message];
        }

        // If it's updating a temporary message, replace it
        return prevMessages.map((msg) =>
          msg.tempId === message.tempId ? message : msg
        );
      });
    });

    // Listen for message delivery confirmations
    socketRef.current.on(
      "messageDelivered",
      ({ messageId, tempId, status }) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === messageId || msg.tempId === tempId
              ? { ...msg, delivered: true, status: status || "delivered" }
              : msg
          )
        );
      }
    );

    // Listen for message seen confirmations
    socketRef.current.on("messageSeen", ({ messageId, tempId, seenAt }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId || msg.tempId === tempId
            ? { ...msg, seen: true, seenAt }
            : msg
        )
      );
    });

    // Listen for when other users read messages
    socketRef.current.on(
      "messagesRead",
      ({ roomId: readRoomId, userId: readUserId }) => {
        if (readRoomId === roomId && readUserId !== userId) {
          // Update messages to show they've been seen
          setMessages((prevMessages) =>
            prevMessages.map((msg) => ({
              ...msg,
              seen: msg.senderId === userId ? true : msg.seen,
              seenAt:
                msg.senderId === userId ? new Date().toISOString() : msg.seenAt,
            }))
          );
        }
      }
    );

    // Listen for message send confirmations
    socketRef.current.on("messageSent", (data) => {
      const { tempId, message: sentMessage } = data;
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
    });

    // Listen for message send errors
    socketRef.current.on("messageError", (data) => {
      const { tempId, error } = data;
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === tempId
            ? { ...msg, sending: false, error: true, errorMessage: error }
            : msg
        )
      );
    });

    // Listen for room joined confirmation
    socketRef.current.on("roomJoined", (data) => {});

    // Fetch initial messages
    fetchMessages();

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off("newMessage");
        socketRef.current.off("messageDelivered");
        socketRef.current.off("messageSeen");
        socketRef.current.off("messagesRead");
        socketRef.current.off("messageSent");
        socketRef.current.off("messageError");
        socketRef.current.off("roomJoined");
        socketRef.current.disconnect();
      }
      if (markAsReadTimeoutRef.current) {
        clearTimeout(markAsReadTimeoutRef.current);
      }
    };
  }, [userId, roomId]);

  // Handle app state changes
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
  }, []);

  // Periodic connection check
  useEffect(() => {
    if (!socketRef.current) return;

    const checkConnection = () => {
      if (socketRef.current && !socketRef.current.connected) {
        socketRef.current.connect();
      }
    };

    const interval = setInterval(checkConnection, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [socketRef.current]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    }
  }, [messages]);

  // Handle screen focus to mark messages as read
  useFocusEffect(
    React.useCallback(() => {
      if (hasUnreadMessages.current) {
        debouncedMarkAsRead();
      }

      return () => {
        if (markAsReadTimeoutRef.current) {
          clearTimeout(markAsReadTimeoutRef.current);
        }
      };
    }, [])
  );

  // Send message function - FIXED
  const sendMessage = () => {
    if (!input.trim()) {
      return;
    }

    // Check if socket is available and connected
    if (!socketRef.current) {
      return;
    }

    if (!socketRef.current.connected) {
      // Try to reconnect if socket exists but not connected
      if (socketRef.current) {
        socketRef.current.connect();
      }
      return;
    }

    if (!receiverId) {
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

    // Add message optimistically to UI
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

    // Send message via socket
    socketRef.current.emit("sendMessage", messageData);

    // Set a timeout to mark as sent if no confirmation received
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === tempId && msg.sending
            ? { ...msg, sending: false, sent: true, error: false }
            : msg
        )
      );
    }, 5000); // 5 second timeout
  };

  // Retry sending failed message
  const retryMessage = (message) => {
    if (!socketRef.current) {
      return;
    }

    if (!socketRef.current.connected) {
      // Try to reconnect if socket exists but not connected
      if (socketRef.current) {
        socketRef.current.connect();
      }
      return;
    }

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

    // Set timeout for retry as well
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === newTempId && msg.sending
            ? { ...msg, sending: false, sent: true, error: false }
            : msg
        )
      );
    }, 5000);
  };

  // Format time display
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get message status text
  const getMessageStatus = (msg) => {
    if (msg.sending) return "Sending...";
    if (msg.error) return "Failed";
    if (msg.seen) return `Seen ${formatTime(msg.seenAt)}`;
    if (msg.delivered) return `Delivered ${formatTime(msg.createdAt)}`;
    if (msg.sent) return `Sent ${formatTime(msg.createdAt)}`;
    return formatTime(msg.createdAt);
  };

  // Handle phone call
  const handlePhoneCall = () => {
    if (!vendorPhone) {
      Alert.alert(
        "No Phone Number",
        `${receiverName}'s phone number is not available.`
      );
      return;
    }

    Alert.alert(
      "Call Vendor",
      `Would you like to call ${receiverName} at ${vendorPhone}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Call",
          onPress: () => {
            const phoneUrl = `tel:${vendorPhone}`;

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
              .catch((err) => {
                Alert.alert("Error", "Failed to open phone app.");
              });
          },
        },
      ]
    );
  };

  // Format date label like WhatsApp
  const formatDateLabel = (timestamp) => {
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
  };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
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
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#FFF8FB] items-center justify-center">
        <Text style={{ fontFamily: "poppinsRegular" }}>
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
                source={require("../../../../assets/icon/avatar.png")}
                style={{ width: 36, height: 36 }}
                resizeMode="contain"
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-white text-base font-semibold"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {receiverName}
              </Text>
              <View className="flex-row items-center mt-1">
                <Text
                  className="text-xs text-white"
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
                      className="text-xs text-white"
                      style={{ fontFamily: "poppinsRegular" }}
                    >
                      Retry
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* Call Button */}
            {vendorPhone && (
              <TouchableOpacity onPress={handlePhoneCall} className="ml-4 p-2">
                <Ionicons name="call" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          {/* Messages Container */}
          <View className="flex-1">
            <ScrollView
              ref={scrollViewRef}
              className="flex-1 px-4 py-4"
              showsVerticalScrollIndicator={false}
              onScrollEndDrag={debouncedMarkAsRead}
              onMomentumScrollEnd={debouncedMarkAsRead}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {groupMessagesByDate(messages).map((group, groupIndex) => (
                <View key={groupIndex}>
                  {/* Date Label */}
                  <View className="items-center mb-4">
                    <View className="bg-[#F0F0F0] rounded-full px-4 py-1">
                      <Text
                        className="text-xs text-[#666]"
                        style={{ fontFamily: "poppinsRegular" }}
                      >
                        {group.date}
                      </Text>
                    </View>
                  </View>

                  {/* Messages in this group */}
                  {group.messages.map((msg, index) => {
                    const isOwn = msg.senderId === userId;
                    return (
                      <View
                        key={msg.id || msg.tempId || index}
                        className={
                          isOwn ? "items-end mb-5" : "items-start mb-5"
                        }
                      >
                        <TouchableOpacity
                          className={
                            isOwn
                              ? "bg-primary rounded-xl px-4 py-2 max-w-[80%]"
                              : "bg-white border border-[#E5E5E5] rounded-xl px-4 py-2 max-w-[80%]"
                          }
                          onPress={
                            msg.error ? () => retryMessage(msg) : undefined
                          }
                          disabled={!msg.error}
                        >
                          <Text
                            className={
                              isOwn
                                ? "text-white text-[12px]"
                                : "text-faintDark text-[12px]"
                            }
                            style={{ fontFamily: "poppinsRegular" }}
                          >
                            {msg.message}
                          </Text>
                          {msg.error && (
                            <View className="flex-row items-center mt-1">
                              <Ionicons
                                name="alert-circle"
                                size={12}
                                color="#ff4444"
                              />
                              <Text className="text-xs text-[#ff4444] ml-1">
                                Tap to retry
                              </Text>
                            </View>
                          )}
                        </TouchableOpacity>
                        {isOwn && (
                          <Text
                            className="text-xs text-[#A9A9A9] mt-1"
                            style={{ fontFamily: "poppinsRegular" }}
                          >
                            {getMessageStatus(msg)}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Input Container */}
          <View className="flex-row items-end px-4 pt-4 pb-10 bg-white border-t border-[#E5E5E5]">
            <View className="flex-1 max-h-[100px]">
              <TextInput
                ref={textInputRef}
                className="bg-[#F5F5F5] rounded-[8px] px-4 py-3 text-sm"
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
                  // Scroll to bottom when input is focused
                  setTimeout(() => {
                    if (scrollViewRef.current) {
                      scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                  }, 300);
                }}
                blurOnSubmit={false}
                returnKeyType="default"
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
