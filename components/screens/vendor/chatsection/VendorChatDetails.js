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

export default function VendorChatDetail() {
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
  const clientPhone = route.params.clientPhone; // Get client's phone number

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

        // Check for unread messages
        const unreadMessages = sortedMessages.filter(
          (msg) => msg.senderId !== userId && !msg.seen
        );
        hasUnreadMessages.current = unreadMessages.length > 0;

        if (hasUnreadMessages.current) {
          debouncedMarkAsRead();
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize socket connection
  useEffect(() => {
    if (!userId || !roomId) return;

    const initializeSocket = async () => {
      try {
        if (preEstablishedSocket && connectionEstablished) {
          socketRef.current = preEstablishedSocket;
        } else {
          socketRef.current = io(
            "https://sharplook-backend-2l7j.onrender.com",
            {
              query: { userId },
              transports: ["websocket", "polling"],
              reconnection: true,
              reconnectionAttempts: 10,
              reconnectionDelay: 2000,
              timeout: 30000,
              forceNew: false,
              autoConnect: true,
            }
          );

          socketRef.current.on("connect", () => {
            setConnectionStatus("connected");
            socketRef.current.emit("join-room", roomId);
          });

          socketRef.current.on("disconnect", () => {
            setConnectionStatus("disconnected");
          });

          socketRef.current.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
            setConnectionStatus("error");
          });

          // Add timeout for connection
          const connectionTimeout = setTimeout(() => {
            if (socketRef.current && !socketRef.current.connected) {
              setConnectionStatus("timeout");
              socketRef.current.connect();
            }
          }, 10000); // 10 second timeout

          // Clean up timeout on successful connection
          socketRef.current.on("connect", () => {
            clearTimeout(connectionTimeout);
          });
        }

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
                    msg.senderId === userId
                      ? new Date().toISOString()
                      : msg.seenAt,
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
        await fetchMessages();
      } catch (error) {
        console.error("Error initializing socket:", error);
        setConnectionStatus("error");
      }
    };

    initializeSocket();

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
  }, [userId, roomId, connectionEstablished, preEstablishedSocket]);

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

  // Send message function
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
        {
          text: "Cancel",
          style: "cancel",
        },
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
              .catch((err) => {
                Alert.alert("Error", "Failed to open phone app.");
              });
          },
        },
      ]
    );
  };

  // App state change listener
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active" && hasUnreadMessages.current) {
        markMessagesAsRead();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription?.remove();
    };
  }, []);

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
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
              source={
                route.params.chat?.avatar ||
                require("../../../../assets/icon/avatar.png")
              }
              style={{ width: 36, height: 36 }}
              resizeMode="contain"
            />
          </View>
          <View className="flex-1">
            <Text
              className="text-white text-[14px] font-semibold"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {receiverName}
            </Text>
            <Text
              className="text-[12px] text-white"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {connectionStatus === "connected" ? (
                <>
                  Online <Text className="text-[#00FF00]">•</Text>
                </>
              ) : connectionStatus === "connecting" ? (
                "Connecting..."
              ) : (
                "Offline"
              )}
            </Text>
          </View>
          {/* Call Button */}
          {clientPhone && (
            <TouchableOpacity onPress={handlePhoneCall} className="ml-4 p-2">
              <Ionicons name="call" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({ animated: true });
            }
          }}
        >
          {messages.map((msg) => {
            const isOwn = msg.senderId === userId;
            return (
              <View
                key={msg.id || msg.tempId}
                className={isOwn ? "items-end mb-5" : "items-start mb-5"}
              >
                <TouchableOpacity
                  className={
                    isOwn
                      ? "bg-primary rounded-xl px-4 py-2 max-w-[80%]"
                      : "bg-white border border-[#E5E5E5] rounded-xl px-4 py-2 max-w-[80%]"
                  }
                  onPress={msg.error ? () => retryMessage(msg) : undefined}
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
                      <Ionicons name="alert-circle" size={12} color="#ff4444" />
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
        </ScrollView>

        <View className="flex-row items-center px-4 pt-3 pb-[60px] border-t border-[#E5E5E5]">
          <TextInput
            ref={textInputRef}
            className="flex-1 rounded-[24px] border border-[#A5A5A5] px-6 pt-5 pb-4 text-sm"
            placeholder="Type message..."
            value={input}
            onChangeText={setInput}
            style={{ fontFamily: "poppinsRegular" }}
            onSubmitEditing={() => {
              sendMessage();
            }}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            className="ml-2 bg-primary rounded-full p-2"
            onPress={() => {
              sendMessage();
            }}
            disabled={!input.trim()}
            style={{ opacity: !input.trim() ? 0.5 : 1 }}
          >
            <Ionicons
              name="send"
              size={24}
              color={!input.trim() ? "#ccc" : "#fff"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
