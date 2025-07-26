import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { formatAmount } from "../../formatAmount";
import { DateConverter } from "../../reusuableComponents/DateConverter";

export default function VendorOffersScreen() {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [offers, setOffers] = useState([
    {
      id: 1,
      service: "Hair",
      client: "Sarah Johnson",
      offerAmount: 8000,
      status: "Accepted",
      dateMade: "2025-07-11",
      clientImage: require("../../../assets/icon/avatar.png"),
      serviceType: "In-shop",
      vendor: "Hair by Ire",
      date: "June 15, 2024",
      time: "09:00 AM",
      serviceImage: require("../../../assets/img/product1.jpg"),
      clientPhone: "+234 801 234 5678",
      clientEmail: "sarah.johnson@email.com",
      serviceDescription:
        "Professional hair styling with cornrow braids and twists, including elaborate eye makeup with vibrant purple eyeshadow and gold glitter accents.",
      location: "Lagos, Nigeria",
      duration: "2 hours",
      specialRequests:
        "Please use organic hair products and ensure the style is secure for a long day at work.",
    },
    {
      id: 2,
      service: "Barbing",
      client: "Michael Chen",
      offerAmount: 8000,
      status: "Pending",
      dateMade: "2025-07-11",
      clientImage: require("../../../assets/icon/avatar.png"),
      serviceType: "Home Service",
      vendor: "Sharp Cuts",
      date: "June 18, 2024",
      time: "02:00 PM",
      serviceImage: require("../../../assets/img/product2.jpg"),
      clientPhone: "+234 802 345 6789",
      clientEmail: "michael.chen@email.com",
      serviceDescription:
        "Professional barbing service with modern fade cuts and beard trimming.",
      location: "Abuja, Nigeria",
      duration: "1 hour",
      specialRequests: "Please bring your own sanitized tools.",
    },
    {
      id: 3,
      service: "Facials",
      client: "Emma Wilson",
      offerAmount: 8000,
      status: "Accepted",
      dateMade: "2025-07-11",
      clientImage: require("../../../assets/icon/avatar.png"),
      serviceType: "In-shop",
      vendor: "Glow Beauty",
      date: "June 20, 2024",
      time: "11:00 AM",
      serviceImage: require("../../../assets/img/product3.jpg"),
      clientPhone: "+234 803 456 7890",
      clientEmail: "emma.wilson@email.com",
      serviceDescription:
        "Deep cleansing facial with anti-aging treatment and skin rejuvenation.",
      location: "Port Harcourt, Nigeria",
      duration: "1.5 hours",
      specialRequests:
        "Please use hypoallergenic products as I have sensitive skin.",
    },
    {
      id: 4,
      service: "Barbing",
      client: "David Brown",
      offerAmount: 8000,
      status: "Pending",
      dateMade: "2025-07-11",
      clientImage: require("../../../assets/icon/avatar.png"),
      serviceType: "Home Service",
      vendor: "Elite Barbers",
      date: "June 22, 2024",
      time: "04:00 PM",
      serviceImage: require("../../../assets/img/product4.jpg"),
      clientPhone: "+234 804 567 8901",
      clientEmail: "david.brown@email.com",
      serviceDescription:
        "Premium barbing service with hot towel treatment and styling.",
      location: "Kano, Nigeria",
      duration: "1.5 hours",
      specialRequests:
        "Please include a hot towel treatment and use premium products.",
    },
  ]);

  const filters = ["All", "Accepted", "Pending"];

  const filteredOffers = offers.filter((offer) => {
    if (activeFilter === "All") return true;
    return offer.status === activeFilter;
  });

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
          My Offers
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Ionicons name="notifications-outline" size={22} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View
        className="bg-[#E9E9E980] mt-6 rounded-[8px] py-4 mx-4"
        style={{
          flexDirection: "row",
        }}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={{
              flex: 1,
              paddingVertical: 8,
              paddingHorizontal: 16,
              marginHorizontal: 4,
              borderRadius: 8,
              backgroundColor:
                activeFilter === filter ? "#ED2584" : "transparent",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                fontFamily: "poppinsRegular",
                color: activeFilter === filter ? "#FFFFFF" : "#6B7280",
              }}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Offers List */}
      <ScrollView
        style={{ flex: 1, backgroundColor: "#F9FAFB" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {filteredOffers.map((offer) => (
          <TouchableOpacity
            key={offer.id}
            onPress={() => navigation.navigate("VendorOfferDetails", { offer })}
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "poppinsMedium",
                    color: "#1F2937",
                    marginBottom: 4,
                  }}
                >
                  {offer.service}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "poppinsRegular",
                    color: "#8C8D8B",
                    marginBottom: 4,
                  }}
                >
                  {offer.client}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "poppinsMedium",
                    color: "#ED2584",
                  }}
                >
                  {formatAmount(offer.offerAmount)}
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <View
                  style={{
                    backgroundColor: getStatusBgColor(offer.status),
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: getStatusColor(offer.status),
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "poppinsMedium",
                      color: getStatusColor(offer.status),
                    }}
                  >
                    {offer.status}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "poppinsRegular",
                    color: "#9CA3AF",
                  }}
                >
                  {DateConverter(offer.dateMade)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredOffers.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 100,
            }}
          >
            <Ionicons name="document-outline" size={64} color="#D1D5DB" />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "poppinsMedium",
                color: "#6B7280",
                marginTop: 16,
                textAlign: "center",
              }}
            >
              No {activeFilter.toLowerCase()} offers found
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "poppinsRegular",
                color: "#9CA3AF",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Your offers will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
