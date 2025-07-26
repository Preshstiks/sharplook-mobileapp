import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { AuthInput } from "../../../reusuableComponents/inputFields/AuthInput";
import { formatAmount } from "../../../formatAmount";
import { OutlineTextAreaInput } from "../../../reusuableComponents/inputFields/OutlineTextInput";
import Dropdown from "../../../reusuableComponents/inputFields/Dropdown";
import { WebView } from "react-native-webview";
import { getCurrentLocation } from "../../../../utils/locationUtils";
import { HttpClient } from "../../../../api/HttpClient";
import { showToast } from "../../../ToastComponent/Toast";
import { calculatePrice } from "../../../reusuableComponents/PriceKmCalculator";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
export default function BookingHomeServiceAppointScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const webviewRef = useRef(null);
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayString);
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [specialInstruction, setSpecialInstruction] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [referencePhoto, setReferencePhoto] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [distanceApart, setDistanceApart] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paystackModalVisible, setPaystackModalVisible] = useState(false);
  const [paystackPaymentUrl, setPaystackPaymentUrl] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [pendingBookingValues, setPendingBookingValues] = useState({});
  const service = route.params?.service;
  console.log({ user });
  const locationOption = [
    {
      label: "No",
      value: "No",
    },
    {
      label: "Yes",
      value: "Yes",
    },
  ];
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setReferencePhoto(result.assets[0].uri);
    }
  };
  const fetchCurrentLocation = async () => {
    if (!currentLocation || !selectedLocation) return;

    setIsLoading(true);
    try {
      const payload = {
        clientLat: currentLocation.latitude,
        clientLng: currentLocation.longitude,
        vendorLat: selectedLocation.latitude,
        vendorLng: selectedLocation.longitude,
      };
      console.log(payload);
      const response = await HttpClient.post("/distance/calcDistance", payload);
      console.log("API response:", response.data);
      setDistanceApart(response.data.distanceKm);
    } catch (error) {
      console.error("API error:", error);
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || "An unknown error occurred";
        showToast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await getCurrentLocation();
        setCurrentLocation(location);
        setSelectedLocation(location); // Select current location by default

        // Update map with current location
        if (webviewRef.current) {
          webviewRef.current.postMessage(JSON.stringify(location));
        }
        fetchCurrentLocation();
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage =
            error.response.data.message || "An unknown error occurred";
          showToast.error(errorMessage);
        }
      }
    };
    getLocation();
  }, []);

  // Function to get current location and send to WebView
  const handleUseCurrentLocation = async () => {
    setIsLoading(true);
    try {
      const location = await getCurrentLocation();
      console.log("handleUseCurrentLocation - got location:", location);
      setCurrentLocation(location);
      setSelectedLocation(location);

      webviewRef.current.postMessage(JSON.stringify(location));
      fetchCurrentLocation();
      console.log("handleUseCurrentLocation - sent to WebView:", location);
    } catch (error) {
      console.error("handleUseCurrentLocation error:", error);
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || "An unknown error occurred";
        showToast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log(currentLocation);
  console.log(selectedOption);
  console.log({ service });

  const handleBookNow = async (
    values,
    paymentReference,
    paymentMethod = "SHARP-PAY"
  ) => {
    console.log("[DEBUG] handleBookNow called with values:", values);
    console.log("[DEBUG] referencePhoto:", referencePhoto);

    try {
      const payload = {
        clientId: user.id,
        vendorId: service.userId,
        serviceId: service.id,
        serviceName: service.serviceName,
        paymentMethod: paymentMethod,
        price: service.servicePrice,
        totalAmount: service.servicePrice + calculatePrice(distanceApart),
        date: selectedDate, // Add this missing field
        time: values.time,
        reference: paymentReference,
        serviceType: "HOME_SERVICE",
        fullAddress: values.fullAddress,
        landmark: values.landmark,
        serviceLocation: values.serviceLocation,
        specialInstruction: values.specialInstruction,
      };

      // Handle reference photo if present
      if (referencePhoto) {
        console.log("[DEBUG] Uploading with photo:", referencePhoto);

        const formData = new FormData();

        // Add all payload fields to FormData
        Object.keys(payload).forEach((key) => {
          formData.append(key, payload[key]);
        });

        // Add the image file
        const filename = referencePhoto.split("/").pop();
        const match = /\.(\w+)$/.exec(filename ?? "");
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        formData.append("referencePhoto", {
          uri: referencePhoto,
          name: filename || "image.jpg",
          type,
        });

        console.log("[DEBUG] FormData created with photo");

        const res = await HttpClient.post(
          "/bookings/createHomeServiceBooking",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        showToast.success(res.data.message);
        console.log("[DEBUG] handleBookNow response with photo:", res.data);
        navigation.goBack();
      } else {
        console.log("[DEBUG] Booking without photo");
        // No photo, use JSON payload
        const res = await HttpClient.post(
          "/bookings/createHomeServiceBooking",
          payload
        );
        showToast.success(res.data.message);
        console.log("[DEBUG] handleBookNow response:", res.data);
        navigation.goBack();
      }
    } catch (error) {
      if (error.response?.data?.message === "Insufficient wallet balance") {
        showToast.error(error.response.data.message);
      } else {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Booking failed. Please try again.";
        showToast.error(message);
      }
      console.log("[DEBUG] handleBookNow error:", error?.response || error);
    }
  };
  console.log({ service });
  const checkout = async (values) => {
    console.log("[DEBUG] checkout called with values:", values);
    try {
      const res = await HttpClient.post("/payment/paystack/initiate", {
        paymentFor: "BOOKING",
        description: "Payment for Home Service Booking",
        amount: service.servicePrice + calculatePrice(distanceApart),
      });
      setPaystackPaymentUrl(res.data.paymentUrl);
      setPaymentReference(res.data.reference);
      setPaystackModalVisible(true);
    } catch (error) {
      console.log("[DEBUG] checkout error:", error?.response || error);
    }
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
      console.log("[DEBUG] Paystack verify response:", verifyRes.data);

      if (verifyRes.data.transaction.status === "paid") {
        await handleBookNow(bookingValues, reference, "PAYSTACK");
      } else {
        showToast.error("Payment verification failed");
      }
      setPaystackModalVisible(false);
    } catch (error) {
      console.log(error.response);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Payment verification or booking failed.";
      showToast.error(message);

      console.log(
        "[DEBUG] handlePaystackVerificationAndBooking error:",
        error?.response || error
      );
    } finally {
      setLoading(false);
      setPaymentReference("");
    }
  };
  // Validation schema for home service booking
  const homeServiceValidationSchema = Yup.object().shape({
    time: Yup.string().required("Time is required"),
    paymentMethod: Yup.string().required("Select a payment method"),
  });
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
        initialValues={{
          time: "",
          paymentMethod: "",
          fullAddress: "",
          landmark: "",
          specialInstruction: "",
          referencePhoto: "",
          serviceLocation: "",
        }}
        validationSchema={homeServiceValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          try {
            if (values.paymentMethod === "SHARP-PAY") {
              const reference = `SHARP-PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
              await handleBookNow(values, reference, "SHARP-PAY");
            } else if (values.paymentMethod === "PAYSTACK") {
              setPendingBookingValues(values);
              await checkout(values);
            } else {
              console.log("[DEBUG] No payment method selected.");
            }
          } catch (error) {
            console.log("[DEBUG] onSubmit error:", error);
          } finally {
            setLoading(false);
            setSubmitting(false);
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

              <View className="mb-5">
                <Dropdown
                  options={timeOptions}
                  placeholder="Select Time"
                  value={values.time}
                  onValueChange={(value) => setFieldValue("time", value)}
                  label="Select Time"
                />

                {touched.time && errors.time && (
                  <Text style={{ color: "#ff0000", fontSize: 12 }}>
                    {errors.time}
                  </Text>
                )}
              </View>

              {/* Service Location */}
              <View className="mb-4">
                <View className="flex-row items-center border rounded-t-[8px] px-3 border-[#E9E9E9] py-5">
                  <Ionicons name="location-outline" size={24} color="#000" />
                  <Text
                    className="ml-2 text-[16px"
                    style={{ fontFamily: "poppinsMedium" }}
                  >
                    Service Location
                  </Text>
                </View>

                <View className="border-x border-[#E9E9E9] border-b rounded-b-[8px] px-3 border-t-0">
                  <AuthInput
                    label="Service Location"
                    value={values.serviceLocation}
                    onChangeText={handleChange("serviceLocation")}
                    name="serviceLocation"
                  />
                  <AuthInput
                    label="Enter Full Address"
                    value={values.fullAddress}
                    onChangeText={handleChange("fullAddress")}
                    name="fullAddress"
                  />
                  <AuthInput
                    label="Enter Landmark"
                    value={values.landmark}
                    onChangeText={handleChange("landmark")}
                    name="landmark"
                  />
                </View>

                <Dropdown
                  options={locationOption}
                  placeholder="Select"
                  value={selectedOption}
                  onValueChange={setSelectedOption}
                  label="Are you in the current location you registered with?"
                />

                {/* Map Container - Using the working pattern */}
                {selectedOption === "No" && (
                  <>
                    <View
                      style={{
                        height: 300,
                        marginVertical: 16,
                        borderRadius: 12,
                        overflow: "hidden",
                        borderWidth: 1,
                        borderColor: "#E9E9E9",
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <WebView
                          ref={webviewRef}
                          originWhitelist={["*"]}
                          source={{
                            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
            <style>
              html, body, #map { height: 100%; margin: 0; padding: 0; }
            </style>
          </head>
          <body>
            <div id="map"></div>
            <script>
              var map = L.map('map').setView([6.5244, 3.3792], 13);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
              }).addTo(map);
              var marker = L.marker([6.5244, 3.3792]).addTo(map)
                .bindPopup('You are here')
                .openPopup();

              function updateMap(data) {
                if (data.latitude && data.longitude) {
                  map.setView([data.latitude, data.longitude], 16);
                  marker.setLatLng([data.latitude, data.longitude]);
                  marker.bindPopup('You are here').openPopup();
                }
              }

              // Android
              document.addEventListener('message', function(event) {
                try {
                  var data = JSON.parse(event.data);
                  updateMap(data);
                } catch (e) {}
              });

              // iOS
              window.addEventListener('message', function(event) {
                try {
                  var data = JSON.parse(event.data);
                  updateMap(data);
                } catch (e) {}
              });
            </script>
          </body>
        </html>
      `,
                          }}
                          style={{ flex: 1 }}
                          javaScriptEnabled
                          domStorageEnabled
                        />
                      </View>
                    </View>
                    <View className="mb-4">
                      <TouchableOpacity
                        style={[
                          {
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 18,
                          },
                          selectedLocation && {
                            backgroundColor: "#F8F8F8",
                            borderRadius: 8,
                            padding: 8,
                          },
                        ]}
                        onPress={() => handleUseCurrentLocation()}
                        disabled={isLoading}
                      >
                        <MaterialIcons
                          name="my-location"
                          size={22}
                          color="#EB278D"
                        />
                        <Text
                          style={{
                            color: "#EB278D",
                            fontFamily: "poppinsMedium",
                            fontSize: 15,
                            marginLeft: 10,
                          }}
                        >
                          {isLoading
                            ? "Updating..."
                            : "Mark your current location"}
                        </Text>
                        {isLoading && (
                          <ActivityIndicator
                            size="small"
                            color="#EB278D"
                            style={{ marginLeft: 10 }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {/* Current Location Button - Using the working pattern */}
              </View>

              {/* Reference Photo */}
              <View className="mb-4">
                <View className="flex-row items-center border rounded-t-[8px] px-3 border-[#E9E9E9] py-5">
                  <Text
                    className="text-base mb-2"
                    style={{ fontFamily: "poppinsMedium" }}
                  >
                    Reference Photo (Optional)
                  </Text>
                </View>
                <View className="border-x border-[#E9E9E9] border-b pb-3 rounded-b-[8px] px-3 border-t-0">
                  <TouchableOpacity
                    className="border-2 border-dashed border-[#F9BCDC] rounded-lg h-[140px] items-center justify-center"
                    onPress={() => pickImage()}
                  >
                    {referencePhoto ? (
                      <Image
                        source={{ uri: referencePhoto }}
                        className="w-full h-full rounded-lg"
                      />
                    ) : (
                      <View className="items-center justify-center">
                        <AntDesign name="picture" size={40} color="#8C8D8B" />
                        <Text
                          className="text-[#8C8D8B] text-[12px] mt-2"
                          style={{ fontFamily: "poppinsRegular" }}
                        >
                          Click to upload
                        </Text>
                        <Text
                          style={{ fontFamily: "poppinsRegular" }}
                          className="text-[#8C8D8B] text-[10px]"
                        >
                          PNG, JPG, GIF up to 5MB
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Special Instruction */}
              <View className="rounded-xl mb-4">
                <View className="flex-row items-center border rounded-t-[8px] px-3 border-[#E9E9E9] py-5">
                  <Text
                    className="text-base mb-2"
                    style={{ fontFamily: "poppinsMedium" }}
                  >
                    Special Instruction (Optional)
                  </Text>
                </View>
                <View className="border-x border-[#E9E9E9] border-b rounded-b-[8px] p-3 border-t-0">
                  <OutlineTextAreaInput
                    placeholder="Type here"
                    value={values.specialInstruction}
                    onChangeText={handleChange("specialInstruction")}
                    name="specialInstruction"
                  />
                </View>
              </View>

              {/* Distance Info */}
              <View className="bg-[#E9E9E9] pl-4 rounded-xl h-[60px] flex-row items-center mb-2">
                <Ionicons name="alert-circle-outline" size={14} color="#000" />
                <Text
                  className="ml-2 text-[11px] text-[#000]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  ₦5,000 for first 5km,{" "}
                  <Text
                    className="text-[#ee9002]"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    extra charges apply for longer distances.
                  </Text>
                </Text>
              </View>
              <View className="mb-5 mt-4">
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
                  <Text style={{ color: "#ff0000", fontSize: 12 }}>
                    {errors.paymentMethod}
                  </Text>
                )}
              </View>
              {/* Charges */}
              <View className="mb-2 mt-10">
                <View className="flex-row justify-between items-center mb-3">
                  <Text
                    className="text-[#A5A5A5] text-[12px]"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    Service Charge
                  </Text>
                  <Text
                    className="text-primary text-[16px]"
                    style={{ fontFamily: "poppinsMedium" }}
                  >
                    {formatAmount(service?.servicePrice)}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center mb-1">
                  <Text
                    className="text-[#A5A5A5] text-[12px]"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    Home Service Charge
                  </Text>
                  <Text
                    className="text-primary text-[16px]"
                    style={{ fontFamily: "poppinsMedium" }}
                  >
                    {formatAmount(calculatePrice(distanceApart))}
                  </Text>
                </View>
              </View>

              {/* Payment Method Radio */}

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
                  {formatAmount(
                    service?.servicePrice + calculatePrice(distanceApart)
                  )}
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
