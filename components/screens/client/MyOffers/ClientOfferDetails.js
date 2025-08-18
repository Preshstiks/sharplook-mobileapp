import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { formatAmount } from "../../../formatAmount";
import { DateConverter } from "../../../reusuableComponents/DateConverter";
import { HttpClient } from "../../../../api/HttpClient";
import { BarIndicator } from "react-native-indicators";
import BottomModal from "../../../reusuableComponents/BottomModal";
import { showToast } from "../../../ToastComponent/Toast";

export default function ClientOfferDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { offer } = route.params || {};
  const [isCancelling, setIsCancelling] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const offerDetails = offer;
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
      case "CANCELLED":
        return "Cancelled";
      default:
        return status;
    }
  };

  const getServiceTypeDisplay = (serviceType) => {
    return serviceType === "HOME_SERVICE" ? "Home Service" : "In-shop";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Not specified";
    return timeString;
  };

  const handleCancelOffer = async () => {
    if (!offerDetails.id) {
      return;
    }
    setIsCancelling(true);
    try {
      const response = await HttpClient.post(`/offers/cancel`, {
        offerId: offerDetails.id,
      });
      showToast.success(response.data.message);
      navigation.goBack();
    } catch (error) {
    } finally {
      setIsCancelling(false);
    }
  };

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
          className=""
          style={{
            fontSize: 16,
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
                  fontSize: 14,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginBottom: 4,
                }}
              >
                Service Type
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "poppinsMedium",
                  color: "#1F2937",
                }}
              >
                {getServiceTypeDisplay(offerDetails.serviceType)}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginBottom: 4,
                }}
              >
                Amount Offered
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "poppinsMedium",
                  color: "#ED2584",
                }}
              >
                {formatAmount(offerDetails.offerAmount)}
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
                  fontSize: 14,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginBottom: 4,
                }}
              >
                Vendor
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "poppinsMedium",
                  color: "#1F2937",
                }}
              >
                {(() => {
                  const acceptedVendorOffer = offerDetails.vendorOffers?.find(
                    (offer) => offer.isAccepted
                  );
                  return (
                    acceptedVendorOffer?.vendor?.vendorOnboarding
                      ?.businessName || "Not specified"
                  );
                })()}
              </Text>
            </View>

            <Image
              source={require("../../../../assets/icon/avatar.png")}
              style={{ width: 45, height: 45 }}
              resizeMode="cover"
              className="rounded-full border border-pinklight"
            />
          </View>
        </View>

        {/* Service Details & Status */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginHorizontal: 16,
            marginTop: 12,
            marginBottom: 30,
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
                  fontSize: 14,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginBottom: 4,
                }}
              >
                Service
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "poppinsMedium",
                  color: "#1F2937",
                }}
              >
                {offerDetails.serviceName}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 14,
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
                    fontSize: 14,
                    fontFamily: "poppinsMedium",
                    color: getStatusColor(offerDetails.status),
                  }}
                >
                  {getDisplayStatus(offerDetails.status)}
                </Text>
              </View>
            </View>
          </View>

          {/* Service Image */}
          {offerDetails.serviceImage && (
            <Image
              source={{ uri: offerDetails.serviceImage }}
              style={{
                width: "100%",
                height: 200,
                borderRadius: 8,
                marginBottom: 16,
                resizeMode: "cover",
              }}
            />
          )}

          {/* Date and Time */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="calendar-outline" size={16} color="#8C8D8B" />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginLeft: 4,
                }}
              >
                Date: {formatDate(offerDetails.date)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="time-outline" size={16} color="#8C8D8B" />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginLeft: 4,
                }}
              >
                Time: {formatTime(offerDetails.time)}
              </Text>
            </View>
          </View>

          {/* Expires At */}
          {offerDetails.expiresAt && (
            <View style={{ marginTop: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "poppinsRegular",
                  color: "#8C8D8B",
                  marginBottom: 4,
                }}
              >
                Expires At
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "poppinsRegular",
                  color: "#1F2937",
                }}
              >
                {DateConverter(offerDetails.expiresAt)}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      {offerDetails.status !== "SELECTED" ||
        offerDetails.status !== "Selected" ||
        offerDetails.status !== "CANCELLED" ||
        (offerDetails.status !== "Cancelled" && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#FFFFFF",
              paddingHorizontal: 16,
              paddingVertical: 40,
              borderTopWidth: 1,
              borderTopColor: "#F3F4F6",
              flexDirection: "row",
              gap: 12,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor:
                  offerDetails.status === "PENDING" ? "#ED2584" : "#9CA3AF",
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("TipMore", { offer: offerDetails })
              }
            >
              <Text
                style={{
                  fontSize: 16,
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
              onPress={() => setShowModal(true)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "poppinsMedium",
                  color: "#ED2584",
                }}
              >
                Cancel Offer
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      <BottomModal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        showCloseBtn={true}
      >
        <View className="mb-8 mt-2">
          <Text
            className="text-[18px] text-center text-fadedDark"
            style={{ fontFamily: "latoBold" }}
          >
            Are you sure you want to cancel this offer?
          </Text>
        </View>
        <View className="space-y-4 pb-10 mt-2">
          <TouchableOpacity
            className="mt-2 rounded-[12px] mb-4 h-[52px] flex flex-row items-center w-full bg-[#ff0000] justify-center"
            onPress={handleCancelOffer}
          >
            <Text
              style={{ fontFamily: "poppinsMedium" }}
              className="text-center text-[15px] text-white"
            >
              {isCancelling ? (
                <BarIndicator color="#FFFFFF" size={16} />
              ) : (
                "Yes"
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-2 rounded-[12px] mb-4 border h-[52px] flex flex-row items-center w-full border-[#ff0000] justify-center"
            onPress={() => {
              setShowModal(false);
            }}
          >
            <Text
              style={{ fontFamily: "poppinsMedium" }}
              className="text-center text-[15px] text-[#ff0000]"
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
      </BottomModal>
    </View>
  );
}
