import React, { useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useState } from "react";
import { HttpClient } from "../../../../api/HttpClient";
import { EmptyData } from "../../../reusuableComponents/EmptyData";

// Inline ReviewSkeleton component
function ReviewSkeleton() {
  const shimmer = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        flexDirection: "row",
        marginBottom: 24,
        alignItems: "flex-start",
        opacity: shimmer,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: "#ececec",
          marginRight: 12,
        }}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <View
            style={{
              width: 80,
              height: 12,
              backgroundColor: "#ececec",
              borderRadius: 6,
            }}
          />
          <View
            style={{
              width: 40,
              height: 12,
              backgroundColor: "#ececec",
              borderRadius: 6,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          {[...Array(5)].map((_, i) => (
            <View
              key={i}
              style={{
                width: 14,
                height: 14,
                backgroundColor: "#ececec",
                borderRadius: 7,
                marginRight: 4,
              }}
            />
          ))}
        </View>
        <View
          style={{
            width: "90%",
            height: 10,
            backgroundColor: "#ececec",
            borderRadius: 5,
            marginTop: 8,
          }}
        />
      </View>
    </Animated.View>
  );
}

export default function ProductReviewsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const vendor = route.params?.vendor;
  const product = route.params?.product;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const vendorId = vendor?.id;
  const productId = product?.id;
  console.log(vendor);
  useFocusEffect(
    useCallback(() => {
      const fetchReviews = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await HttpClient.get(
            `/reviews/${vendorId}/product/${productId}/reviews`
          );
          setReviews(res.data?.data || []);
          console.log(res.data);
        } catch (err) {
          console.error(err.response);
          setError("Failed to load reviews");
          setReviews([]);
        } finally {
          setLoading(false);
        }
      };
      fetchReviews();
    }, [vendorId])
  );

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
        contentContainerStyle={{ paddingBottom: 32, flexGrow: 1 }}
      >
        {/* Review Summary */}
        <View className="flex-row items-center justify-between my-6">
          <View>
            <Text
              className="text-[12px] text-faintDark"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {reviews.length} Reviews
            </Text>
            <View className="flex-row items-center mt-1">
              <Text
                className="text-[12px] mt-1 mr-2"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {/* Show average rating if available */}
                {reviews.length > 0
                  ? (
                      reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                      reviews.length
                    ).toFixed(1)
                  : "0.0"}
              </Text>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                  key={i}
                  name={
                    i <=
                    Math.round(
                      reviews.length > 0
                        ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                            reviews.length
                        : 0
                    )
                      ? "star"
                      : "star-outline"
                  }
                  size={13}
                  color="#FFC107"
                  className="mr-0.5"
                />
              ))}
            </View>
          </View>
          <TouchableOpacity
            className="bg-primary flex-row items-center px-4 py-[10px] rounded-lg"
            onPress={() =>
              navigation.navigate("AddProductReviewScreen", {
                vendorId,
                productId,
              })
            }
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
        {/* Loading/Error/Empty States */}
        {loading && (
          <View style={{ marginTop: 32 }}>
            {[...Array(3)].map((_, idx) => (
              <ReviewSkeleton key={idx} />
            ))}
          </View>
        )}

        {!loading && reviews.length === 0 && (
          <View>
            <EmptyData msg="No reviews yet." />
          </View>
        )}
        {reviews.map((review) => (
          <View key={review.id || review._id} className="flex-row mb-6">
            <View className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3 items-center justify-center">
              {/* Use SVG or fallback to Image if SVG not supported */}
              {review.avatarUrl ? (
                <Image
                  source={{ uri: review.avatarUrl }}
                  style={{ width: 48, height: 48 }}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="person-circle-outline" size={48} color="#ccc" />
              )}
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text
                  className="text-[12px] font-semibold text-faintDark"
                  style={{ fontFamily: "poppinsMedium" }}
                >
                  {review.name || review.userName || "Anonymous"}
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
                    {review.date || review.createdAt?.slice(0, 10) || "-"}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Ionicons
                      key={i}
                      name={
                        i <= Math.round(review.rating || 0)
                          ? "star"
                          : "star-outline"
                      }
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
                {review.text || review.comment || ""}
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
