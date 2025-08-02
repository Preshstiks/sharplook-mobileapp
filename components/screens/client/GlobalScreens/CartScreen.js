import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { HttpClient } from "../../../../api/HttpClient";
import EmptySVG from "../../../../assets/img/empty.svg";
import { formatAmount } from "../../../formatAmount";
import { useCart } from "../../../../context/CartContext";
import { showToast } from "../../../ToastComponent/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../../../context/AuthContext";
import { getCurrentLocation } from "../../../../utils/locationUtils";
import { calculatePrice } from "../../../reusuableComponents/PriceKmCalculator";
import WebView from "react-native-webview";
import LocationSelectionModal from "./LocationSelectionModal";
import PaymentMethodModal from "./PaymentMethodModal";

export default function CartScreen() {
  const navigation = useNavigation();
  const { cartItems, setCartItems, fetchCart, loading } = useCart();
  const { user: currentUser } = useAuth();
  const webviewRef = useRef(null);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [paystackPaymentUrl, setPaystackPaymentUrl] = useState(null);
  const [paymentReference, setPaymentReference] = useState(null);
  const [paystackModalVisible, setPaystackModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Location and payment data
  const [locationData, setLocationData] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Group cart items by vendor
  const cartItemsByVendor = cartItems.reduce((acc, item) => {
    const vendorId = item.product?.vendorId;
    if (!acc[vendorId]) {
      acc[vendorId] = [];
    }
    acc[vendorId].push(item);
    return acc;
  }, {});

  // Get unique vendor IDs
  const vendorIds = Object.keys(cartItemsByVendor);

  // Calculate delivery and total based on location data
  const delivery = locationData?.delivery || 0;
  const total = subtotal + delivery;

  const sharpPayReference = `SHARP-PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [fetchCart])
  );

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = async (itemId) => {
    setDeletingItemId(itemId);
    const token = await AsyncStorage.getItem("token");

    try {
      const res = await HttpClient.delete(`/client/removeProduct/${itemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      showToast.success(res.data.message);
    } catch (error) {
    } finally {
      setDeletingItemId(null);
    }
  };

  const handleLocationSelected = (data) => {
    setLocationData(data);
    setShowLocationModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentMethodSelected = async (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setShowPaymentModal(false);

    if (paymentMethod === "PAYSTACK") {
      await initiateCheckout();
    } else if (paymentMethod === "SHARP-PAY") {
      await handleCheckoutFrmCart();
    }
  };

  const handleCheckoutFrmCart = async () => {
    try {
      const res = await HttpClient.post("/orders/checkout", {
        reference: sharpPayReference,
      });
      showToast.success("Order placed successfully using SharpPay");
      navigation.navigate("HomeScreen");
    } catch (error) {
      if (error.response?.data?.message === "Insufficient wallet balance") {
        showToast.error(error.response.data.message);
      } else {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Checkout failed. Please try again.";
        showToast.error(message);
      }
    }
  };

  const initiateCheckout = async () => {
    try {
      const res = await HttpClient.post("/payment/paystack/initiate", {
        paymentFor: "CHECKOUT FROM CART",
        description: "Payment for Checkout from Cart",
        amount: total,
      });
      setPaystackPaymentUrl(res.data.paymentUrl);
      setPaymentReference(res.data.reference);
      setPaystackModalVisible(true);
    } catch (error) {
      showToast.error("Failed to initiate payment");
    }
  };

  const handlePaystackVerifyAndCheckout = async (reference) => {
    if (!reference) {
      showToast.error("Payment", "No payment reference found.");
      return;
    }
    setIsLoading(true);
    try {
      const verifyRes = await HttpClient.get(
        `/payment/paystack/verify/${reference}`
      );

      if (verifyRes.data.transaction.status === "paid") {
        const bookingPayload = {
          totalAmount: total,
          reference,
          paymentMethod: "PAYSTACK",
        };

        const checkoutRes = await HttpClient.post(
          "/orders/checkout",
          bookingPayload
        );
        showToast.success("Order placed successfully using PayStack");
        navigation.navigate("HomeScreen");
      } else {
        showToast.error("Payment verification failed");
      }
      setPaystackModalVisible(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Payment verification or checkout failed.";
      showToast.error(message);
    } finally {
      setIsLoading(false);
      setPaymentReference("");
    }
  };

  return (
    <View className="flex-1 bg-secondary">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View className="pt-[60px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[16px] text-faintDark"
        >
          Cart
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Cart Items or Empty State */}
      {isLoading ? (
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 items-center justify-center mt-20">
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[16px] text-faintDark"
            >
              Loading cart...
            </Text>
          </View>
        </ScrollView>
      ) : cartItems.length === 0 ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EmptySVG width={120} height={120} />
          <Text
            className="text-[14px] text-gray-400 mt-2"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Your cart is empty
          </Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Group items by vendor */}
          {vendorIds.map((vendorId) => (
            <View key={vendorId} className="mb-6">
              {/* Items from this vendor */}
              {cartItemsByVendor[vendorId].map((item) => (
                <View
                  key={item.product.id}
                  className="flex-row bg-white rounded-[8px] shadow-sm mb-4 p-3 items-center"
                >
                  <Image
                    source={{ uri: item.product.picture }}
                    className="w-[100px] h-[100px] rounded-xl mr-3"
                    resizeMode="cover"
                  />
                  <View className="flex-1">
                    <Text
                      style={{ fontFamily: "poppinsMedium" }}
                      className="text-[14px] text-faintDark"
                    >
                      {item.product.productName}
                    </Text>
                    <Text
                      style={{ fontFamily: "poppinsMedium" }}
                      className="text-[12px] text-primary"
                    >
                      {formatAmount(item.product.price)}
                    </Text>
                    <View className="flex-row items-center">
                      <Text
                        style={{ fontFamily: "latoRegular" }}
                        className="text-[13px] text-faintDark"
                      >
                        {item.product.status === "in stock"
                          ? "In Stock"
                          : "Out of Stock"}
                      </Text>
                    </View>
                    {/* Quantity Selector */}
                    <View className="flex-row items-center mt-2">
                      <TouchableOpacity
                        onPress={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
                      >
                        <Ionicons name="remove" size={16} color="#EB278D" />
                      </TouchableOpacity>
                      <Text
                        style={{ fontFamily: "poppinsMedium" }}
                        className="text-[14px] text-[#868889] mx-4"
                      >
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
                      >
                        <Ionicons name="add" size={16} color="#EB278D" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="ml-2"
                    onPress={() => removeItem(item.product.id)}
                    disabled={deletingItemId === item.product.id}
                  >
                    {deletingItemId === item.product.id ? (
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ActivityIndicator size="small" color="#EB278D" />
                      </View>
                    ) : (
                      <MaterialIcons
                        name="delete-outline"
                        size={24}
                        color="#EB278D"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}

      {/* Summary & Checkout Button */}
      {cartItems.length > 0 && (
        <View className="bg-white rounded-t-2xl pb-[30px] shadow-lg px-4 pt-4">
          <View className="flex-row justify-between mb-2">
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[14px] text-[#868889]"
            >
              Subtotal
            </Text>
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[14px] text-[#868889]"
            >
              {formatAmount(subtotal)}
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[14px] text-[#868889]"
            >
              Shipping
            </Text>
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[14px] text-[#868889]"
            >
              ₦0
            </Text>
          </View>
          <View className="h-[1px] my-3 border-t border-[#EBEBEB]" />
          <View className="flex-row justify-between mb-4">
            <Text
              style={{ fontFamily: "poppinsSemiBold" }}
              className="text-[16px] text-faintDark"
            >
              Total
            </Text>
            <Text
              style={{ fontFamily: "poppinsSemiBold" }}
              className="text-[16px] text-fadedDark"
            >
              ₦ {subtotal.toLocaleString()}
            </Text>
          </View>

          <AuthButton
            title="Proceed"
            onPress={() => setShowLocationModal(true)}
          />
        </View>
      )}

      {/* Location Selection Modal */}
      <LocationSelectionModal
        visible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        subtotal={subtotal}
        onLocationSelected={handleLocationSelected}
        user={currentUser}
        vendorIds={vendorIds}
        cartItemsByVendor={cartItemsByVendor}
      />

      {/* Payment Method Modal */}
      <PaymentMethodModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        subtotal={subtotal}
        delivery={delivery}
        total={total}
        onPaymentMethodSelected={handlePaymentMethodSelected}
        transportFees={locationData?.transportFees}
        cartItemsByVendor={cartItemsByVendor}
      />

      {/* Paystack Payment Modal */}
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
                handlePaystackVerifyAndCheckout(paymentReference);
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
                    handlePaystackVerifyAndCheckout(reference);
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
  headerTitle: {
    color: "#222",
    fontSize: 16,
    fontFamily: "poppinsMedium",
    flex: 1,
    textAlign: "center",
    marginLeft: -28,
  },
});
