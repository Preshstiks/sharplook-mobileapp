import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Specialist1 from "../../../../assets/img/ayo.svg";
import Specialist2 from "../../../../assets/img/alex.svg";
import Specialist3 from "../../../../assets/img/sharon.svg";
import Specialist4 from "../../../../assets/img/priti.svg";
import { Calendar } from "react-native-calendars";
import { AuthInput } from "../../../reusuableComponents/inputFields/AuthInput";
import { formatAmount } from "../../../formatAmount";
import { Formik } from "formik";
import { inshopvalidationSchema } from "../../../../utils/validationSchemas";
import { useAuth } from "../../../../context/AuthContext";
import { HttpClient } from "../../../../api/HttpClient";
import { PaystackProvider, usePaystack } from "react-native-paystack-webview";
import { WebView } from "react-native-webview";
import { showToast } from "../../../ToastComponent/Toast";

export default function BookAppointmentScreen() {
  const { popup } = usePaystack();
  const navigation = useNavigation();
  const route = useRoute();
  const service = route.params?.service;
  const vendorData = route.params?.vendorData;
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayString);
  const [selectedSpecialist, setSelectedSpecialist] = useState(0);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");
  const { user } = useAuth();
  const [paystackModalVisible, setPaystackModalVisible] = useState(false);
  const [paystackPaymentUrl, setPaystackPaymentUrl] = useState("");
  const { id } = route.params;
  console.log("service at render:", service);
  console.log({ vendorData });
  const handleBookNow = async (values) => {
    console.log("[DEBUG] handleBookNow called with values:", values);
    console.log("service in handleBookNow:", service);
    try {
      const res = await HttpClient.post("/bookings/bookVendor", {
        vendorId: id,
        date: selectedDate,
        time: values.time,
        price: service.servicePrice,
        serviceName: service.serviceName,
        serviceId: service.id,
        totalAmount: service.servicePrice,
        reference: values.reference,
        paymentMethod: values.paymentMethod,
      });
      console.log("[DEBUG] handleBookNow response:", res.data);
    } catch (error) {
      if (error.response.data.message === "Insufficient wallet balance") {
        showToast.error(error.response.data.message);
      } else {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          error.response.message;
        showToast.error(message);
      }
      console.log("[DEBUG] handleBookNow error:", error?.response || error);
    }
  };
  console.log({ service });
  const CALLBACK_URL = "sharplookapp://payment-callback";
  const checkout = async (values) => {
    console.log("[DEBUG] checkout called with values:", values);
    try {
      const res = await HttpClient.post("/payment/paystack/initiate", {
        paymentFor: "BOOKING",
        description: "Booking for In Shop",
        amount: service.servicePrice,
        // callback_url: CALLBACK_URL, // Not needed for WebView-only flow
      });
      setPaystackPaymentUrl(res.data.paymentUrl);
      setPaystackModalVisible(true);
    } catch (error) {
      console.log("[DEBUG] checkout error:", error?.response || error);
    }
  };
  const paymentMethods = [
    { label: "Paystack", value: "PAYSTACK" },
    { label: "SharpPay", value: "SHARP-PAY" },
  ];

  // Add this useEffect to handle paymentReference
  useEffect(() => {
    const paymentReference = route.params?.paymentReference;
    if (paymentReference) {
      handlePaystackVerificationAndBooking(paymentReference);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.paymentReference]);

  // Handler for verifying payment and booking
  const handlePaystackVerificationAndBooking = async (reference) => {
    try {
      // 1. Verify payment
      const verifyRes = await HttpClient.get(
        `/payment/paystack/verify/${reference}`
      );
      if (verifyRes.data.status === "success") {
        // 2. Book appointment
        const bookingPayload = {
          vendorId: id,
          date: selectedDate,
          time: time || "09:00", // fallback if time is not set
          price: service.servicePrice,
          serviceName: service.serviceName,
          serviceId: service.id,
          totalAmount: service.servicePrice,
          reference,
          paymentMethod: "paystack",
        };
        const bookRes = await HttpClient.post(
          "/bookings/bookVendor",
          bookingPayload
        );
        // 3. Show success message
        Alert.alert("Success", bookRes.data.message || "Booking successful!");
        return "success";
      } else {
        Alert.alert("Payment Failed", "Payment verification failed.");
        return "failure";
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during booking.");
      console.log(error);
      return "failure";
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary pt-[60px] pb-4 flex-row items-center justify-between px-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          className="text-white text-[16px] flex-1 text-center"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Book Appointment
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <Formik
        initialValues={{ time: "", paymentMethod: "" }}
        validationSchema={inshopvalidationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          console.log("[DEBUG] Form submitted with values:", values);
          try {
            if (values.paymentMethod === "SHARP-PAY") {
              // Generate random reference
              const reference = `SHARP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
              const payload = {
                date: selectedDate,
                time: values.time,
                paymentMethod: values.paymentMethod,
                reference,
                price: service.servicePrice,
                serviceName: service.serviceName,
                serviceId: service.id,
              };
              console.log("[DEBUG] sharpPay payload:", payload);
              await handleBookNow(payload);
            } else if (values.paymentMethod === "PAYSTACK") {
              await checkout(values);
            } else {
              console.log("[DEBUG] No payment method selected.");
            }
          } catch (error) {
            console.log("[DEBUG] onSubmit error:", error);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
            <View className="px-4 mt-6">
              <Text
                className="text-[16px] mb-2"
                style={{ fontFamily: "poppinsMedium" }}
              >
                Choose Date and Time
              </Text>

              {/* Calendar */}
              <View className="bg-white rounded-xl p-4 mb-4">
                <Calendar
                  current={selectedDate}
                  onDayPress={(day) => setSelectedDate(day.dateString)}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      selectedColor: "#EB278D",
                      selectedTextColor: "#fff",
                    },
                  }}
                  theme={{
                    backgroundColor: "#fff",
                    calendarBackground: "#fff",
                    textSectionTitleColor: "#222",
                    textSectionTitleDisabledColor: "#d9e1e8",
                    selectedDayBackgroundColor: "#E91E63",
                    selectedDayTextColor: "#fff",
                    todayTextColor: "#E91E63",
                    dayTextColor: "#222",
                    textDisabledColor: "#d9e1e8",
                    arrowColor: "#222",
                    monthTextColor: "#222",
                    textMonthFontWeight: "bold",
                    textDayFontFamily: "Poppins-Medium",
                    textMonthFontFamily: "Poppins-Medium",
                    textDayHeaderFontFamily: "Poppins-Medium",
                  }}
                  renderArrow={(direction) => (
                    <Ionicons
                      name={
                        direction === "left"
                          ? "chevron-back"
                          : "chevron-forward"
                      }
                      size={20}
                      color="#222"
                    />
                  )}
                  hideExtraDays={true}
                  firstDay={1}
                  style={{ borderRadius: 16 }}
                />
              </View>

              {/* Time Input */}
              <View className="mb-5">
                <AuthInput
                  label="Enter Time"
                  name="time"
                  value={values.time}
                  onChangeText={handleChange("time")}
                  error={errors.time}
                  touched={touched.time}
                />
              </View>

              {/* Payment Method Radio */}
              <View className="mb-5">
                <Text
                  className="text-[16px] mb-3"
                  style={{ fontFamily: "poppinsMedium" }}
                >
                  Payment Method
                </Text>

                {paymentMethods.map((method) => (
                  <TouchableOpacity
                    key={method.value}
                    onPress={() => setFieldValue("paymentMethod", method.value)}
                    className="flex-row items-center mb-3"
                  >
                    <View
                      className={`w-5 h-5 rounded-full border mr-3 ${
                        values.paymentMethod === method.value
                          ? "border-primary bg-primary"
                          : "border-gray-400"
                      }`}
                    />
                    <Text
                      className="text-base"
                      style={{ fontFamily: "poppinsRegular" }}
                    >
                      {method.label}
                    </Text>
                  </TouchableOpacity>
                ))}

                {touched.paymentMethod && errors.paymentMethod && (
                  <Text className="text-[#ff0000] text-sm mt-1">
                    {errors.paymentMethod}
                  </Text>
                )}
              </View>

              {/* Total Payment */}
              <View className="flex-row justify-between items-center border-t border-[#0000001A] py-4 mt-2">
                <Text
                  className="text-base font-semibold"
                  style={{ fontFamily: "poppinsMedium" }}
                >
                  Total Payment
                </Text>
                <Text
                  className="text-primary text-lg font-bold"
                  style={{ fontFamily: "poppinsMedium" }}
                >
                  {formatAmount(service.servicePrice)}
                </Text>
              </View>
            </View>

            {/* Submit Button */}
            <View className="px-4 mt-4">
              <TouchableOpacity
                disabled={loading}
                className="bg-primary rounded-xl py-4 items-center"
                onPress={handleSubmit}
              >
                <Text
                  className="text-white text-base font-semibold"
                  style={{ fontFamily: "poppinsMedium" }}
                >
                  {loading ? "Proceeding..." : "Proceed to Payment"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
      {/* Paystack WebView Modal */}
      <Modal
        visible={paystackModalVisible}
        animationType="slide"
        onRequestClose={() => setPaystackModalVisible(false)}
        transparent={false}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              backgroundColor: "#EB278D",
            }}
          >
            <TouchableOpacity onPress={() => setPaystackModalVisible(false)}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                marginLeft: 16,
                fontWeight: "bold",
              }}
            >
              Pay with Paystack
            </Text>
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
                  const reference = refMatch ? refMatch[1] : null;
                  setPaystackModalVisible(false);
                  setPaystackPaymentUrl("");
                  if (reference) {
                    handlePaystackVerificationAndBooking(reference);
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
