import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Dimensions,
  StatusBar,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import { useFilter } from "../../../context/FilterContext";

const { width, height } = Dimensions.get("window");

export default function FilterScreen({ navigation }) {
  const { filters, applyFilters, resetFilters } = useFilter();
  const [price, setPrice] = useState(filters.price || 200000);
  const [selectedRating, setSelectedRating] = useState(filters.rating || null);
  const [selectedServiceType, setSelectedServiceType] = useState(
    filters.serviceType || null
  );
  const [selectedLocation, setSelectedLocation] = useState(null);
  const webviewRef = useRef(null);

  const serviceTypes = [
    { label: "All Services", value: null },
    { label: "Home Service", value: "HOME_SERVICE" },
    { label: "In-shop", value: "IN_SHOP" },
  ];

  // Function to get current location and send to WebView
  const handleUseCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    webviewRef.current.postMessage(JSON.stringify({ latitude, longitude }));
    setSelectedLocation("Current Location");
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleApplyFilters = () => {
    const newFilters = {
      rating: selectedRating,
      serviceType: selectedServiceType,
      // price: price, // Commented out price filter
    };
    applyFilters(newFilters);
    navigation.goBack();
  };

  const handleResetFilters = () => {
    setPrice(200000);
    setSelectedRating(null);
    setSelectedServiceType(null);
    resetFilters();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFAFD" }}>
      {/* Header */}
      <StatusBar barStyle="light-content" backgroundColor="#EB278D" />
      <View
        style={{
          backgroundColor: "#EB278D",
          paddingTop: 60,
          paddingBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{ color: "#fff", fontSize: 18, fontFamily: "poppinsMedium" }}
          >
            Filter
          </Text>
        </View>
        <TouchableOpacity onPress={handleResetFilters}>
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              fontFamily: "poppinsRegular",
            }}
          >
            Reset
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 16,
          paddingBottom: 80,
          flexGrow: 1,
        }}
      >
        {/* Service Type */}
        <Text style={{ fontSize: 16, fontFamily: "latoBold", marginBottom: 8 }}>
          Service Type
        </Text>
        <View style={{ marginBottom: 20 }}>
          {serviceTypes.map((serviceType) => (
            <TouchableOpacity
              key={serviceType.value}
              onPress={() => setSelectedServiceType(serviceType.value)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor:
                  selectedServiceType === serviceType.value
                    ? "#FCE4F0"
                    : "transparent",
                borderRadius: 8,
                marginBottom: 8,
                borderWidth: 1,
                borderColor:
                  selectedServiceType === serviceType.value
                    ? "#EB278D"
                    : "#E0E0E0",
              }}
            >
              <Text
                style={{
                  color:
                    selectedServiceType === serviceType.value
                      ? "#EB278D"
                      : "#333",
                  fontFamily: "poppinsRegular",
                  fontSize: 14,
                }}
              >
                {serviceType.label}
              </Text>
              {selectedServiceType === serviceType.value && (
                <Ionicons name="checkmark" size={20} color="#EB278D" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Price Range */}
        {/* <Text
          style={{
            fontFamily: "poppinsMedium",
            fontSize: 16,
            color: "#222",
            marginBottom: 12,
          }}
        >
          Price Range
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            maximumValue={1000000}
            step={1000}
            value={price}
            onValueChange={setPrice}
            minimumTrackTintColor="#EB278D"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#EB278D"
          />
        </View> */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Text
            style={{ color: "#B0B0B0", fontFamily: "latoBold", fontSize: 12 }}
          >
            ₦ 0
          </Text>
          <Text
            style={{
              fontFamily: "poppinsRegular",
              fontSize: 14,
              color: "#666",
            }}
          >
            ₦{price.toLocaleString()}
          </Text>
          <Text
            style={{ color: "#B0B0B0", fontFamily: "latoBold", fontSize: 12 }}
          >
            ₦ 1M
          </Text>
        </View> */}

        {/* Ratings */}
        <Text
          className="mt-10"
          style={{ fontSize: 16, fontWeight: "500", marginBottom: 8 }}
        >
          Ratings
        </Text>
        {[5, 4, 3, 2, 1].map((rating) => (
          <View
            key={rating}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < rating ? "star" : "star-outline"}
                  size={24}
                  color={i < rating ? "#FFC107" : "#E0E0E0"}
                />
              ))}
            </View>
            <TouchableOpacity onPress={() => setSelectedRating(rating)}>
              <View
                style={[
                  styles.radio,
                  selectedRating === rating && styles.radioActive,
                ]}
              />
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ flex: 1 }} className="pt-8" />
        {/* Apply Now Button */}
        <AuthButton title="Apply Now" onPress={handleApplyFilters} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    position: "absolute",
    top: 120,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  searchBarBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 3,
    // paddingHorizontal: 12, // icon already has margin
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 12,
    color: "#222",
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingVertical: 8,
    paddingRight: 12,
    fontFamily: "poppinsRegular",
  },
  mapContainer: {
    height: height * 0.4,
  },
  locationOptionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  locationChipActive: {
    backgroundColor: "#EB278D",
    borderColor: "#EB278D",
  },
  locationChipText: {
    color: "#222",
    fontFamily: "poppinsMedium",
    fontSize: 12,
    marginLeft: 4,
  },
  locationChipTextActive: {
    color: "#fff",
    fontFamily: "poppinsMedium",
    fontSize: 12,
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: "#EB278D",
    borderColor: "#EB278D",
  },
  chipText: {
    color: "#222",
    fontWeight: "latoBold",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "latoBold",
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    backgroundColor: "#E0E0E0",
  },
  radioActive: {
    borderColor: "#EB278D",
    backgroundColor: "#EB278D",
  },
  applyBtn: {
    backgroundColor: "#EB278D",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
});
