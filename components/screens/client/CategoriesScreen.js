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
import { useStatusBar } from "../../../context/StatusBarContext";

export default function CategoriesScreen() {
  const route = useRoute();
  const { setBarType } = useStatusBar();
  useEffect(() => {
    setBarType("primary");
  }, []);
  const initialCategoryName = route.params?.category;
  const initialCategoryId =
    mockCategories.find((cat) => cat.name === initialCategoryName)?.id ||
    mockCategories[0]?.id;
  const [selectedCategoryId, setSelectedCategoryId] =
    useState(initialCategoryId);
  const [search, setSearch] = useState("");

  // Find selected category name
  const selectedCategory =
    mockCategories.find((cat) => cat.id === selectedCategoryId)?.name || "";

  // Filter vendors by category and search
  const filteredVendors = mockVendors.filter((v) => {
    const matchCategory = v.categoryId === selectedCategoryId;
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const vendorsNear = filteredVendors.filter((v) => v.distance <= 3);
  const vendorsOnSharplook = filteredVendors.filter((v) => v.distance > 3);

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
          Categories ({selectedCategory})
        </Text>
        <View style={{ width: 22 }} />
      </View>
      {/* Search Bar */}
      <View className="flex-row items-center px-4 mt-4 mb-2">
        <View className="flex-1 flex-row items-center bg-[#F6F6F6] rounded-lg px-3 py-2">
          <Feather name="search" size={18} color="#BDBDBD" />
          <TextInput
            className="flex-1 ml-2 text-[14px]"
            placeholder="Search Vendor"
            value={search}
            onChangeText={setSearch}
            style={{ fontFamily: "latoRegular" }}
          />
        </View>
        <TouchableOpacity className="ml-3 bg-primary p-2 rounded-lg">
          <Feather name="sliders" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Category Buttons */}

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Vendors Near You */}
        <Text
          className="text-[15px] font-bold mt-2 mb-2"
          style={{ fontFamily: "poppinsBold" }}
        >
          {selectedCategory} Vendors near you (3km away)
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {vendorsNear.map((v) => (
            <View
              key={v.id}
              className="w-[140px] mr-3 bg-white rounded-xl shadow-sm border border-[#F6F6F6] p-2"
            >
              <Image
                source={v.image}
                className="w-full h-[90px] rounded-lg"
                resizeMode="cover"
              />
              <Text
                className="mt-2 text-[13px] font-bold"
                style={{ fontFamily: "poppinsBold" }}
              >
                {v.name}
              </Text>
              <View className="flex-row items-center mt-1 mb-1">
                <Text
                  className={`text-[10px] px-2 py-0.5 rounded-full ${v.type === "In-shop" ? "bg-primary" : "bg-pink-400"} text-white`}
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  {v.type}
                </Text>
              </View>
              <View className="flex-row items-center mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <MaterialIcons
                    key={i}
                    name="star"
                    size={14}
                    color={i <= Math.round(v.rating) ? "#FFD700" : "#E0E0E0"}
                  />
                ))}
                <Text className="ml-1 text-[12px] text-[#444]">
                  {v.rating.toFixed(1)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        {/* Vendors on Sharplook */}
        <Text
          className="text-[15px] font-bold mt-2 mb-2"
          style={{ fontFamily: "poppinsBold" }}
        >
          {selectedCategory} Vendors on Sharplook
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {vendorsOnSharplook.map((v) => (
            <View
              key={v.id}
              className="w-[47%] mb-4 bg-white rounded-xl shadow-sm border border-[#F6F6F6] p-2"
            >
              <Image
                source={v.image}
                className="w-full h-[90px] rounded-lg"
                resizeMode="cover"
              />
              <Text
                className="mt-2 text-[13px] font-bold"
                style={{ fontFamily: "poppinsBold" }}
              >
                {v.name}
              </Text>
              <View className="flex-row items-center mt-1 mb-1">
                <Text
                  className={`text-[10px] px-2 py-0.5 rounded-full ${v.type === "In-shop" ? "bg-primary" : "bg-pink-400"} text-white`}
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  {v.type}
                </Text>
              </View>
              <View className="flex-row items-center mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <MaterialIcons
                    key={i}
                    name="star"
                    size={14}
                    color={i <= Math.round(v.rating) ? "#FFD700" : "#E0E0E0"}
                  />
                ))}
                <Text className="ml-1 text-[12px] text-[#444]">
                  {v.rating.toFixed(1)}
                </Text>
              </View>
            </View>
          ))}
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
    </View>
  );
}
