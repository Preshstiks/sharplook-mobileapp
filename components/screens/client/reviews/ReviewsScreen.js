import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const reviews = [
  {
    name: "Funmilayo Kuti",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    date: "13 Sep, 2020",
    rating: 4.8,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pel ntesque malesuada eget vitae amet...",
  },
  {
    name: "Remi Kunke",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    date: "13 Sep, 2020",
    rating: 4.8,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pel ntesque malesuada eget vitae amet...",
  },
  {
    name: "Esther Abike",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    date: "13 Sep, 2020",
    rating: 4.8,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pel ntesque malesuada eget vitae amet...",
  },
  {
    name: "Savanah Nguyen",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    date: "13 Sep, 2020",
    rating: 4.8,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pel ntesque malesuada eget vitae amet...",
  },
];

export default function ReviewsScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-12 pb-4 px-4 flex-row items-center justify-between bg-primary">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text
          className="text-lg font-bold text-white"
          style={{ fontFamily: "poppinsBold" }}
        >
          Reviews
        </Text>
        <View style={{ width: 22 }} />
      </View>
      <ScrollView
        className="flex-1 px-4 mt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Review Summary */}
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text
              className="text-[15px] font-bold"
              style={{ fontFamily: "poppinsBold" }}
            >
              245 Reviews
            </Text>
            <View className="flex-row items-center mt-1">
              <Text
                className="text-[15px] font-bold mr-2"
                style={{ fontFamily: "poppinsBold" }}
              >
                4.8
              </Text>
              <FontAwesome name="star" size={16} color="#FFD700" />
              <FontAwesome name="star" size={16} color="#FFD700" />
              <FontAwesome name="star" size={16} color="#FFD700" />
              <FontAwesome name="star" size={16} color="#FFD700" />
              <FontAwesome name="star-half-empty" size={16} color="#FFD700" />
            </View>
          </View>
          <TouchableOpacity
            className="bg-white border-2 border-primary rounded-lg px-4 py-2 flex-row items-center"
            onPress={() => navigation.navigate("AddReviewScreen")}
          >
            <Ionicons name="create-outline" size={18} color="#EB278D" />
            <Text
              className="ml-2 text-primary font-bold"
              style={{ fontFamily: "poppinsBold" }}
            >
              Add Review
            </Text>
          </TouchableOpacity>
        </View>
        {/* Reviews List */}
        {reviews.map((review, idx) => (
          <View key={idx} className="flex-row items-start mb-6">
            <Image
              source={{ uri: review.avatar }}
              className="w-10 h-10 rounded-full mr-3"
            />
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text
                  className="font-bold text-[15px]"
                  style={{ fontFamily: "poppinsBold" }}
                >
                  {review.name}
                </Text>
                <View className="flex-row items-center">
                  <Text
                    className="text-[14px] font-bold mr-1"
                    style={{ fontFamily: "poppinsBold" }}
                  >
                    {review.rating}
                  </Text>
                  <Text className="text-[12px] text-gray-500 mr-1">rating</Text>
                  <FontAwesome name="star" size={14} color="#FFD700" />
                  <FontAwesome name="star" size={14} color="#FFD700" />
                  <FontAwesome name="star" size={14} color="#FFD700" />
                  <FontAwesome name="star" size={14} color="#FFD700" />
                  <FontAwesome
                    name="star-half-empty"
                    size={14}
                    color="#FFD700"
                  />
                </View>
              </View>
              <View className="flex-row items-center mt-1 mb-1">
                <Ionicons name="calendar-outline" size={14} color="#A9A9A9" />
                <Text className="ml-1 text-[12px] text-gray-500">
                  {review.date}
                </Text>
              </View>
              <Text
                className="text-[13px] text-black"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {review.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
