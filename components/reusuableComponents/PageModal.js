import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Easing,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

const { height: screenHeight } = Dimensions.get("window");

const PageModal = ({
  visible, // Changed from isVisible to match your usage
  onClose,
  children,
  backgroundcolor,
  showCloseBtn = true, // Default to true since you want the close button
}) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current; // Start completely off-screen
  const opacityAnim = useRef(new Animated.Value(0)).current; // For backdrop fade
  const closeBtnAnim = useRef(new Animated.Value(0)).current;
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsClosing(false);
      // Animate modal sliding up and backdrop fading in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate modal sliding down and backdrop fading out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 250,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    if (isClosing) return; // Prevent multiple close calls

    setIsClosing(true);
    // Animate close button
    Animated.timing(closeBtnAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Close the modal
    onClose && onClose();

    // Reset close button animation after a delay
    setTimeout(() => {
      closeBtnAnim.setValue(0);
      setIsClosing(false);
    }, 300);
  };

  const handleBackdropPress = () => {
    if (!showCloseBtn && !isClosing) {
      handleClose();
    }
  };

  // Close button animation styles
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

  if (!visible) return null;

  return (
    <Modal
      animationType="none" // We handle animation ourselves
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        {/* Animated backdrop */}
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: opacityAnim,
            },
          ]}
        >
          <BlurView intensity={10} style={StyleSheet.absoluteFillObject}>
            <TouchableWithoutFeedback
              testID="backdrop-touchable"
              onPress={handleBackdropPress}
            >
              <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
          </BlurView>
        </Animated.View>

        {/* Modal content */}
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: screenHeight * 1, // Fixed height to 90% of screen
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default PageModal;
