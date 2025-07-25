import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { formatAmount } from "../../../formatAmount";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import PageModal from "../../../reusuableComponents/PageModal";
import { useNavigation } from "@react-navigation/native";

export default function VendorProfileServiceDetails({
  visible,
  onClose,
  service,
  vendorData, // Add this prop
  onBookNow,
}) {
  if (!service) return null;
  console.log({ service });
  const navigation = useNavigation();

  const vendorServiceType = vendorData?.vendorOnboarding?.serviceType;

  // Use vendor data for business name and location
  const businessName =
    vendorData?.vendorOnboarding?.businessName || "Vendor Name";
  const location = vendorData?.vendorOnboarding?.location || "Lagos, Nigeria";
  const businessInitial = businessName
    ? businessName.charAt(0).toUpperCase()
    : "V";

  return (
    <PageModal visible={visible} onClose={onClose}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="absolute top-5 right-5">
            <TouchableOpacity
              onPress={onClose}
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
                : require("../../../../assets/img/service1.svg")
            }
            style={{
              width: "100%",
              height: 250,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
        </View>
        <View style={{ paddingHorizontal: 18 }} className="mt-6">
          <Text
            style={{
              fontFamily: "poppinsMedium",
              fontSize: 14,
              color: "#222",
              marginBottom: 2,
            }}
          >
            {service.serviceName}
          </Text>
          <Text
            style={{
              color: "#EB278D",
              fontFamily: "poppinsMedium",
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            {formatAmount(service.servicePrice)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name={
                  i < Math.floor(service.rating || 0) ? "star" : "star-outline"
                }
                size={14}
                color="#FFC107"
              />
            ))}
            <Text
              style={{
                fontFamily: "latoRegular",
                fontSize: 12,
                marginLeft: 4,
                color: "#A9A9A9",
              }}
            >
              ({(service.reviews || 0).toLocaleString()} Reviews)
            </Text>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#F0F0F0",
              marginVertical: 12,
            }}
          />
          <View className="flex-row items-center justify-between mb-4">
            <Text
              style={{
                fontFamily: "latoBold",
                fontSize: 14,
                color: "#222",
                marginBottom: 4,
              }}
            >
              Vendor details
            </Text>
            <TouchableOpacity
              onPress={() => {
                const vendorId = service?.userId;
                const serviceId = service?.id;
                navigation.navigate("ServiceReviewScreen", {
                  vendor: service,
                  vendorId,
                  serviceId,
                });
              }}
              className="border border-primary self-start rounded-lg py-2 px-4 flex-row items-center"
            >
              <Text
                className="mt-1 text-primary"
                style={{ fontFamily: "poppinsRegular", fontSize: 12 }}
              >
                See Reviews
              </Text>
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
                  fontSize: 16,
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
                  fontSize: 14,
                  color: "#000",
                }}
              >
                {businessName}
              </Text>
              <Text
                style={{
                  fontFamily: "latoRegular",
                  fontSize: 12,
                  marginTop: 4,
                  color: "#A5A5A5",
                }}
              >
                {location}
              </Text>
            </View>
            <TouchableOpacity
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
                  fontSize: 12,
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
              fontSize: 14,
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
              fontSize: 12,
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
          onPress={() => {
            if (vendorServiceType === "HOME_SERVICE") {
              navigation.navigate("BookingHomeServiceAppointScreen", {
                service,
                vendorData,
                id: vendorData?.id,
              });
            } else {
              navigation.navigate("BookAppointmentScreen", {
                service,
                vendorData,
              });
            }
          }}
          title="Book Now"
        />
      </View>
    </PageModal>
  );
}
