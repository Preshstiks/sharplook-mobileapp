import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Dropdown from "../../../reusuableComponents/inputFields/Dropdown";
import OutlineTextInput from "../../../reusuableComponents/inputFields/OutlineTextInput";
import { formatAmount } from "../../../formatAmount";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import * as ImagePicker from "expo-image-picker";
import { HttpClient } from "../../../../api/HttpClient";
import { showToast } from "../../../ToastComponent/Toast";

export default function TipMoreScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { offer } = route.params || {};

  // State for form inputs - only offer amount is editable
  const [offerAmount, setOfferAmount] = useState(
    offer?.offerAmount?.toString() || ""
  );
  const [selectedService, setSelectedService] = useState(
    offer?.serviceName || ""
  );
  const [homeService, setHomeService] = useState(offer?.serviceType || "");
  const [selectedImage, setSelectedImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use passed offer data
  const offerDetails = offer;

  // Image picker function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmitOffer = async () => {
    setIsSubmitting(true);
    try {
      const response = await HttpClient.patch("/offers/tip", {
        offerId: offer?.id,
        tipAmount: Number(offerAmount),
      });

      showToast.success(response.data.message);

      // Go back 2 screens instead of 1
      navigation.pop(2);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to submit tip. Please try again.";
      showToast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
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
            fontSize: 18,
            fontFamily: "poppinsMedium",
            color: "#1F2937",
          }}
        >
          Tip More
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1, backgroundColor: "#FFFFFF" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        {/* Offer Amount Input - Editable */}
        <View style={{ marginTop: 20 }}>
          <OutlineTextInput
            label="Offer Amount"
            value={offerAmount}
            onChangeText={setOfferAmount}
            placeholder="Type here"
            keyboardType="numeric"
          />
        </View>

        {/* Select Service Dropdown - Read Only */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[14px] pb-1"
          >
            Service
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#F9BCDC",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 16,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "poppinsRegular",
                color: "#1F2937",
              }}
            >
              {offerDetails.serviceName}
            </Text>
          </View>
        </View>

        {/* Service Type Dropdown - Read Only */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[14px] pb-1"
          >
            Service Type
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#F9BCDC",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 16,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "poppinsRegular",
                color: "#1F2937",
              }}
            >
              {getServiceTypeDisplay(offerDetails.serviceType)}
            </Text>
          </View>
        </View>

        {/* Service Preview Card */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: 24,
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
            borderWidth: 1,
            borderColor: "#F3F4F6",
          }}
        >
          {/* Service Image with Edit Icon */}
          <View style={{ position: "relative", marginBottom: 16 }}>
            <Image
              source={
                selectedImage
                  ? { uri: selectedImage }
                  : { uri: offerDetails.serviceImage }
              }
              style={{
                width: "100%",
                height: 200,
                borderRadius: 8,
                resizeMode: "cover",
              }}
            />
            {/* <TouchableOpacity
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 20,
                width: 32,
                height: 32,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={pickImage}
            >
              <Feather name="edit" size={24} color="#ED2584" />
            </TouchableOpacity> */}
          </View>

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
        </View>

        {/* My Location */}
        {offerDetails.serviceType === "HOME_SERVICE" && (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginTop: 24,
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
              borderWidth: 1,
              borderColor: "#F3F4F6",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "poppinsMedium",
                color: "#1F2937",
                marginBottom: 8,
              }}
            >
              My Location:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "poppinsRegular",
                color: "#6B7280",
              }}
            >
              {offerDetails.location}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Submit Offer Button */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 20,
          paddingVertical: 40,
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
        }}
      >
        <AuthButton
          title="Submit Offer"
          onPress={handleSubmitOffer}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
}
