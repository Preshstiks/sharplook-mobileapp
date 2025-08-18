import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PageModal from "../../../reusuableComponents/PageModal";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { useAuth } from "../../../../context/AuthContext";
import { StatusBar } from "react-native";

export default function DeliveryMethodModal({
  visible,
  onClose,
  subtotal,
  onLocationSelected,
  onPickupSelected, // New prop for pickup selection
}) {
  const { user: authUser } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState("PICKUP");
  const [isLoading, setIsLoading] = useState(false);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleBack = () => {
    onClose();
  };

  const handleNext = () => {
    setIsLoading(true);

    if (selectedMethod === "PICKUP") {
      // For pickup, go directly to payment modal
      // No delivery fees for pickup
      const pickupData = {
        deliveryMethod: "PICKUP",
        delivery: 0,
        total: subtotal,
        transportFees: {},
      };

      onPickupSelected(pickupData);
    } else if (selectedMethod === "SHIPPING") {
      // For shipping, go to location selection
      // This will trigger the location modal flow
      onLocationSelected({ deliveryMethod: "SHIPPING" });
    }

    setIsLoading(false);
  };

  return (
    <PageModal visible={visible} onClose={onClose} backgroundcolor="#FFFFFF">
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#EB278D" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Delivery Method</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Pick Up Option */}
          <TouchableOpacity
            style={[
              styles.optionContainer,
              selectedMethod === "PICKUP" && styles.selectedOption,
            ]}
            onPress={() => handleMethodSelect("PICKUP")}
          >
            <View style={styles.iconContainer}>
              <View style={[styles.iconCircle, { backgroundColor: "#EB278D" }]}>
                <Ionicons name="location" size={20} color="#fff" />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>Pick Up</Text>
              <Text style={styles.optionDescription}>
                Pick up your order directly from the vendor's location at your
                convenience.
              </Text>
              <Text style={styles.freeText}>FREE</Text>
            </View>
            {selectedMethod === "PICKUP" && (
              <View style={styles.checkmark}>
                <Ionicons name="checkmark-circle" size={24} color="#EB278D" />
              </View>
            )}
          </TouchableOpacity>

          {/* Shipping Option */}
          <TouchableOpacity
            style={[
              styles.optionContainer,
              selectedMethod === "SHIPPING" && styles.selectedOption,
            ]}
            onPress={() => handleMethodSelect("SHIPPING")}
          >
            <View style={styles.iconContainer}>
              <View style={[styles.iconCircle, { backgroundColor: "#EB278D" }]}>
                <Ionicons name="car" size={20} color="#fff" />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>Shipping</Text>
              <Text style={styles.optionDescription}>
                Have your order carefully packaged and delivered directly to
                your preferred address
              </Text>
              <Text style={styles.feeText}>Delivery fees apply</Text>
            </View>
            {selectedMethod === "SHIPPING" && (
              <View style={styles.checkmark}>
                <Ionicons name="checkmark-circle" size={24} color="#EB278D" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <View style={styles.buttonContainer}>
          <AuthButton
            title={isLoading ? "Processing..." : "Next"}
            onPress={handleNext}
            disabled={isLoading || !selectedMethod}
          />
        </View>
      </SafeAreaView>
    </PageModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "latoBold",
    color: "#000",
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  optionContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  selectedOption: {
    borderColor: "#EB278D",
    backgroundColor: "#FFFAFD",
  },
  iconContainer: {
    marginRight: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: "poppinsSemiBold",
    color: "#000",
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
    fontFamily: "poppinsRegular",
    lineHeight: 20,
    marginBottom: 4,
  },
  freeText: {
    fontSize: 14,
    color: "#4CAF50",
    fontFamily: "poppinsSemiBold",
  },
  feeText: {
    fontSize: 14,
    color: "#FF9800",
    fontFamily: "poppinsSemiBold",
  },
  checkmark: {
    marginLeft: 12,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: "#f8f9fa",
  },
});
