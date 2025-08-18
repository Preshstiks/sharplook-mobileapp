import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { formatAmount } from "../../formatAmount";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";
import { showToast } from "../../ToastComponent/Toast";
import { checkUserLocationForBooking } from "../../../utils/locationUtils";

export default function VendorProfileServiceDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const [bookingLoading, setBookingLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Get data from route params
  const { service, vendorData } = route.params || {};

  if (!service) {
    navigation.goBack();
    return null;
  }

  const vendorServiceType = vendorData?.vendorOnboarding?.serviceType;

  // Use vendor data for business name and location
  const businessName =
    vendorData?.vendorOnboarding?.businessName || "Vendor Name";
  const location = vendorData?.vendorOnboarding?.location || "Lagos, Nigeria";
  const businessInitial = businessName
    ? businessName.charAt(0).toUpperCase()
    : "V";

  // Optimized chat navigation with minimal data
  const handleChatVendor = () => {
    try {
      const vendorId = vendorData?.id;
      const vendorName = vendorData?.vendorOnboarding?.businessName;

      if (vendorId) {
        navigation.navigate("ChatDetailScreen", {
          roomId: `${user?.id}_${vendorId}`,
          receiverId: vendorId,
          receiverName: vendorName || "Chat",
          connectionEstablished: false,
          socket: null,
          vendorPhone: vendorData?.phone,
          vendorAvatar: vendorData?.vendorOnboarding?.profilePicture,
        });
      }
    } catch (error) {
      showToast.error("Failed to open chat");
    }
  };

  // Optimized reviews navigation
  const handleSeeReviews = () => {
    setReviewsLoading(true);
    try {
      // Pass only essential data
      const reviewsParams = {
        vendorId: service?.userId || vendorData?.id,
        serviceId: service?.id || service?._id,
        serviceName: service?.serviceName,
        vendorName: vendorData?.vendorOnboarding?.businessName,
      };

      navigation.navigate("ServiceReviewScreen", reviewsParams);
    } catch (error) {
      showToast.error("Failed to load reviews");
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleBookingNavigation = async () => {
    setBookingLoading(true);

    try {
      // Add a small delay to ensure all data is ready
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Check if user has location set for home service booking
      if (vendorServiceType === "HOME_SERVICE") {
        if (!checkUserLocationForBooking(user, showToast)) {
          setBookingLoading(false);
          navigation.goBack();
          return;
        }
      }

      // Prepare minimal navigation params to reduce payload
      const navigationParams = {
        serviceId: service.id || service._id,
        id: vendorData?.id, // Changed from vendorId to id to match booking screen expectation
        // Pass only essential service data
        service: {
          id: service.id || service._id,
          serviceName: service.serviceName,
          servicePrice: service.servicePrice,
          serviceImage: service.serviceImage,
          serviceDuration: service.serviceDuration,
          serviceDescription: service.serviceDescription,
        },
        // Pass only essential vendor data
        vendorData: {
          // Changed from vendor to vendorData to match main screen structure
          id: vendorData?.id,
          businessName: vendorData?.vendorOnboarding?.businessName,
          serviceType: vendorData?.vendorOnboarding?.serviceType,
          profilePicture: vendorData?.vendorOnboarding?.profilePicture,
          rating: vendorData?.rating,
          phone: vendorData?.phone,
        },
      };

      if (vendorServiceType === "HOME_SERVICE") {
        navigation.navigate(
          "BookingHomeServiceAppointScreen",
          navigationParams
        );
      } else {
        navigation.navigate("BookAppointmentScreen", navigationParams);
      }
    } catch (error) {
      showToast.error("Failed to navigate to booking screen");
    } finally {
      // Clear loading state after navigation
      setTimeout(() => {
        setBookingLoading(false);
      }, 500);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFAFD" }}>
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View className="absolute top-10 right-10">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  width: 32,
                  zIndex: 10,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: "#F5F5F5",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="close" size={20} color="#EB278D" />
              </TouchableOpacity>
            </View>
            <Image
              source={
                service.serviceImage
                  ? { uri: service.serviceImage }
                  : require("../../../assets/img/service1.svg")
              }
              style={{
                width: "100%",
                height: 250,
                borderRadius: 12,
              }}
              resizeMode="cover"
            />
          </View>

          <View className="px-4 pt-4">
            <Text
              style={{
                fontFamily: "latoBold",
                fontSize: 20,
                color: "#000",
                marginBottom: 8,
              }}
            >
              {service.serviceName}
            </Text>
            <Text
              style={{
                fontFamily: "latoBold",
                fontSize: 18,
                color: "#EB278D",
                marginBottom: 16,
              }}
            >
              {formatAmount(service.servicePrice)}
            </Text>

            <View className="flex-row items-center justify-between mb-4">
              <Text
                style={{
                  fontFamily: "latoBold",
                  fontSize: 16,
                  color: "#222",
                  marginBottom: 4,
                }}
              >
                Vendor details
              </Text>
              <TouchableOpacity
                onPress={handleSeeReviews}
                disabled={reviewsLoading}
                className="border border-primary self-start rounded-lg py-2 px-4 flex-row items-center"
              >
                {reviewsLoading ? (
                  <ActivityIndicator size="small" color="#EB278D" />
                ) : (
                  <Text
                    className="mt-1 text-primary"
                    style={{ fontFamily: "poppinsRegular", fontSize: 14 }}
                  >
                    See Reviews
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
                backgroundColor: "#F8F8F8",
                padding: 12,
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Text
                  style={{
                    fontFamily: "latoBold",
                    fontSize: 18,
                    color: "#666",
                  }}
                >
                  {businessInitial}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "latoBold",
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  {businessName}
                </Text>
                <Text
                  style={{
                    fontFamily: "latoRegular",
                    fontSize: 14,
                    marginTop: 4,
                    color: "#A5A5A5",
                  }}
                >
                  {location}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleChatVendor}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#FFF",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: "#EB278D",
                    paddingBottom: 2,
                    fontFamily: "latoBold",
                    fontSize: 14,
                    marginLeft: 4,
                  }}
                >
                  Chat Vendor
                </Text>
                <MaterialIcons name="chat" size={16} color="#EB278D" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: "poppinsMedium",
                fontSize: 16,
                color: "#000",
                marginTop: 18,
                marginBottom: 12,
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontFamily: "poppinsRegular",
                fontSize: 14,
                color: "#666",
                lineHeight: 20,
                marginBottom: 100, // Extra space for the bottom button
              }}
            >
              {service.description}
            </Text>
          </View>
        </ScrollView>
        <View
          style={{
            padding: 18,
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
          }}
        >
          <AuthButton
            disabled={bookingLoading}
            isloading={bookingLoading}
            onPress={handleBookingNavigation}
            title="Book Now"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
