import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { HttpClient } from "../../../../api/HttpClient";
import { showToast } from "../../../ToastComponent/Toast";
import { formatAmount } from "../../../formatAmount";
import { useAuth } from "../../../../context/AuthContext";

export default function InitialSubscriptionScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [paystackModalVisible, setPaystackModalVisible] = useState(false);
  const [paystackPaymentUrl, setPaystackPaymentUrl] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("paystack");

  // Subscription plan details
  const subscriptionPlan = {
    name: "Standard Monthly Plan",
    price: 5000, // ₦5,000 in kobo
    duration: "1 month",
    benefits: [
      "List unlimited services",
      "Get discovered by more clients",
      "Advanced analytics dashboard",
      "Priority Customer Support (24/7)",
    ],
  };

  const handlePayNow = async () => {
    setLoading(true);
    await initiatePaystackPayment();
  };

  const initiatePaystackPayment = async () => {
    try {
      const res = await HttpClient.post("/payment/paystack/initiate", {
        paymentFor: "SUBSCRIPTION",
        description: `Payment for ${subscriptionPlan.name}`,
        amount: subscriptionPlan.price,
      });
      setPaystackPaymentUrl(res.data.paymentUrl);
      setPaymentReference(res.data.reference);
      setPaystackModalVisible(true);
    } catch (error) {
      showToast.error("Failed to initiate payment");
      setLoading(false);
    }
  };

  const handlePaystackVerificationAndSubscription = async (reference) => {
    if (!reference) {
      showToast.error("No payment reference found.");
      return;
    }
    setLoading(true);
    try {
      const verifyRes = await HttpClient.get(
        `/payment/paystack/verify/${reference}`
      );

      if (verifyRes.data.transaction.status === "paid") {
        const subscriptionPayload = {
          planName: "Standard Monthly",
          amount: subscriptionPlan.price,
        };

        const subscriptionRes = await HttpClient.post(
          "/vendor/mark-vendor-paid",
          subscriptionPayload
        );
        showToast.success(subscriptionRes.data.message);
        navigation.replace("Vendor", { screen: "Dashboard" });
      } else {
        showToast.error("Payment verification failed");
      }
      setPaystackModalVisible(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Payment verification or subscription renewal failed.";
      showToast.error(message);
    } finally {
      setLoading(false);
      setPaymentReference("");
    }
  };

  return (
    <View className="flex-1 bg-[#FFFAFD]">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View className="pt-[60px] pb-4 px-4 bg-[#FFFAFD] flex-row items-center justify-between shadow-sm">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text
          className="flex-1 text-center text-[14px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Subscription
        </Text>
        <TouchableOpacity
          onPress={() => navigation.replace("Vendor", { screen: "Dashboard" })}
        >
          <Text
            className="text-[12px] text-primary"
            style={{ fontFamily: "poppinsMedium" }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Main Heading */}
        <View className="mt-6 mb-8">
          <Text
            className="text-[14px] text-center text-gray-800"
            style={{ fontFamily: "poppinsMedium" }}
          >
            Activate Your In-shop Vendor Subscription
          </Text>
        </View>

        {/* Subscription Plan Card */}
        <View style={styles.planCard}>
          <View className="border-b border-[#EBEBEA] py-4">
            <Text
              className="text-[14px] text-center mb-3"
              style={{ fontFamily: "poppinsMedium" }}
            >
              {subscriptionPlan.name}
            </Text>

            <Text
              className="text-[20px] text-center text-primary font-bold"
              style={{ fontFamily: "poppinsSemibold" }}
            >
              {`${formatAmount(subscriptionPlan.price)}/Month`}
            </Text>
          </View>
          <View className="space-y-3 px-4 pt-4 pb-6">
            {subscriptionPlan.benefits.map((benefit, index) => (
              <View key={index}>
                <Text
                  className="text-[12px] text-center text-[#8C8D8B]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  {benefit}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Payment Method Section */}
        <View className="mt-8">
          <Text
            className="text-[14px] mb-4"
            style={{ fontFamily: "poppinsMedium" }}
          >
            Choose Payment Method
          </Text>

          <TouchableOpacity
            style={styles.paymentMethodCard}
            onPress={() => setSelectedPaymentMethod("paystack")}
          >
            <View className="flex-row items-center justify-between">
              <Text
                className="text-[14px]"
                style={{ fontFamily: "poppinsMedium" }}
              >
                Paystack
              </Text>
              <View
                style={[
                  styles.radioButton,
                  selectedPaymentMethod === "paystack" &&
                    styles.radioButtonSelected,
                ]}
              >
                {selectedPaymentMethod === "paystack" && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Information Text */}
        <View className="mt-6 mb-8">
          <Text
            className="text-[12px] text-[#8C8D8B] text-center leading-5"
            style={{ fontFamily: "poppinsRegular" }}
          >
            This subscription applies only to vendors offering services at a
            physical shop (inshop vendors). Home service vendors are charged 5%
            per successful service.
          </Text>
        </View>
      </ScrollView>

      {/* Pay Now Button */}
      <View className="px-4 pb-10">
        <AuthButton
          title="Pay Now"
          onPress={handlePayNow}
          isloading={loading}
          loadingMsg="Processing..."
        />
      </View>

      {/* Paystack WebView Modal */}
      <Modal
        visible={paystackModalVisible}
        animationType="slide"
        onRequestClose={() => setPaystackModalVisible(false)}
        transparent={false}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity
              className="bg-primary rounded-[4px] py-2 px-4"
              onPress={() => {
                setPaystackModalVisible(false);
                handlePaystackVerificationAndSubscription(paymentReference);
              }}
            >
              <Text className="text-[10px] text-white">Verify Payment</Text>
            </TouchableOpacity>
          </View>
          {paystackPaymentUrl ? (
            <WebView
              source={{ uri: paystackPaymentUrl }}
              onNavigationStateChange={(navState) => {
                // Detect Paystack close or success URL
                if (
                  navState.url.includes("paystack.com/close") ||
                  navState.url.includes("payment/success")
                ) {
                  // Try to extract reference from URL if possible
                  const refMatch = navState.url.match(/[?&]reference=([^&#]+)/);
                  const reference = refMatch ? refMatch[1] : paymentReference;
                  setPaystackModalVisible(false);
                  setPaystackPaymentUrl("");
                  if (reference) {
                    handlePaystackVerificationAndSubscription(reference);
                  } else {
                    Alert.alert(
                      "Payment",
                      "Payment completed, but reference not found."
                    );
                  }
                }
              }}
              startInLoadingState
              style={{ flex: 1 }}
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  planCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentMethodCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EB278D",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EB278D",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#EB278D",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EB278D",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});
