import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { AuthInput } from "../../reusuableComponents/inputFields/AuthInput";
import { formatAmount } from "../../formatAmount";
import { OutlineTextAreaInput } from "../../reusuableComponents/inputFields/OutlineTextInput";
import Dropdown from "../../reusuableComponents/inputFields/Dropdown";
import { WebView } from "react-native-webview";
import {
  calculateDistance,
  formatDistance,
  getCurrentLocation,
} from "../../../utils/locationUtils";
import { HttpClient } from "../../../api/HttpClient";
import { showToast } from "../../ToastComponent/Toast";

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
  const [referencePhoto, setReferencePhoto] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const service = route.params?.service;

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
      const response = await HttpClient.put("/distance/calcDistance", payload);
      console.log("API response:", response.data);
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
                    direction === "left" ? "chevron-back" : "chevron-forward"
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
            <AuthInput
              label="Enter Time"
              name="time"
              value={time}
              onChangeText={setTime}
            />
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
                label="Enter Full Address"
                value={address}
                onChangeText={setAddress}
                name="address"
              />
              <AuthInput
                label="Enter Landmark"
                value={landmark}
                onChangeText={setLandmark}
                name="landmark"
              />
            </View>

            <Dropdown
              options={locationOption}
              value={selectedOption}
              onValueChange={setSelectedOption}
              label="Are you in the current location you registered with?"
            />

            {/* Map Container - Using the working pattern */}
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

            {/* Current Location Button - Using the working pattern */}
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
                onPress={handleUseCurrentLocation}
                disabled={isLoading}
              >
                <MaterialIcons name="my-location" size={22} color="#EB278D" />
                <Text
                  style={{
                    color: "#EB278D",
                    fontFamily: "poppinsMedium",
                    fontSize: 15,
                    marginLeft: 10,
                  }}
                >
                  {isLoading ? "Updating..." : "Use my current location"}
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
                onPress={() => {}}
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
                value={specialInstruction}
                onChangeText={setSpecialInstruction}
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
                {/* {formatAmount(serviceCharge)} */}
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
                {/* {formatAmount(homeServiceCharge)} */}
              </Text>
            </View>
            <View className="flex-row justify-between items-center border-t border-[#0000001A] pb-3 pt-6 mt-4">
              <Text
                className="text-[16px]"
                style={{ fontFamily: "poppinsMedium" }}
              >
                Total Payment
              </Text>
              <Text
                className="text-primary text-[16px]"
                style={{ fontFamily: "poppinsMedium" }}
              >
                {/* {formatAmount(totalPayment)} */}
              </Text>
            </View>
          </View>
        </View>

        {/* Proceed to Payment Button */}
        <View className="px-4 mt-4">
          <TouchableOpacity
            className="bg-primary rounded-xl py-4 items-center"
            onPress={() => navigation.navigate("DebitCardScreen")}
          >
            <Text
              className="text-white text-base font-semibold"
              style={{ fontFamily: "poppinsMedium" }}
            >
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
