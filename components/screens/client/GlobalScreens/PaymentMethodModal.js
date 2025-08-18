import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PageModal from "../../../reusuableComponents/PageModal";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { formatAmount } from "../../../formatAmount";
import { useAuth } from "../../../../context/AuthContext";

export default function PaymentMethodModal({
  visible,
  onClose,
  subtotal,
  delivery,
  total,
  onPaymentMethodSelected,
  transportFees,
  cartItemsByVendor,
}) {
  const { user: currentUser } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("");

  // Debug logging for user data

  const handleProceed = () => {
    if (!paymentMethod) {
      return;
    }

    onPaymentMethodSelected(paymentMethod);
  };

  return (
    <PageModal visible={visible} onClose={onClose} backgroundcolor="#FFFFFF">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="px-4 pt-[30px]">
          <View className="flex-row items-center justify-between mb-6">
            <Text
              style={{ fontFamily: "poppinsSemiBold" }}
              className="text-[20px] text-faintDark"
            >
              Select Payment Method
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#201E1F" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 px-4">
          {/* Payment Method Selection */}
          <View className="mb-6">
            <Text
              style={{ fontFamily: "poppinsMedium" }}
              className="text-[16px] text-faintDark mb-3"
            >
              Payment Method
            </Text>

            <View className="bg-gray-50 rounded-lg p-3">
              <TouchableOpacity
                onPress={() => setPaymentMethod("SHARP-PAY")}
                className={`flex-row items-center p-3 rounded-lg mb-2 ${
                  paymentMethod === "SHARP-PAY"
                    ? "bg-primary/10 border border-primary"
                    : "bg-white border border-[#F9BCDC]"
                }`}
              >
                <View
                  className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                    paymentMethod === "SHARP-PAY"
                      ? "border-primary bg-primary"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "SHARP-PAY" && (
                    <View className="w-2 h-2 rounded-full bg-white" />
                  )}
                </View>
                <View className="flex-1">
                  <Text
                    style={{ fontFamily: "poppinsMedium" }}
                    className="text-[16px] text-faintDark"
                  >
                    SharpPay Wallet
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[14px] text-gray-500 mt-1"
                  >
                    Pay with your wallet balance
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setPaymentMethod("PAYSTACK")}
                className={`flex-row items-center p-3 rounded-lg ${
                  paymentMethod === "PAYSTACK"
                    ? "bg-primary/10 border border-primary"
                    : "bg-white border border-[#F9BCDC]"
                }`}
              >
                <View
                  className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                    paymentMethod === "PAYSTACK"
                      ? "border-primary bg-primary"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "PAYSTACK" && (
                    <View className="w-2 h-2 rounded-full bg-white" />
                  )}
                </View>
                <View className="flex-1">
                  <Text
                    style={{ fontFamily: "poppinsMedium" }}
                    className="text-[16px] text-faintDark"
                  >
                    Paystack
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[14px] text-gray-500 mt-1"
                  >
                    Pay with card or bank transfer
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Fixed bottom section with pricing */}
        <View className="bg-white border-t border-[#EBEBEB] px-4 py-4">
          <View className="flex-row justify-between mb-2">
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[16px] text-[#868889]"
            >
              Subtotal
            </Text>
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[16px] text-[#868889]"
            >
              {formatAmount(subtotal)}
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[16px] text-[#868889]"
            >
              Shipping
            </Text>
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[16px] text-[#868889]"
            >
              {formatAmount(delivery)}
            </Text>
          </View>
          <View className="h-[1px] my-3 border-t border-[#EBEBEB]" />
          <View className="flex-row justify-between mb-4">
            <Text
              style={{ fontFamily: "poppinsSemiBold" }}
              className="text-[18px] text-faintDark"
            >
              Total
            </Text>
            <Text
              style={{ fontFamily: "poppinsSemiBold" }}
              className="text-[18px] text-fadedDark"
            >
              ₦ {total.toLocaleString()}
            </Text>
          </View>

          <AuthButton
            title="Checkout"
            onPress={handleProceed}
            disabled={!paymentMethod}
          />
        </View>
      </SafeAreaView>
    </PageModal>
  );
}
