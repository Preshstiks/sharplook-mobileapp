import React, { useState, useCallback, useEffect } from "react";
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
import { formatAmount } from "../../../formatAmount";
import { DateConverter } from "../../../reusuableComponents/DateConverter";
import { HttpClient } from "../../../../api/HttpClient";
import { EmptyData } from "../../../reusuableComponents/EmptyData";
import { OffersListSkeleton } from "../../../reusuableComponents/SkeletonLoader";

export default function ClientOffersScreen() {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState("My Offers");
  const [offers, setOffers] = useState([]);
  const [acceptedOffers, setAcceptedOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await HttpClient.get("/offers/myOffers");
      setOffers(response.data.offers || []);
    } catch (err) {
      console.error("Error fetching offers:", err);
      setError("Failed to fetch offers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAcceptedOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      // Get all my offers and filter for accepted ones
      const response = await HttpClient.get("/offers/myOffers");
      const allOffers = response.data.offers || [];
      console.log({ allOffers });
      const acceptedOffersData = allOffers.filter((offer) => {
        // Check if offer has vendor offers and any of them has isAccepted: false
        return (
          offer.vendorOffers &&
          offer.status === "PENDING" &&
          offer.vendorOffers.length > 0 &&
          offer.vendorOffers.some(
            (vendorOffer) => vendorOffer.isAccepted === true
          )
        );
      });
      setAcceptedOffers(acceptedOffersData);
    } catch (err) {
      console.error("Error fetching accepted offers:", err);
      setError("Failed to fetch accepted offers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (activeFilter === "My Offers") {
        fetchOffers();
      } else {
        fetchAcceptedOffers();
      }
    }, [activeFilter])
  );

  const filters = ["My Offers", "Accepted Offers"];

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "#ED2584";
      case "PENDING":
        return "#D97706";
      case "SELECTED":
        return "#10B981";
      case "CANCELLED":
        return "#ff0000";
      default:
        return "#9CA3AF";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "#FDF2F8";
      case "PENDING":
        return "#d977062b";
      case "SELECTED":
        return "#D1FAE5";
      case "CANCELLED":
        return "#ff00002b";
      default:
        return "#F3F4F6";
    }
  };

  const getDisplayStatus = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "Accepted";
      case "PENDING":
        return "Pending";
      case "SELECTED":
        return "Selected";
      case "CANCELLED":
        return "Cancelled";
      default:
        return status;
    }
  };
  console.log({ acceptedOffers });
  const renderOfferCard = (offer) => (
    <TouchableOpacity
      key={offer.id}
      onPress={() => navigation.navigate("ClientOfferDetailsScreen", { offer })}
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
            {offer.serviceName}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: "poppinsRegular",
              color: "#8C8D8B",
              marginBottom: 4,
            }}
          >
            {offer.serviceType === "HOME_SERVICE" ? "Home Service" : "In-shop"}
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
              {getDisplayStatus(offer.status)}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppinsRegular",
              color: "#9CA3AF",
            }}
          >
            {DateConverter(offer.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAcceptedOfferCard = (offer) => (
    <TouchableOpacity
      key={offer.id}
      onPress={() => {
        // Pass all vendor offers to the detail screen
        navigation.navigate("AcceptedOfferDetail", {
          offerId: offer.id,
          totalAmount: offer.totalAmount,
          vendorOffers: offer.vendorOffers || [],
        });
      }}
      style={{
        backgroundColor: "#FFFFFF",
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 8,
        borderWidth: 1,
        borderColor: "#F3F4F6",
      }}
    >
      {/* Header with vendor info */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "poppinsMedium",
              color: "#1F2937",
              marginBottom: 8,
            }}
          >
            {offer.serviceName}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppinsRegular",
              color: "#6B7280",
            }}
          >
            {offer.serviceType === "HOME_SERVICE" ? "Home Service" : "In-shop"}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#d977062b",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#D97706",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppinsMedium",
              color: "#D97706",
            }}
          >
            Pending
          </Text>
        </View>
      </View>

      {/* Price and date */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "poppinsBold",
              color: "#ED2584",
            }}
          >
            {formatAmount(offer.offerAmount)}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppinsRegular",
              color: "#9CA3AF",
              marginTop: 2,
            }}
          >
            {DateConverter(offer.createdAt)}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#ED2584",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: "poppinsMedium",
              color: "#FFFFFF",
            }}
          >
            View Details
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <StatusBar backgroundColor="#EB278D" barStyle="light-content" />

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
            Offers & Bookings
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#1F2937"
              />
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

        {/* Skeleton Loader */}
        <OffersListSkeleton count={5} />
      </View>
    );
  }

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
          Offers & Bookings
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

      {/* Error Message */}
      {error && (
        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "poppinsRegular",
              color: "#EF4444",
              textAlign: "center",
            }}
          >
            {error}
          </Text>
        </View>
      )}

      {/* Offers List */}
      <ScrollView
        style={{ flex: 1, backgroundColor: "#F9FAFB" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {activeFilter === "My Offers"
          ? offers.map(renderOfferCard)
          : acceptedOffers.map(renderAcceptedOfferCard)}

        {((activeFilter === "My Offers" && offers.length === 0) ||
          (activeFilter === "Accepted Offers" &&
            acceptedOffers.length === 0)) &&
          !loading &&
          !error && (
            <EmptyData msg={` No ${activeFilter.toLowerCase()} found`} />
          )}
      </ScrollView>
    </View>
  );
}
