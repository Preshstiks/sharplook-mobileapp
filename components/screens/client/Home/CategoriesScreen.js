import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useStatusBar } from "../../../../context/StatusBarContext";
import { EmptyData } from "../../../reusuableComponents/EmptyData";
import { useAuth } from "../../../../context/AuthContext";
import { HttpClient } from "../../../../api/HttpClient";
import { getCurrentLocation } from "../../../../utils/locationUtils";
import ServiceDetailsModal from "../ServiceDetailsModal";
import DefaultAvatar from "../../../../assets/icon/avatar.png";

export default function CategoriesScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { setBarType } = useStatusBar();
  useEffect(() => {
    setBarType("primary");
  }, []);
  const category = route.params?.category || "";
  const services = route.params?.services || [];
  const [search, setSearch] = useState("");

  // New state for nearby vendors
  const [nearbyVendors, setNearbyVendors] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(true);
  const [errorNearby, setErrorNearby] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Handle book now function
  const handleBookNow = (service) => {
    const vendorServiceType =
      service?.vendor?.vendorOnboarding?.serviceType || "IN_SHOP";

    if (vendorServiceType === "HOME_SERVICE") {
      navigation.navigate("BookingHomeServiceAppointScreen", {
        service,
        vendorData: service?.vendor,
        id: service?.vendor?.id,
      });
    } else {
      navigation.navigate("BookAppointmentScreen", {
        service,
        vendorData: service?.vendor,
      });
    }
  };

  useEffect(() => {
    const fetchNearbyVendors = async () => {
      setLoadingNearby(true);
      setErrorNearby(null);
      try {
        // Get current location with better error handling
        let location;
        try {
          location = await getCurrentLocation();
        } catch (locationError) {
          console.error("Location error:", locationError);
          setErrorNearby(
            "Unable to get your location. Please check location permissions."
          );
          setNearbyVendors([]);
          setLoadingNearby(false);
          return;
        }

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Use the services endpoint to get all services with vendor information
        const res = await HttpClient.get("/client/services");

        // Filter services by category
        let filteredServices = res.data?.data || [];
        if (category && filteredServices.length > 0) {
          filteredServices = filteredServices.filter(
            (service) => service.serviceName === category
          );
        }

        // Extract unique vendors from the filtered services
        const vendorMap = new Map();
        filteredServices.forEach((service) => {
          if (service.vendor && !vendorMap.has(service.vendor.id)) {
            vendorMap.set(service.vendor.id, {
              ...service.vendor,
              serviceName: service.serviceName,
              servicePrice: service.servicePrice,
              serviceImage: service.serviceImage,
              description: service.description,
            });
          }
        });

        const uniqueVendors = Array.from(vendorMap.values());

        setNearbyVendors(uniqueVendors);
      } catch (err) {
        console.error("Error fetching services:", err);

        setErrorNearby("Failed to fetch vendors. Please try again.");
        setNearbyVendors([]);
      } finally {
        setLoadingNearby(false);
      }
    };
    fetchNearbyVendors();
  }, [category]); // Add category as dependency

  // Filter services by search
  const filteredServices = services.filter((service) =>
    service.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  // Vendors on Sharplook: all others (not nearby)
  const vendorsOnSharplook = filteredServices.filter(
    (service) => !(service.vendorNear === true || service.distance <= 5)
  );
  const handleServicePress = (vendor) => {
    // Transform vendor data to match ServiceDetailsModal expected structure
    let transformedService = {
      serviceName: vendor.serviceName || category,
      servicePrice: vendor.servicePrice || "Contact for pricing",
      serviceImage: vendor.serviceImage || vendor.avatar || DefaultAvatar,
      description:
        vendor.description ||
        `${category} service by ${vendor?.vendorOnboarding?.businessName}`,
      vendor: {
        id: vendor.id,
        businessName: vendor?.vendorOnboarding?.businessName || "Vendor",
        location: "Location not available",
        vendorOnboarding: vendor.vendorOnboarding,
      },
      rating: vendor.rating || 0,
    };

    setSelectedService(transformedService);
    setModalVisible(true);
  };

  // Skeleton loader card for vendor
  const SkeletonCard = ({ horizontal }) => (
    <View
      className={
        horizontal
          ? "w-[140px] mr-3 bg-white rounded-xl shadow-sm border border-[#F6F6F6] p-2"
          : "w-[47%] mb-4 bg-white rounded-xl shadow-sm border border-[#F6F6F6]"
      }
      style={{ opacity: 0.7 }}
    >
      <View
        style={{
          width: "100%",
          height: horizontal ? 90 : 100,
          backgroundColor: "#ececec",
          borderRadius: 8,
        }}
      />
      <View
        style={{
          height: 12,
          backgroundColor: "#ececec",
          borderRadius: 4,
          marginTop: 8,
          width: horizontal ? "80%" : "60%",
        }}
      />
      <View
        style={{
          height: 10,
          backgroundColor: "#ececec",
          borderRadius: 4,
          marginTop: 6,
          width: horizontal ? "40%" : "30%",
        }}
      />
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <View
            key={i}
            style={{
              width: 14,
              height: 14,
              backgroundColor: "#ececec",
              borderRadius: 3,
              marginRight: 2,
            }}
          />
        ))}
        <View
          style={{
            width: 24,
            height: 10,
            backgroundColor: "#ececec",
            borderRadius: 4,
            marginLeft: 4,
          }}
        />
      </View>
    </View>
  );
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View className="bg-primary pt-12 pb-4 px-4 flex-row items-center justify-between">
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          className="text-white text-[14px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Categories ({category})
        </Text>
        <View style={{ width: 22 }} />
      </View>
      {/* Search Bar */}
      <View className="flex-row items-center px-4 mt-4 mb-2">
        <View className="flex-row items-center flex-1 bg-secondary border border-[#F9BCDC] rounded-xl px-4 mr-3">
          <View>
            <MaterialIcons name="search" size={24} color="#8c817a" />
          </View>
          <TextInput
            className="ml-2 text-xs pb-4 pt-5 placeholder:text-faintDark2"
            placeholder="Search Vendor"
            cursorColor="#EB278D"
            style={{ fontFamily: "poppinsRegular" }}
            // onFocus={() => setIsSearchBarActive(true)}
          />
        </View>

        {/* <TouchableOpacity className="ml-3 bg-primary p-2 rounded-lg">
          <Feather name="sliders" size={18} color="#fff" />
        </TouchableOpacity> */}
      </View>
      {/* Vendors Near You */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <Text
          className="text-[14px] mt-2 mb-2"
          style={{ fontFamily: "poppinsMedium" }}
        >
          {category} Vendors near you
        </Text>
        {loadingNearby ? (
          <View className="pb-6">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {[...Array(3)].map((_, idx) => (
                <SkeletonCard key={idx} horizontal />
              ))}
            </ScrollView>
          </View>
        ) : errorNearby ? (
          <View className="pb-6">
            <Text>{errorNearby}</Text>
          </View>
        ) : nearbyVendors.length === 0 ? (
          <View className="pb-6">
            <EmptyData msg={`No ${category} vendors available.`} />
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {nearbyVendors.map((vendor) => (
              <Pressable
                onPress={() => handleServicePress(vendor)}
                key={vendor.id}
                className="w-[140px] mr-3 bg-white rounded-xl shadow-sm border border-[#F6F6F6]"
              >
                <Image
                  source={
                    vendor.serviceImage
                      ? { uri: vendor.serviceImage }
                      : vendor.avatar
                        ? { uri: vendor.avatar }
                        : DefaultAvatar
                  }
                  className="w-full h-[90px] rounded-t-lg"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text
                    className="mt-2 text-[12px]"
                    style={{ fontFamily: "poppinsRegular" }}
                    numberOfLines={1}
                  >
                    {vendor?.vendorOnboarding?.businessName || "Vendor"}
                  </Text>
                  <View className="bg-primary rounded-[4px] my-1 px-3 self-start">
                    <Text
                      style={{ fontFamily: "poppinsRegular" }}
                      className="text-[8px] mt-1 text-white"
                    >
                      {vendor?.vendorOnboarding?.serviceType === "HOME_SERVICE"
                        ? "Home Service"
                        : "In-shop"}
                    </Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <MaterialIcons
                        key={i}
                        name="star"
                        size={14}
                        color={
                          i <= Math.round(vendor.rating || 0)
                            ? "#FFD700"
                            : "#E0E0E0"
                        }
                      />
                    ))}
                    <Text className="ml-1 text-[12px] text-[#444]">
                      {(vendor.rating || 0).toFixed(1)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        )}
        {/* Vendors on Sharplook */}
        <Text
          className="text-[14px] mt-2 mb-2"
          style={{ fontFamily: "poppinsMedium" }}
        >
          {category} Vendors on Sharplook
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {vendorsOnSharplook.length === 0 ? (
            <View style={{ width: "100%", alignItems: "center" }}>
              <View className="w-[60%]">
                <EmptyData msg="No vendors on Sharplook for this category." />
              </View>
            </View>
          ) : (
            vendorsOnSharplook.map((service) => (
              <Pressable
                onPress={() => handleServicePress(service)}
                key={service.id}
                className="w-[47%] mb-4 bg-white rounded-xl shadow-sm border border-[#F6F6F6]"
              >
                <Image
                  source={{ uri: service.serviceImage }}
                  className="w-full h-[100px] rounded-t-lg"
                  resizeMode="cover"
                />
                <View className="px-3 pb-3">
                  <Text
                    className="mt-2 text-[12px]"
                    style={{ fontFamily: "poppinsRegular" }}
                    numberOfLines={1}
                  >
                    {service.serviceName}
                  </Text>
                  <View className="bg-primary rounded-[4px] my-1 px-3 self-start">
                    <Text
                      style={{ fontFamily: "poppinsRegular" }}
                      className="text-[8px] mt-1 text-white"
                    >
                      {service.vendor.vendorOnboarding.serviceType ===
                      "HOME_SERVICE"
                        ? "Home Service"
                        : "In-shop"}
                    </Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <MaterialIcons
                        key={i}
                        name="star"
                        size={14}
                        color={
                          i <= Math.round(service.rating || 0)
                            ? "#FFD700"
                            : "#E0E0E0"
                        }
                      />
                    ))}
                    <Text className="ml-1 text-[12px] text-[#444]">
                      {(service.rating || 0).toFixed(1)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))
          )}
        </View>
        <TouchableOpacity className="items-center mt-2 mb-8">
          <Text
            className="text-[13px] text-primary"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Load More
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <ServiceDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        service={selectedService}
        onBookNow={handleBookNow}
      />
    </View>
  );
}
