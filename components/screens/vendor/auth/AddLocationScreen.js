import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

export default function AddLocationScreen({ navigation }) {
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
    navigation.navigate("PhoneNumberVerificationScreen", {
      latitude,
      longitude,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Location</Text>
        <TouchableOpacity onPress={() => navigation.replace("Home")}>
          {" "}
          {/* Replace with your skip logic */}
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#BDBDBD"
          style={styles.searchBar}
        />
      </View>

      {/* Map */}
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

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <ScrollView>
          <TouchableOpacity
            style={styles.locationOption}
            onPress={handleUseCurrentLocation}
          >
            <MaterialIcons name="my-location" size={22} color="#EB278D" />
            <Text style={styles.currentLocationText}>
              Use my current location
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationOption}>
            <MaterialIcons name="location-on" size={22} color="#BDBDBD" />
            <Text style={styles.locationText}>
              Sagamu, Ogun State (24km away from you)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationOption}>
            <MaterialIcons name="location-on" size={22} color="#BDBDBD" />
            <Text style={styles.locationText}>
              Abeokuta, Ogun State (59km away from you)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationOption}>
            <MaterialIcons name="location-on" size={22} color="#BDBDBD" />
            <Text style={styles.locationText}>
              Lekki-Epe, Lagos State (24km away from you)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EB278D",
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#fff",
    fontFamily: "poppinsMedium",
    fontSize: 16,
  },
  skipText: {
    color: "#fff",
    fontFamily: "poppinsRegular",
    fontSize: 10,
  },
  searchBarContainer: {
    position: "absolute",
    top: 90,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  map: {
    width: width,
    height: height * 0.45,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
  },
  locationOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  currentLocationText: {
    color: "#EB278D",
    fontFamily: "poppinsMedium",
    fontSize: 15,
    marginLeft: 10,
  },
  locationText: {
    color: "#222",
    fontFamily: "poppinsRegular",
    fontSize: 15,
    marginLeft: 10,
  },
});
