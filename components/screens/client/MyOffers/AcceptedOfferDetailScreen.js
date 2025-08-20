import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StatusBar,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { HttpClient } from "../../../../api/HttpClient";
import { WebView } from "react-native-webview";
import { showToast } from "../../../ToastComponent/Toast";
import { formatAmount } from "../../../formatAmount";
import SkeletonBox from "../../../reusuableComponents/SkeletonLoader";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";

// Vendor Card Skeleton Component
const VendorCardSkeleton = () => {
  return (
    <View className="bg-white rounded-xl shadow p-4 mb-4">
      <View className="items-center">
        {/* Avatar skeleton */}
        <View className="w-20 h-20 rounded-full mb-2 bg-gray-200">
          <SkeletonBox width="100%" height="100%" borderRadius={40} />
        </View>

        {/* Business name skeleton */}
        <SkeletonBox
          width="80%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: 8 }}
        />

        {/* Service type badge skeleton */}
        <SkeletonBox
          width={80}
          height={24}
          borderRadius={8}
          style={{ marginBottom: 16 }}
        />
      </View>

      {/* Availability skeleton */}
      <View className="flex-row items-center mt-2 mb-4 justify-between">
        <View className="flex-row items-center gap-2">
          <SkeletonBox width={15} height={15} borderRadius={2} />
          <SkeletonBox width={60} height={12} borderRadius={4} />
        </View>
      </View>

      {/* Buttons skeleton */}
      <View className="flex-row mt-4 space-x-2">
        <SkeletonBox
          width="48%"
          height={44}
          borderRadius={8}
          style={{ marginRight: 4 }}
        />
        <SkeletonBox
          width="48%"
          height={44}
          borderRadius={8}
          style={{ marginLeft: 4 }}
        />
      </View>
    </View>
  );
};

// Multiple vendor cards skeleton
const VendorCardsSkeleton = ({ count = 3 }) => {
  return (
    <View>
      {Array.from({ length: count }).map((_, index) => (
        <VendorCardSkeleton key={index} />
      ))}
    </View>
  );
};

export default function AcceptedOfferDetailScreen() {
  const navigation = useNavigation();
  const { offerId, totalAmount, vendorOffers } = useRoute().params;
  const [acceptedOffer, setAcceptedOffer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paystackModalVisible, setPaystackModalVisible] = useState(false);
  const [paystackPaymentUrl, setPaystackPaymentUrl] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const getAcceptedOffer = async () => {
    setLoading(true);
    try {
      const res = await HttpClient.post("offers/vendors", {
        offerId,
      });

      // Debug the first vendor's structure more deeply

      setAcceptedOffer(res.data.data.vendors);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getAcceptedOffer();
    }, [])
  );

  // Payment methods
  const paymentMethods = [
    { label: "Paystack", value: "PAYSTACK" },
    { label: "SharpPay", value: "SHARP-PAY" },
  ];

  // Initiate Paystack payment
  const initiatePaystackPayment = async (vendor) => {
    try {
      const res = await HttpClient.post("/payment/paystack/initiate", {
        paymentFor: "VENDOR SELECTION",
        description: "Payment for Vendor Selection",
        amount: vendorOffers[0].price || 0,
      });
      setPaystackPaymentUrl(res.data.paymentUrl);
      setPaymentReference(res.data.reference);
      setPaystackModalVisible(true);
    } catch (error) {
      showToast.error("Failed to initiate payment");
    }
  };

  // Handle SharpPay payment
  const handleSharpPayPayment = async (vendor) => {
    const reference = `SHARP-PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    await selectVendor(vendor, reference, "SHARP-PAY");
  };

  // Select vendor and make payment
  const selectVendor = async (vendor, reference, paymentMethod) => {
    setLoading(true);
    try {
      // Debug the vendor structure

      // Try different possible vendor ID locations
      const vendorId = vendor?.vendor?.id || vendor?.id || vendor?.vendorId;

      if (!vendorId) {
        throw new Error("Vendor ID not found in vendor object");
      }

      const payload = {
        offerId,
        selectedVendorId: vendorId,
        paymentMethod,
        totalAmount: vendorOffers[0].price,
      };

      // Only include reference for PAYSTACK payments
      if (paymentMethod === "PAYSTACK" && reference) {
        payload.reference = reference;
      }

      const res = await HttpClient.post("/offers/select-vendor", payload);

      showToast.success("Vendor selected successfully!");
      navigation.goBack();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to select vendor";
      showToast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Paystack payment verification and vendor selection
  const handlePaystackVerificationAndSelection = async (reference, vendor) => {
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
        await selectVendor(vendor, reference, "PAYSTACK");
      } else {
        showToast.error("Payment verification failed");
      }
      setPaystackModalVisible(false);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Payment verification failed";
      showToast.error(message);
    } finally {
      setLoading(false);
      setPaymentReference("");
    }
  };

  // Handle payment method selection
  const handlePaymentMethodSelected = async (paymentMethod, vendor) => {
    setSelectedPaymentMethod(paymentMethod);
    setShowPaymentModal(false);

    if (paymentMethod === "PAYSTACK") {
      await initiatePaystackPayment(vendor);
    } else if (paymentMethod === "SHARP-PAY") {
      await handleSharpPayPayment(vendor);
    }
  };

  return (
    <View className="">
      <StatusBar backgroundColor="#ED2584" barStyle="light-content" />
      <View className="bg-primary pt-[60px] pb-4 px-4">
        <View className="flex-row items-center justify-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute left-4"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-white text-[18px]"
          >
            Choose Vendor
          </Text>
        </View>
      </View>
      <ScrollView className="px-4 pt-8 pb-[80px]">
        <Text
          style={{ fontFamily: "poppinsSemiBold" }}
          className="text-[20px] mb-4"
        >
          Accepted Offers
        </Text>
        <View className="w-[100px]" />

        {/* Show skeleton loader while loading */}
        {loading ? (
          <VendorCardsSkeleton count={3} />
        ) : (
          /* Map over vendors */
          acceptedOffer?.map((vendor) => {
            if (
              vendor?.vendor?.vendorAvailabilities &&
              vendor.vendor.vendorAvailabilities.length > 0
            ) {
              const availability = vendor.vendor.vendorAvailabilities[0];
            }
            return (
              <View
                key={vendor.id}
                className="bg-white rounded-xl shadow p-4 mb-4"
              >
                <View className="items-center">
                  <View>
                    <Image
                      source={
                        vendor?.avatar
                          ? { uri: vendor?.avatar }
                          : require("../../../../assets/icon/avatar.png")
                      }
                      className="w-20 border border-pinklight h-20 rounded-full mb-2"
                    />
                    {vendor?.vendorOnboarding?.registerationNumber && (
                      <View className="absolute bottom-[2px] right-[2px]">
                        <MaterialIcons
                          name="verified"
                          size={20}
                          color="#34C759"
                        />
                      </View>
                    )}
                  </View>

                  <Text
                    style={{ fontFamily: "poppinsMedium" }}
                    className="text-[16px] mt-6 text-center"
                  >
                    {vendor?.vendorOnboarding?.businessName}
                  </Text>
                  <View className="bg-primary my-3 px-[10px] py-1 rounded-[8px] mt-1">
                    <Text
                      style={{ fontFamily: "poppinsRegular" }}
                      className="text-[12px] pt-1 text-white "
                    >
                      {vendor?.vendorOnboarding?.serviceType === "IN_SHOP"
                        ? "In-shop"
                        : "Home Service"}
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-start mt-2 mb-4 justify-between">
                  <View className="flex-row items-start gap-2 flex-1">
                    <FontAwesome
                      name="calendar-check-o"
                      size={15}
                      color="#FFD600"
                      style={{ marginTop: 2 }}
                    />
                    <Text
                      style={{ fontFamily: "poppinsRegular" }}
                      className="text-[14px] text-faintDark flex-1"
                      numberOfLines={3}
                    >
                      {(() => {
                        // Check for availability in the correct location based on the data structure
                        const availability = vendor?.vendorAvailability;

                        if (availability && availability.days) {
                          const { days, fromTime, toTime } = availability;

                          const formatTime = (time) => {
                            if (!time) return "";
                            const [hours, minutes] = time.split(":");
                            const hour = parseInt(hours);
                            const ampm = hour >= 12 ? "PM" : "AM";
                            const displayHour =
                              hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                            return `${displayHour}:${minutes} ${ampm}`;
                          };

                          const formattedFromTime = formatTime(fromTime);
                          const formattedToTime = formatTime(toTime);
                          const formattedDays = days.join(", ");

                          const result = `${formattedDays} • ${formattedFromTime} - ${formattedToTime}`;

                          return result;
                        }
                        return "Not available";
                      })()}
                    </Text>
                  </View>
                </View>

                <View className="flex-row mt-4 space-x-2">
                  <TouchableOpacity
                    className="flex-1 bg-primary rounded-lg px-2 py-3 mr-2"
                    onPress={() => {
                      setSelectedVendor(vendor);
                      setShowPaymentModal(true);
                    }}
                    disabled={loading}
                  >
                    <Text
                      style={{ fontFamily: "latoBold" }}
                      className="text-white text-center text-[16px]"
                    >
                      {loading ? "Processing..." : "Select Vendor"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 border border-primary rounded-lg px-2 py-3 ml-2"
                    onPress={() => {
                      navigation.navigate("VendorProfileScreen", {
                        vendorData: vendor,
                      });
                    }}
                  >
                    <Text
                      style={{ fontFamily: "latoBold" }}
                      className="text-primary text-[16px] text-center"
                    >
                      View Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Payment Method Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-end">
          <View className="bg-white rounded-t-[20px] p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text
                style={{ fontFamily: "poppinsSemiBold" }}
                className="text-[18px] text-fadedDark"
              >
                Select Payment Method
              </Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Payment Methods */}
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.value}
                onPress={() =>
                  handlePaymentMethodSelected(method.value, selectedVendor)
                }
                className="flex-row items-center mb-4 p-4 border border-[#F9BCDC] rounded-lg"
              >
                <View
                  className={`w-5 h-5 rounded-full border mr-3 ${
                    selectedPaymentMethod === method.value
                      ? "border-primary bg-primary"
                      : "border-faintDark2"
                  }`}
                />
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  {method.label}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Total Amount */}
            <View className="flex-row justify-between items-center border-t border-lightgray pt-4 mt-4">
              <Text
                style={{ fontFamily: "poppinsMedium" }}
                className="text-[18px] text-fadedDark"
              >
                Total Amount
              </Text>
              <Text
                style={{ fontFamily: "poppinsSemiBold" }}
                className="text-primary text-[18px]"
              >
                {formatAmount(vendorOffers[0].price)}
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Paystack WebView Modal */}
      <Modal
        visible={paystackModalVisible}
        animationType="slide"
        onRequestClose={() => setPaystackModalVisible(false)}
        transparent={false}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={{ width: 24 }} />
            <Text style={styles.headerTitle}>Payment</Text>
            <TouchableOpacity
              onPress={() => setPaystackModalVisible(false)}
              style={{ padding: 8 }}
            >
              <Ionicons name="close" size={24} color="#222" />
            </TouchableOpacity>
          </View>
          {paystackPaymentUrl ? (
            <>
              <WebView
                source={{ uri: paystackPaymentUrl }}
                onNavigationStateChange={(navState) => {
                  // Detect Paystack close or success URL
                  if (
                    navState.url.includes("paystack.com/close") ||
                    navState.url.includes("payment/success")
                  ) {
                    // Try to extract reference from URL if possible
                    const refMatch = navState.url.match(
                      /[?&]reference=([^&#]+)/
                    );
                    const reference = refMatch ? refMatch[1] : paymentReference;
                    setPaystackModalVisible(false);
                    setPaystackPaymentUrl("");
                    if (reference) {
                      handlePaystackVerificationAndSelection(
                        reference,
                        selectedVendor
                      );
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
              <View style={styles.verifyButtonContainer}>
                <Text className="text-center font-medium text-primary pb-2">
                  Click "Verify payment" after payment to verify
                </Text>
                <AuthButton
                  onPress={() => {
                    setPaystackModalVisible(false);
                    handlePaystackVerificationAndSelection(
                      paymentReference,
                      selectedVendor
                    );
                  }}
                  title="Verify Payment"
                />
              </View>
            </>
          ) : null}
        </View>
      </Modal>

      <View style={{ height: 50 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
  verifyButtonContainer: {
    backgroundColor: "#fff",
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
});
