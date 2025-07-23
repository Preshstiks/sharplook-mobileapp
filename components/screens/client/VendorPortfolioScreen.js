import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WhiteChatIcon from "../../../assets/icon/whitechat.svg";

const portfolioImages = [
  require("../../../assets/img/makeuppromo.png"),
  require("../../../assets/img/nailtech.jpg"),
  //   require("../../../assets/img/service1.svg"),
  require("../../../assets/img/ped.jpg"),
  //   require("../../../assets/img/home2.svg"),
  require("../../../assets/img/product1.jpg"),
];

export default function VendorPortfolioScreen({ navigation, route }) {
  // const { vendorId } = route.params; // For future use
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary pt-12 pb-4 flex-row items-center justify-between px-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          className="text-white text-[18px] font-semibold flex-1 text-center -ml-6"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Vendor’s Portfolio
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChatDetailScreenHardcoded")}
        >
          <WhiteChatIcon width={28} height={28} />
        </TouchableOpacity>
      </View>
      {/* Portfolio Grid */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="flex-row flex-wrap justify-between">
          {portfolioImages.map((img, idx) => (
            <View
              key={idx}
              className="w-[31%] aspect-square rounded-lg overflow-hidden mb-4 bg-gray-100"
            >
              <Image
                source={img}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
