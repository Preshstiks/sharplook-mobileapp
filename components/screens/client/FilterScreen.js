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
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";

const { width, height } = Dimensions.get("window");

export default function FilterScreen({ navigation }) {
  const [price, setPrice] = useState(200000);
  const [selectedRating, setSelectedRating] = useState(5);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const webviewRef = useRef(null);

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

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFAFD" }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: "#EB278D",
          paddingTop: 50,
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
            style={{ color: "#fff", fontSize: 16, fontFamily: "poppinsMedium" }}
          >
            Filter
          </Text>
        </View>
        {/* Invisible spacer to balance the arrow */}
        <View style={{ width: 28 }} />
      </View>

      {/* Search Bar */}
      <View className="px-4 absolute top-[110px] z-50 left-1 right-1">
        <View style={styles.searchBarBox}>
          <Feather
            name="search"
            size={22}
            color="#BDBDBD"
            style={{ marginLeft: 12, marginRight: 8 }}
          />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#BDBDBD"
            style={styles.searchBarInput}
          />
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
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

      {/* Location Options */}
      <View style={styles.locationOptionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.locationChip,
              selectedLocation === "Current Location" &&
                styles.locationChipActive,
            ]}
            onPress={handleUseCurrentLocation}
          >
            <MaterialIcons
              name="my-location"
              size={16}
              color={
                selectedLocation === "Current Location" ? "#fff" : "#EB278D"
              }
            />
            <Text
              style={[
                styles.locationChipText,
                selectedLocation === "Current Location" &&
                  styles.locationChipTextActive,
              ]}
            >
              Current Location
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.locationChip,
              selectedLocation === "Sagamu" && styles.locationChipActive,
            ]}
            onPress={() => handleLocationSelect("Sagamu")}
          >
            <MaterialIcons
              name="location-on"
              size={16}
              color={selectedLocation === "Sagamu" ? "#fff" : "#BDBDBD"}
            />
            <Text
              style={[
                styles.locationChipText,
                selectedLocation === "Sagamu" && styles.locationChipTextActive,
              ]}
            >
              Sagamu (24km)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.locationChip,
              selectedLocation === "Abeokuta" && styles.locationChipActive,
            ]}
            onPress={() => handleLocationSelect("Abeokuta")}
          >
            <MaterialIcons
              name="location-on"
              size={16}
              color={selectedLocation === "Abeokuta" ? "#fff" : "#BDBDBD"}
            />
            <Text
              style={[
                styles.locationChipText,
                selectedLocation === "Abeokuta" &&
                  styles.locationChipTextActive,
              ]}
            >
              Abeokuta (59km)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.locationChip,
              selectedLocation === "Lekki-Epe" && styles.locationChipActive,
            ]}
            onPress={() => handleLocationSelect("Lekki-Epe")}
          >
            <MaterialIcons
              name="location-on"
              size={16}
              color={selectedLocation === "Lekki-Epe" ? "#fff" : "#BDBDBD"}
            />
            <Text
              style={[
                styles.locationChipText,
                selectedLocation === "Lekki-Epe" &&
                  styles.locationChipTextActive,
              ]}
            >
              Lekki-Epe (24km)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 16,
          paddingBottom: 80,
          flexGrow: 1,
        }}
      >
        {/* Price Range */}
        <Text style={{ fontSize: 16, fontFamily: "latoBold", marginBottom: 8 }}>
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
        </View>
        <View
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
          <Text style={{ color: "#000", fontFamily: "latoBold", fontSize: 12 }}>
            ₦ {price.toLocaleString()}
          </Text>
          <Text
            style={{ color: "#B0B0B0", fontFamily: "latoBold", fontSize: 12 }}
          >
            ₦ 1M
          </Text>
        </View>

        {/* Ratings */}
        <Text
          className="mt-10"
          style={{ fontSize: 16, fontWeight: "500", marginBottom: 8 }}
        >
          Ratings
        </Text>
        {[5, 4, 3, 2].map((rating) => (
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
        <AuthButton title="Apply Now" />
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
