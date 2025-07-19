import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  mockCategories,
  mockVendors,
} from "../../reusuableComponents/MockDataProvider";
import { useRoute } from "@react-navigation/native";

export default function CategoriesScreen() {
  const route = useRoute();
  const services = route.params?.services || [];
  const category = route.params?.category || "";
  const [search, setSearch] = useState("");

  // Filter services by search
  const filteredServices = services.filter((service) =>
    service.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary pt-12 pb-4 px-4 flex-row items-center justify-between">
        <TouchableOpacity>
          <Feather name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text
          className="text-white text-lg font-bold"
          style={{ fontFamily: "poppinsBold" }}
        >
          {category} Services
        </Text>
        <View style={{ width: 22 }} />
      </View>
      {/* Search Bar */}
      <View className="flex-row items-center px-4 mt-4 mb-2">
        <View className="flex-1 flex-row items-center bg-[#F6F6F6] rounded-lg px-3 py-2">
          <Feather name="search" size={18} color="#BDBDBD" />
          <TextInput
            className="flex-1 ml-2 text-[14px]"
            placeholder={`Search ${category} Service`}
            value={search}
            onChangeText={setSearch}
            style={{ fontFamily: "latoRegular" }}
          />
        </View>
        <TouchableOpacity className="ml-3 bg-primary p-2 rounded-lg">
          <Feather name="sliders" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {filteredServices.length === 0 ? (
          <Text
            className="text-center mt-8 text-gray-400"
            style={{ fontFamily: "poppinsRegular" }}
          >
            No services found for this category.
          </Text>
        ) : (
          filteredServices.map((service) => (
            <View
              key={service.id}
              className="w-full mb-4 bg-white rounded-xl shadow-sm border border-[#F6F6F6] p-2 flex-row items-center"
            >
              {service.picture && (
                <Image
                  source={{ uri: service.picture }}
                  className="w-[80px] h-[80px] rounded-lg mr-3"
                  resizeMode="cover"
                />
              )}
              <View className="flex-1">
                <Text
                  className="text-[15px] font-bold"
                  style={{ fontFamily: "poppinsBold" }}
                >
                  {service.name || service.serviceName}
                </Text>
                {service.description && (
                  <Text
                    className="text-[12px] text-gray-500 mt-1"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    {service.description}
                  </Text>
                )}
                {service.price && (
                  <Text
                    className="text-[13px] text-primary mt-1"
                    style={{ fontFamily: "poppinsMedium" }}
                  >
                    ₦{service.price}
                  </Text>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
