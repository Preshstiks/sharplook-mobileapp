import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const reviews = [
  {
    id: 1,
    name: "Funmilayo Kuti",
    avatar: require("../../../../assets/img/blackman.jpg"), // Changed to real image
    rating: 4.8,
    date: "13 Sep, 2020",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pel ntesque malesuada eget vitae amet...",
  },
  {
    id: 2,
    name: "Remi Kunke",
    avatar: require("../../../../assets/img/nailtech.jpg"), // Example real image
    rating: 4.8,
    date: "13 Sep, 2020",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pel ntesque malesuada eget vitae amet...",
  },
  {
    id: 3,
    name: "Esther Abike",
    avatar: require("../../../../assets/img/ped.jpg"), // Example real image
    rating: 4.8,
    date: "13 Sep, 2020",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pel ntesque malesuada eget vitae amet...",
  },
  {
    id: 4,
    name: "Savanah Nguyen",
    avatar: require("../../../../assets/img/product1.jpg"), // Example real image
    rating: 4.8,
    date: "13 Sep, 2020",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pel ntesque malesuada eget vitae amet...",
  },
];

export default function ReviewsScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "poppinsMedium" }}
          className="text-[16px] text-white"
        >
          Reviews
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        className="px-4"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Review Summary */}
        <View className="flex-row items-center justify-between my-6">
          <View>
            <Text
              className="text-[12px] text-faintDark"
              style={{ fontFamily: "poppinsRegular" }}
            >
              245 Reviews
            </Text>
            <View className="flex-row items-center mt-1">
              <Text
                className="text-[12px] mt-1 mr-2"
                style={{ fontFamily: "poppinsRegular" }}
              >
                4.8
              </Text>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                  key={i}
                  name={i <= 4 ? "star" : "star-outline"}
                  size={13}
                  color="#FFC107"
                  className="mr-0.5"
                />
              ))}
            </View>
          </View>
          <TouchableOpacity
            className="bg-primary flex-row items-center px-4 py-[10px] rounded-lg"
            onPress={() => navigation.navigate("AddReviewScreen")}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color="#fff"
              className="mr-1"
            />
            <Text
              className="text-white mt-1 text-[12px] ml-2"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Add Review
            </Text>
          </TouchableOpacity>
        </View>
        {/* Reviews List */}
        {reviews.map((review) => (
          <View key={review.id} className="flex-row mb-6">
            <View className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3 items-center justify-center">
              {/* Use SVG or fallback to Image if SVG not supported */}
              <Image
                source={review.avatar}
                style={{ width: 48, height: 48 }}
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text
                  className="text-[12px] font-semibold text-faintDark"
                  style={{ fontFamily: "poppinsMedium" }}
                >
                  {review.name}
                </Text>
                <View className="flex-row items-center">
                  <Text
                    className="text-[12px] mr-1"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    {review.rating}
                  </Text>
                  <Text
                    className="text-[10px] mr-1"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    rating
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center mb-1">
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color="#888"
                    className="mr-1"
                  />
                  <Text
                    className="text-[10px] mt-1"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    {review.date}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Ionicons
                      key={i}
                      name={i <= 4 ? "star" : "star-outline"}
                      size={13}
                      color="#FFC107"
                    />
                  ))}
                </View>
              </View>
              <Text
                className="text-[10px] text-faintDark"
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#EB278D",
    paddingTop: 50,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});
