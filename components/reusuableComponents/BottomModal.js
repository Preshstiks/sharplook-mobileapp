import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Easing,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

const BottomModal = ({
  isVisible,
  onClose,
  children,
  backgroundcolor,
  showCloseBtn = false,
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current; // Start off-screen
  const closeBtnAnim = useRef(new Animated.Value(0)).current; // For close btn animation
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsClosing(false);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  // Animate close button when closing
  const handleClose = () => {
    setIsClosing(true);
    Animated.timing(closeBtnAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      closeBtnAnim.setValue(0);
      onClose && onClose();
    });
  };

  // Close btn animation: rotate 0 -> 90deg and scale up
  const closeBtnStyle = {
    transform: [
      {
        rotate: closeBtnAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "90deg"],
        }),
      },
      {
        scale: closeBtnAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
  };

  const ModalContent = (
    <Animated.View
      style={[
        styles.modalContent,
        {
          backgroundColor: backgroundcolor ?? "#FFFAFD",
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        <BlurView intensity={5} style={styles.overlay}>
          <TouchableWithoutFeedback onPress={showCloseBtn ? null : onClose}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              {/* Modal content */}
              {ModalContent}
            </View>
          </TouchableWithoutFeedback>

          {/* Floating Close Button */}
          {showCloseBtn && (
            <Animated.View style={[styles.floatingCloseBtn, closeBtnStyle]}>
              <TouchableOpacity onPress={handleClose} activeOpacity={0.7}>
                <View className="bg-primary w-12 h-12 rounded-full items-center justify-center">
                  <Ionicons name="close" size={32} color="#fff" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 250,
  },
  closeBtnWrap: {
    alignItems: "center",
    marginBottom: 8,
  },
  floatingCloseBtn: {
    position: "absolute",
    bottom: 370,
    alignSelf: "center",
    zIndex: 100,
  },
});

export default BottomModal;
