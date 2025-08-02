import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { formatAmount } from "../../../formatAmount";
import { Formik } from "formik";
import { inshopvalidationSchema } from "../../../../utils/validationSchemas";
import { useAuth } from "../../../../context/AuthContext";
import { HttpClient } from "../../../../api/HttpClient";
import { WebView } from "react-native-webview";
import { showToast } from "../../../ToastComponent/Toast";
import Dropdown from "../../../reusuableComponents/inputFields/Dropdown";
export default function BookAppointmentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const service = route.params?.service;
  const vendorData = route.params?.vendorData;
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayString);
  const [loading, setLoading] = useState(false);
  const [time] = useState("");
  const [paystackModalVisible, setPaystackModalVisible] = useState(false);
  const [paystackPaymentUrl, setPaystackPaymentUrl] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const { id } = route.params;
  const [pendingBookingValues, setPendingBookingValues] = useState({});

  const handleBookNow = async (values) => {
    try {
      const res = await HttpClient.post("/bookings/bookVendor", {
        vendorId: id,
        date: new Date(`${selectedDate}T${values.time}:00.000Z`),
        time: values.time,
        price: service.servicePrice,
        serviceName: service.serviceName,
        serviceId: service.id,
        totalAmount: service.servicePrice,
        reference: values.reference,
        paymentMethod: values.paymentMethod,
      });
      showToast.success(res.data.message);
      navigation.goBack();
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
    }
  };
  const checkout = async (values) => {
    try {
      const res = await HttpClient.post("/payment/paystack/initiate", {
        paymentFor: "BOOKING",
        description: "Payment for In-Shop Booking",
        amount: service.servicePrice,
      });
      setPaystackPaymentUrl(res.data.paymentUrl);
      setPaymentReference(res.data.reference);
      setPaystackModalVisible(true);
    } catch (error) {}
  };
  const paymentMethods = [
    { label: "Paystack", value: "PAYSTACK" },
    { label: "SharpPay", value: "SHARP-PAY" },
  ];
  const timeOptions = [
    { label: "06:00AM", value: "06:00AM" },
    { label: "07:00AM", value: "07:00AM" },
    { label: "08:00AM", value: "08:00AM" },
    { label: "09:00AM", value: "09:00AM" },
    { label: "10:00AM", value: "10:00AM" },
    { label: "11:00AM", value: "11:00AM" },
    { label: "12:00PM", value: "12:00PM" },
    { label: "01:00PM", value: "01:00PM" },
    { label: "02:00PM", value: "02:00PM" },
    { label: "03:00PM", value: "03:00PM" },
    { label: "04:00PM", value: "04:00PM" },
    { label: "05:00PM", value: "05:00PM" },
    { label: "06:00PM", value: "06:00PM" },
  ];
  // Handler for verifying payment and booking
  const handlePaystackVerificationAndBooking = async (
    reference,
    bookingValues
  ) => {
    if (!reference) {
      showToast.error("Payment", "No payment reference found.");
      return;
    }
    setLoading(true);
    try {
      const verifyRes = await HttpClient.get(
        `/payment/paystack/verify/${reference}`
      );

      const appointmentData = new Date(selectedDate).toISOString();
      if (verifyRes.data.transaction.status === "paid") {
        const bookingPayload = {
          vendorId: vendorData?.id,
          date: appointmentData,
          time: bookingValues?.time || time,
          price: service?.servicePrice,
          serviceName: service?.serviceName,
          serviceId: service?.id,
          totalAmount: service?.servicePrice,
          reference,
          paymentMethod: "PAYSTACK",
        };

        const bookRes = await HttpClient.post(
          "/bookings/bookVendor",
          bookingPayload
        );
        showToast.success(bookRes.data.message);
        navigation.goBack();
      } else {
        showToast.error("Payment verification failed");
      }
      setPaystackModalVisible(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Payment verification or booking failed.";
      showToast.error(message);
    } finally {
      setLoading(false);
      setPaymentReference("");
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
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
          try {
            if (values.paymentMethod === "SHARP-PAY") {
              const reference = `SHARP-PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

              // Convert 12-hour time to 24-hour format
              const convertTo24Hour = (time12h) => {
                const [time, modifier] = time12h.split(/(?=[AP]M)/);
                let [hours, minutes] = time.split(":");
                hours = parseInt(hours);

                if (modifier === "PM" && hours !== 12) {
                  hours += 12;
                } else if (modifier === "AM" && hours === 12) {
                  hours = 0;
                }

                return `${hours.toString().padStart(2, "0")}:${minutes}`;
              };

              const time24Hour = convertTo24Hour(values.time);

              const payload = {
                vendorId: vendorData?.id || id,
                date: new Date(
                  `${selectedDate}T${time24Hour}:00.000Z`
                ).toISOString(),
                time: values.time,
                paymentMethod: values.paymentMethod,
                reference,
                price: service.servicePrice,
                totalAmount: service.servicePrice,
                serviceName: service.serviceName,
                serviceId: service.id,
              };

              // Make the API call directly for SharpPay
              try {
                const res = await HttpClient.post(
                  "/bookings/bookVendor",
                  payload
                );
                showToast.success(res.data.message);
                navigation.goBack();
              } catch (error) {
                if (
                  error.response?.data?.message ===
                  "Insufficient wallet balance"
                ) {
                  showToast.error(error.response.data.message);
                } else {
                  const message =
                    error?.response?.data?.message ||
                    error?.message ||
                    error.response?.message;
                  showToast.error(message);
                }
              }
            } else if (values.paymentMethod === "PAYSTACK") {
              setPendingBookingValues(values); // Save for use after payment
              await checkout(values);
            } else {
            }
          } catch (error) {
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
                <Dropdown
                  placeholder="Select Time"
                  options={timeOptions}
                  label="Select Time"
                  value={values.time}
                  onValueChange={handleChange("time")}
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
          <View style={styles.header}>
            <TouchableOpacity
              className="bg-primary rounded-[4px] py-2 px-4"
              onPress={() => {
                setPaystackModalVisible(false);
                handlePaystackVerificationAndBooking(
                  paymentReference,
                  pendingBookingValues
                );
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
                    handlePaystackVerificationAndBooking(
                      reference,
                      pendingBookingValues
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
