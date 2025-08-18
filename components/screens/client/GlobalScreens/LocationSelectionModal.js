import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import PageModal from "../../../reusuableComponents/PageModal";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { HttpClient } from "../../../../api/HttpClient";
import { showToast } from "../../../ToastComponent/Toast";
import { getCurrentLocation } from "../../../../utils/locationUtils";
import { formatAmount } from "../../../formatAmount";
import WebView from "react-native-webview";
import { useAuth } from "../../../../context/AuthContext";

export default function LocationSelectionModal({
  visible,
  onClose,
  subtotal,
  onLocationSelected,
  user,
  vendorIds,
  cartItemsByVendor,
}) {
  const { user: authUser } = useAuth();
  const [locationOption, setLocationOption] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [transportFees, setTransportFees] = useState({});
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [totalTransportCost, setTotalTransportCost] = useState(0);
  const webviewRef = useRef(null);

  // Use authUser if available, otherwise fall back to user prop
  const currentUser = authUser || user;

  // Calculate total delivery fee from backend response
  const totalDelivery = totalTransportCost;
  const total = subtotal + totalDelivery;

  const locationOptions = [
    { label: "Use Current Location", value: "current" },
    { label: "Use Registered Location", value: "registered" },
  ];

  const fetchTransportFeesForAllVendors = async (location) => {
    setIsLocationLoading(true);

    try {
      const payload = {
        clientLat: location.latitude,
        clientLng: location.longitude,
        vendorIds: vendorIds,
      };

      const response = await HttpClient.post("/distance/calcDistance", payload);

      if (response.data && response.data.breakdown) {
        const transportFeesFromBreakdown = {};
        response.data.breakdown.forEach((item) => {
          transportFeesFromBreakdown[item.vendorId] = item.transportPrice;
        });

        setTransportFees(transportFeesFromBreakdown);

        // Make sure we're using the correct value and parsing it properly
        const totalCost = parseInt(response.data.totalTransportCost) || 0;
        setTotalTransportCost(totalCost);
      } else {
        const defaultFees = {};
        vendorIds.forEach((vendorId) => {
          defaultFees[vendorId] = 0;
        });
        setTransportFees(defaultFees);
        setTotalTransportCost(0);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || "An unknown error occurred";
        showToast.error(errorMessage);
      }

      const defaultFees = {};
      vendorIds.forEach((vendorId) => {
        defaultFees[vendorId] = 0;
      });
      setTransportFees(defaultFees);
      setTotalTransportCost(0);
    } finally {
      setIsLocationLoading(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    setIsLocationLoading(true);
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      setSelectedLocation(location);

      if (webviewRef.current) {
        webviewRef.current.postMessage(JSON.stringify(location));
      }
      await fetchTransportFeesForAllVendors(location);
    } catch (error) {
      console.error("Error getting current location:", error);
      showToast.error("Failed to get current location");
    } finally {
      setIsLocationLoading(false);
    }
  };

  const handleLocationOptionChange = async (option) => {
    setLocationOption(option);

    if (option === "current") {
      await handleUseCurrentLocation();
    } else if (option === "registered") {
      if (
        currentUser &&
        currentUser?.preferredLatitude &&
        currentUser?.preferredLongitude
      ) {
        const registeredLocation = {
          latitude: parseFloat(currentUser.preferredLatitude),
          longitude: parseFloat(currentUser.preferredLongitude),
        };

        setCurrentLocation(registeredLocation);
        setSelectedLocation(registeredLocation);

        await fetchTransportFeesForAllVendors(registeredLocation);
      } else {
        showToast.error("No registered location found");
      }
    }
  };

  const handleProceed = () => {
    if (!locationOption) {
      showToast.error("Please select a delivery location");
      return;
    }

    const dataToSend = {
      option: locationOption,
      currentLocation,
      transportFees,
      delivery: totalTransportCost, // Use totalTransportCost directly
      total: subtotal + totalTransportCost, // Calculate fresh total
    };

    onLocationSelected(dataToSend);
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
              Select Delivery Location
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#201E1F" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Location Options */}
          <View className="mb-6">
            <Text
              style={{ fontFamily: "poppinsMedium" }}
              className="text-[16px] text-faintDark mb-3"
            >
              Delivery Location
            </Text>

            <View className="bg-gray-50 rounded-lg p-3 mb-3">
              {locationOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleLocationOptionChange(option.value)}
                  className={`flex-row items-center p-3 rounded-lg mb-2 ${
                    locationOption === option.value
                      ? "bg-primary/10 border border-primary"
                      : "bg-white border border-[#F9BCDC]"
                  }`}
                >
                  <View
                    className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                      locationOption === option.value
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {locationOption === option.value && (
                      <View className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </View>
                  <View className="flex-1">
                    <Text
                      style={{ fontFamily: "poppinsMedium" }}
                      className="text-[16px] text-faintDark"
                    >
                      {option.label}
                    </Text>
                    {option.value === "current" &&
                      locationOption === "current" && (
                        <Text
                          style={{ fontFamily: "poppinsRegular" }}
                          className="text-[14px] text-gray-500 mt-1"
                        >
                          Using your current GPS location
                        </Text>
                      )}
                    {option.value === "registered" &&
                      locationOption === "registered" && (
                        <Text
                          style={{ fontFamily: "poppinsRegular" }}
                          className="text-[14px] text-gray-500 mt-1"
                        >
                          Using your registered location
                        </Text>
                      )}
                  </View>
                  {locationOption === option.value && isLocationLoading && (
                    <ActivityIndicator size="small" color="#EB278D" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Current Location Button - Only show when current location is selected */}
            {locationOption === "current" && (
              <View className="mb-3">
                <TouchableOpacity
                  onPress={handleUseCurrentLocation}
                  disabled={isLocationLoading}
                  className="flex-row items-center bg-primary/10 border border-primary rounded-lg p-3"
                >
                  <MaterialIcons name="my-location" size={20} color="#EB278D" />
                  <Text
                    style={{ fontFamily: "poppinsMedium" }}
                    className="text-[16px] text-primary ml-2 flex-1"
                  >
                    {isLocationLoading
                      ? "Updating location..."
                      : "Mark your current location"}
                  </Text>
                  {isLocationLoading && (
                    <ActivityIndicator size="small" color="#EB278D" />
                  )}
                </TouchableOpacity>
              </View>
            )}

            {/* Map Container - Only show when current location is selected */}
            {locationOption === "current" && (
              <View
                style={{
                  height: 200,
                  marginBottom: 16,
                  borderRadius: 12,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#E9E9E9",
                }}
              >
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
                            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                              subdomains: 'abcd',
                              maxZoom: 19
                            }).addTo(map);
                            var marker = L.marker([6.5244, 3.3792]).addTo(map)
                              .bindPopup('You are here')
                              .openPopup();

                            // Function to get location name from coordinates
                            function getLocationName(lat, lng) {
                              fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng + '&zoom=18&addressdetails=1')
                                .then(function(response) { 
                                  if (response.ok) {
                                    return response.json(); 
                                  }
                                  throw new Error('Network response was not ok');
                                })
                                .then(function(data) {
                                  if (data.display_name) {
                                    marker.bindPopup(data.display_name).openPopup();
                                  } else {
                                    marker.bindPopup('You are here').openPopup();
                                  }
                                })
                                .catch(function(error) { 
                                  console.log('Geocoding error:', error);
                                  marker.bindPopup('You are here').openPopup();
                                });
                            }

                            function updateMap(data) {
                              if (data.latitude && data.longitude) {
                                map.setView([data.latitude, data.longitude], 16);
                                marker.setLatLng([data.latitude, data.longitude]);
                                getLocationName(data.latitude, data.longitude);
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
            )}
          </View>
        </ScrollView>

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
              {locationOption ? formatAmount(totalDelivery) : "₦0"}
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
              ₦ {total.toLocaleString()}
            </Text>
          </View>

          <AuthButton
            title="Proceed"
            onPress={handleProceed}
            disabled={!locationOption || isLocationLoading}
          />
        </View>
      </SafeAreaView>
    </PageModal>
  );
}
