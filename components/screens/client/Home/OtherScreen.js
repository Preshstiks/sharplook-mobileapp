import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCategories } from "../../../../hooks/useCategories";
import { HttpClient } from "../../../../api/HttpClient";
import { getCurrentLocation } from "../../../../utils/locationUtils";

// Categories will be populated dynamically from API

export default function OtherScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const allServices = route.params?.allServices || [];
  const { categories, loading: categoriesLoading } = useCategories();
  const [nearbyVendors, setNearbyVendors] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(true);

  // Fetch nearby vendors
  const fetchNearbyVendors = async () => {
    setLoadingNearby(true);
    try {
      let location;
      try {
        location = await getCurrentLocation();
      } catch (locationError) {
        console.error("Location error:", locationError);
        setNearbyVendors([]);
        setLoadingNearby(false);
        return;
      }

      const latitude = location.latitude;
      const longitude = location.longitude;

      const res = await HttpClient.get(
        `/user/nearby-vendors?latitude=${latitude}&longitude=${longitude}`
      );

      setNearbyVendors(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching nearby vendors:", err);
      setNearbyVendors([]);
    } finally {
      setLoadingNearby(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNearbyVendors();
    }, [])
  );
  console.log({ nearbyVendors });
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="dark-content" />
      <View className="pt-[40px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[16px] text-faintDark"
        >
          Categories
        </Text>
        <View style={{ width: 26 }} />
      </View>
      {/* Categories Grid */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingTop: 6,
          paddingBottom: 6,
        }}
      >
        <View className="flex-row flex-wrap">
          {categoriesLoading
            ? // Show skeleton loading for categories
              Array.from({ length: 8 }).map((_, idx) => (
                <View
                  key={idx}
                  className="w-1/3 px-1 mb-2"
                  style={{ minHeight: 120 }}
                >
                  <View
                    className="bg-secondary rounded-[12px] items-center justify-center p-2"
                    style={{ minHeight: 120 }}
                  >
                    <View className="rounded-full h-[64px] w-[64px] items-center justify-center mb-2 border border-lightgray bg-lightgray" />
                    <View className="w-12 h-3 bg-lightgray rounded mt-1" />
                  </View>
                </View>
              ))
            : categories.map((cat, idx) => (
                <TouchableOpacity
                  onPress={() => {
                    const filteredServices = allServices.filter(
                      (service) => service.serviceName === cat.name
                    );

                    // Filter nearby vendors by category
                    const filteredNearby = nearbyVendors.filter((vendor) =>
                      vendor.vendorServices?.some(
                        (service) => service.serviceName === cat.name
                      )
                    );

                    navigation.navigate("Categories", {
                      category: cat.name,
                      services: filteredServices,
                      nearbyVendors: filteredNearby,
                    });
                  }}
                  key={cat.id}
                  className="w-1/3 px-1 mb-2"
                  style={{ minHeight: 120 }}
                >
                  <View
                    className="bg-pinklight rounded-[12px] items-center justify-center p-2"
                    style={{ minHeight: 120 }}
                  >
                    <View className="rounded-full h-[64px] w-[64px] items-center justify-center mb-2 border border-primary">
                      <Ionicons name="sparkles" size={36} color="#EB278D" />
                    </View>
                    <Text
                      className="text-[12px] text-faintDark text-center mt-1"
                      style={{ fontFamily: "poppinsRegular" }}
                    >
                      {cat.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    color: "#222",
    fontSize: 18,
    fontFamily: "poppinsMedium",
    flex: 1,
    textAlign: "center",
    marginLeft: -28,
  },
});
