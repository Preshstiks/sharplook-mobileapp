import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { AuthInput } from "../../../reusuableComponents/inputFields/AuthInput";
import OutlineTextInput from "../../../reusuableComponents/inputFields/OutlineTextInput";
import Dropdown from "../../../reusuableComponents/inputFields/Dropdown";
import { WebView } from "react-native-webview";
import { getCurrentLocation } from "../../../../utils/locationUtils";
import { HttpClient } from "../../../../api/HttpClient";
import { showToast } from "../../../ToastComponent/Toast";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { BarIndicator } from "react-native-indicators";
import { useCategories } from "../../../../hooks/useCategories";
export default function BookingHomeServiceAppointScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const webviewRef = useRef(null);
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayString);
  const [selectedOption, setSelectedOption] = useState("");
  const [servicePicture, setServicePicture] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const service = route.params?.service;
  const { categories, loading: categoriesLoading } = useCategories();

  // Function to create offer
  const createOffer = async (values) => {
    try {
      // Create FormData object
      const formData = new FormData();

      // Add text fields to FormData
      formData.append("serviceName", values.service);
      formData.append("serviceType", values.serviceType);
      formData.append("offerAmount", parseFloat(values.offerAmount).toString());
      formData.append("date", new Date(selectedDate).toISOString());
      formData.append("time", values.time);

      // Add address fields
      if (values.fullAddress) {
        formData.append("fullAddress", values.fullAddress);
      }
      if (values.landMark) {
        formData.append("landMark", values.landMark);
      }

      // Set location data based on service type
      if (values.serviceType === "HOME_SERVICE") {
        // For HOME_SERVICE, use map location or current location
        const latitude =
          selectedLocation?.latitude || currentLocation?.latitude;
        const longitude =
          selectedLocation?.longitude || currentLocation?.longitude;

        if (latitude) formData.append("latitude", Number(latitude));
        if (longitude) formData.append("longitude", Number(longitude));
      } else if (values.serviceType === "IN_SHOP") {
        // For IN_SHOP, use user's preferred location
        if (user?.preferredLatitude)
          formData.append("latitude", Number(user.preferredLatitude));
        if (user?.preferredLongitude)
          formData.append("longitude", Number(user.preferredLongitude));
      }

      // Add image if exists
      if (servicePicture) {
        const imageUri = servicePicture;
        const imageName = imageUri.split("/").pop();
        const imageType = "image/jpeg"; // You might want to detect this dynamically

        formData.append("serviceImage", {
          uri: imageUri,
          type: imageType,
          name: imageName || "service_image.jpg",
        });
      }

      // Log FormData contents as JSON for debugging
      const formDataEntries = [];
      for (let [key, value] of formData.entries()) {
        formDataEntries.push({ key, value });
      }

      // Log payload in a more readable JSON format
      const payloadObject = {};
      for (let [key, value] of formData.entries()) {
        payloadObject[key] = value;
      }
      const response = await HttpClient.post("/offers/createOffer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showToast.success(response.data.message);
      navigation.goBack();

      return response.data;
    } catch (error) {
      console.error("Error creating offer:", error.response);
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || "Failed to create offer";
        showToast.error(errorMessage);
      } else {
        showToast.error("Failed to create offer. Please try again.");
      }
      throw error;
    }
  };
  // Convert categories to dropdown options format
  const SERVICE_OPTIONS = categories.map((category) => ({
    label: category.name,
    value: category.name,
  }));
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
  const SERVICE_TYPE_OPTIONS = [
    {
      label: "In-shop",
      value: "IN_SHOP",
    },
    {
      label: "Home Service",
      value: "HOME_SERVICE",
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
      setServicePicture(result.assets[0].uri);
    }
  };
  const fetchCurrentLocation = async () => {
    if (!currentLocation) return;

    setIsLoading(true);
    try {
      // For offer price screen, we don't need to calculate distance
      // since we're not booking a specific vendor service
      // Just set a default distance or skip the API call
    } catch (error) {
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
      setCurrentLocation(location);
      setSelectedLocation(location);

      webviewRef.current.postMessage(JSON.stringify(location));
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

  // Validation schema for home service booking
  const offerPriceValidationSchema = Yup.object().shape({
    time: Yup.string().required("Time is required"),
    offerAmount: Yup.string().required("Offer amount is required"),
    service: Yup.string().required("Service is required"),
    serviceType: Yup.string().required("Service type is required"),
    fullAddress: Yup.string(),
    landMark: Yup.string(),
  });
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View className="pt-[60px] pb-4 px-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[16px] flex-1 text-center"
          >
            Offer a Price
          </Text>
        </View>
      </View>

      <Formik
        initialValues={{
          time: "",
          fullAddress: "",
          offerAmount: "",
          service: "",
          serviceType: "",
          landMark: "",
          servicePicture: "",
        }}
        validationSchema={offerPriceValidationSchema}
        validate={(values) => {
          const errors = {};

          // Only validate location fields for HOME_SERVICE
          if (values.serviceType === "HOME_SERVICE") {
            if (!values.fullAddress) {
              errors.fullAddress = "Full address is required";
            }
            if (!values.landMark) {
              errors.landMark = "Landmark is required";
            }
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          try {
            await createOffer(values);
          } catch (error) {
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
              <OutlineTextInput
                label="Offer Amount"
                value={values.offerAmount}
                onChangeText={handleChange("offerAmount")}
                name="offerAmount"
              />
              {touched.offerAmount && errors.offerAmount && (
                <Text
                  style={{ color: "#ff0000", fontSize: 12, marginLeft: 12 }}
                >
                  {errors.offerAmount}
                </Text>
              )}
              <Dropdown
                options={SERVICE_OPTIONS}
                placeholder="Select Service"
                label="Select Service"
                value={values.service}
                onValueChange={handleChange("service")}
                name="service"
              />
              {touched.service && errors.service && (
                <Text
                  style={{ color: "#ff0000", fontSize: 12, marginLeft: 12 }}
                >
                  {errors.service}
                </Text>
              )}
              <Dropdown
                options={SERVICE_TYPE_OPTIONS}
                placeholder="Service Type"
                value={values.serviceType}
                onValueChange={handleChange("serviceType")}
                label="Service Type"
              />
              {touched.serviceType && errors.serviceType && (
                <Text
                  style={{ color: "#ff0000", fontSize: 12, marginLeft: 12 }}
                >
                  {errors.serviceType}
                </Text>
              )}
              <View className="mb-4">
                <View className="flex-row items-center border rounded-t-[8px] px-3 border-[#E9E9E9] py-5">
                  <Text
                    className="text-base mb-2"
                    style={{ fontFamily: "poppinsMedium" }}
                  >
                    Upload service picture
                  </Text>
                </View>
                <View className="border-x border-[#E9E9E9] border-b pb-3 rounded-b-[8px] px-3 border-t-0">
                  <TouchableOpacity
                    className="border-2 border-dashed border-[#F9BCDC] rounded-lg h-[140px] items-center justify-center"
                    onPress={() => pickImage()}
                  >
                    {servicePicture ? (
                      <Image
                        source={{ uri: servicePicture }}
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
              {values.serviceType === "HOME_SERVICE" && (
                <View>
                  <Dropdown
                    options={locationOption}
                    placeholder="Select"
                    value={selectedOption}
                    onValueChange={setSelectedOption}
                    label="Are you in the current location you registered with?"
                  />
                  <View className="mb-4">
                    <View className="flex-row items-center border rounded-t-[8px] px-3 border-[#E9E9E9] py-5">
                      <Ionicons
                        name="location-outline"
                        size={24}
                        color="#000"
                      />
                      <Text
                        className="ml-2 text-[16px"
                        style={{ fontFamily: "poppinsMedium" }}
                      >
                        Service Location
                      </Text>
                    </View>

                    <View className="border-x border-[#E9E9E9] border-b rounded-b-[8px] px-3 border-t-0">
                      <AuthInput
                        label="Enter Full Address"
                        value={values.fullAddress}
                        onChangeText={handleChange("fullAddress")}
                        name="fullAddress"
                      />
                      {touched.fullAddress &&
                        errors.fullAddress &&
                        values.serviceType === "HOME_SERVICE" && (
                          <Text
                            style={{
                              color: "#ff0000",
                              fontSize: 12,
                              marginLeft: 12,
                            }}
                          >
                            {errors.fullAddress}
                          </Text>
                        )}
                      <AuthInput
                        label="Enter Landmark"
                        value={values.landMark}
                        onChangeText={handleChange("landMark")}
                        name="landMark"
                      />
                      {touched.landMark &&
                        errors.landMark &&
                        values.serviceType === "HOME_SERVICE" && (
                          <Text
                            style={{
                              color: "#ff0000",
                              fontSize: 12,
                              marginLeft: 12,
                            }}
                          >
                            {errors.landMark}
                          </Text>
                        )}
                    </View>

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
                </View>
              )}
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
                  {loading ? (
                    <BarIndicator color="#fff" size={20} />
                  ) : (
                    "Submit Offer"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
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
