// components/reusuableComponents/SuccessModal.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

export default function SuccessModal({
  visible,
  onClose,
  lottieSource = require("../../assets/icon/success.json"), // Allow custom source too!
  message = "Congratulations, you have successfully verified your email account",
  buttonText = "Proceed to Login",
  containerStyle,
}) {
  return (
    <Modal isVisible={visible} backdropOpacity={0.5}>
      <View style={[styles.container, containerStyle]}>
        <LottieView
          source={lottieSource}
          autoPlay
          loop={false}
          style={[styles.lottie]}
        />
        <Text
          className="text-[12px] mb-5 text-center"
          style={{ fontFamily: "poppinsRegular" }}
        >
          {message}
        </Text>
        {buttonText && (
          <TouchableOpacity
            className="py-[10px] bg-primary w-full items-center rounded-[12px]"
            onPress={onClose}
          >
            <Text
              className="text-[16px] text-white"
              style={{ fontFamily: "poppinsMedium" }}
            >
              {buttonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    padding: 24,
  },
  lottie: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
});
