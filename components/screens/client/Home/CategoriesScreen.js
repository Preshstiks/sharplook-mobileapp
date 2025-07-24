import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useStatusBar } from "../../../../context/StatusBarContext";
import { EmptyData } from "../../../reusuableComponents/EmptyData";
import { useAuth } from "../../../../context/AuthContext";
import { HttpClient } from "../../../../api/HttpClient";
import { getCurrentLocation } from "../../../../utils/locationUtils";
import ServiceDetailsModal from "../ServiceDetailsModal";

export default function CategoriesScreen() {
  const route = useRoute();
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

  useEffect(() => {
    const fetchNearbyVendors = async () => {
      setLoadingNearby(true);
      setErrorNearby(null);
      try {
        const location = await getCurrentLocation();
        const latitude = location.latitude;
        const longitude = location.longitude;
        const res = await HttpClient.get(
          `/user/nearby-vendors?latitude=${latitude}&longitude=${longitude}`
        );
        setNearbyVendors(res.data?.data || []);
      } catch (err) {
        setErrorNearby("Failed to fetch nearby vendors.");
        setNearbyVendors([]);
      } finally {
        setLoadingNearby(false);
      }
    };
    fetchNearbyVendors();
  }, []);

  // Filter services by search
  const filteredServices = services.filter((service) =>
    service.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  // Vendors on Sharplook: all others (not nearby)
  const vendorsOnSharplook = filteredServices.filter(
    (service) => !(service.vendorNear === true || service.distance <= 3)
  );
  const handleServicePress = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };
  console.log({ nearbyVendors });
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

        <TouchableOpacity className="ml-3 bg-primary p-2 rounded-lg">
          <Feather name="sliders" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Vendors Near You */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <Text
          className="text-[14px] mt-2 mb-2"
          style={{ fontFamily: "poppinsMedium" }}
        >
          {category} Vendors near you (3km away)
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
            <EmptyData msg="No vendors near you." />
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {nearbyVendors.map((service) => (
              <Pressable
                onPress={() => handleServicePress(service)}
                key={service.id}
                className="w-[140px] mr-3 bg-white rounded-xl shadow-sm border border-[#F6F6F6]"
              >
                <Image
                  source={
                    service?.avatar
                      ? { uri: service?.avatar }
                      : require("../../../../assets/icon/avatar.png")
                  }
                  className="w-full h-[90px] rounded-t-lg"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text
                    className="mt-2 text-[12px]"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    {service.businessName}
                  </Text>
                  <View className="bg-primary rounded-[4px] my-1 px-3 self-start">
                    <Text
                      style={{ fontFamily: "poppinsRegular" }}
                      className="text-[8px] mt-1 text-white"
                    >
                      {service.serviceType === "HOME_SERVICE"
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
      />
    </View>
  );
}
