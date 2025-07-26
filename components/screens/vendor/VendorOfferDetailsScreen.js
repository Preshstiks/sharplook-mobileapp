import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { formatAmount } from "../../formatAmount";

export default function VendorOfferDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { offer } = route.params || {};

  // Use passed offer data or fallback to mock data
  const offerDetails = offer || {
    id: 1,
    serviceType: "In-shop",
    amountOffered: 8000,
    vendor: "Hair by Ire",
    service: "Hair",
    status: "Accepted",
    date: "June 15, 2024",
    time: "09:00 AM",
    clientImage: require("../../../assets/icon/avatar.png"),
    serviceImage: require("../../../assets/img/product1.jpg"),
    clientName: "Sarah Johnson",
    clientPhone: "+234 801 234 5678",
    clientEmail: "sarah.johnson@email.com",
    serviceDescription:
      "Professional hair styling with cornrow braids and twists, including elaborate eye makeup with vibrant purple eyeshadow and gold glitter accents.",
    location: "Lagos, Nigeria",
    duration: "2 hours",
    specialRequests:
      "Please use organic hair products and ensure the style is secure for a long day at work.",
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#ED2584";
      case "Pending":
        return "#8C8D8B";
      default:
        return "#9CA3AF";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#FDF2F8";
      case "Pending":
        return "#E9E9E9";
      default:
        return "#F3F4F6";
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 60,
          paddingBottom: 20,
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "#F3F4F6",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1F2937" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 14,
            fontFamily: "poppinsMedium",
            color: "#1F2937",
          }}
        >
          Offer Details
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Ionicons name="notifications-outline" size={22} color="#1F2937" />
          </TouchableOpacity>
          <Image
            source={require("../../../assets/icon/avatar.png")}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              resizeMode: "cover",
            }}
          />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1, backgroundColor: "#F9FAFB" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Service Type & Amount Offered */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginHorizontal: 16,
            marginTop: 16,
            borderRadius: 12,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginBottom: 4,
                }}
              >
                Service Type
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "poppinsMedium",
                  color: "#1F2937",
                }}
              >
                {offerDetails.serviceType}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginBottom: 4,
                }}
              >
                Amount Offered
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "poppinsMedium",
                  color: "#ED2584",
                }}
              >
                {formatAmount(offerDetails.amountOffered)}
              </Text>
            </View>
          </View>
        </View>

        {/* Vendor Information */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginHorizontal: 16,
            marginTop: 12,
            borderRadius: 12,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginBottom: 4,
                }}
              >
                Vendor
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "poppinsMedium",
                  color: "#1F2937",
                }}
              >
                {offerDetails.vendor}
              </Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#3B82F6",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "poppinsMedium",
                  color: "#FFFFFF",
                }}
              >
                VIPER
              </Text>
            </View>
          </View>
        </View>

        {/* Service Details & Status */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginHorizontal: 16,
            marginTop: 12,
            borderRadius: 12,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginBottom: 4,
                }}
              >
                Service
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "poppinsMedium",
                  color: "#1F2937",
                }}
              >
                {offerDetails.service}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginBottom: 4,
                }}
              >
                Status
              </Text>
              <View
                style={{
                  backgroundColor: getStatusBgColor(offerDetails.status),
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: getStatusColor(offerDetails.status),
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "poppinsMedium",
                    color: getStatusColor(offerDetails.status),
                  }}
                >
                  {offerDetails.status}
                </Text>
              </View>
            </View>
          </View>

          {/* Service Image */}
          <Image
            source={offerDetails.serviceImage}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 8,
              marginBottom: 16,
              resizeMode: "cover",
            }}
          />

          {/* Date and Time */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="calendar-outline" size={16} color="#8C8D8B" />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginLeft: 4,
                }}
              >
                Date: {offerDetails.date}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="time-outline" size={16} color="#8C8D8B" />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginLeft: 4,
                }}
              >
                Time: {offerDetails.time}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          flexDirection: "row",
          gap: 12,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#9CA3AF",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "poppinsMedium",
              color: "#FFFFFF",
            }}
          >
            Tip More
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ED2584",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "poppinsMedium",
              color: "#ED2584",
            }}
          >
            Cancel Offer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
