import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { formatAmount } from "../../formatAmount";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import OutlinedButton from "../../reusuableComponents/buttons/OutlineButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";
import { showToast } from "../../ToastComponent/Toast";

const { height: screenHeight } = Dimensions.get("window");

export default function ProductDetailsScreen() {
  const [quantity, setQuantity] = useState(1);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();

  // Get data from route params
  const {
    product,
    onAddToCart,
    cartProductIds = [],
    addingToCart = {},
  } = route.params || {};

  if (!product) {
    navigation.goBack();
    return null;
  }

  const productId = product.id || product._id;
  const isInCart = cartProductIds.includes(productId);
  const isAdding = addingToCart[productId];

  const maxStock = product.stock || 24;

  // Safe access to business name with fallback
  const businessName =
    product?.vendor?.vendorOnboarding?.businessName || "Mhidiy Store";
  const businessInitial = businessName
    ? businessName.charAt(0).toUpperCase()
    : "M";
  const location =
    product?.vendor?.vendorOnboarding?.location || "Location not available";

  // Optimized chat navigation
  const handleChatVendor = () => {
    try {
      const vendorId = product?.vendor?.id;
      const vendorName = product?.vendor?.vendorOnboarding?.businessName;

      if (vendorId) {
        navigation.navigate("ChatDetailScreen", {
          roomId: `${user?.id}_${vendorId}`,
          receiverId: vendorId,
          receiverName: vendorName || "Chat",
          connectionEstablished: false,
          socket: null,
          vendorPhone: product?.vendor?.phone,
          vendorAvatar: product?.vendor?.vendorOnboarding?.profilePicture,
        });
      }
    } catch (error) {
      showToast.error("Failed to open chat");
    }
  };

  // Optimized reviews navigation
  const handleSeeReviews = () => {
    setReviewsLoading(true);
    try {
      // Pass only essential data for reviews
      const reviewsParams = {
        vendorId: product?.vendor?.id,
        productId: product.id || product._id,
        productName: product.productName || product.title,
        vendorName: product?.vendor?.vendorOnboarding?.businessName,
      };

      navigation.navigate("ProductReviewsScreen", reviewsParams);
    } catch (error) {
      showToast.error("Failed to load reviews");
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isInCart && !isAdding && onAddToCart) {
      onAddToCart(product, quantity);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFAFD" }}>
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {/* Close Button */}
            <View className="absolute top-10 right-10 z-10">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  width: 32,
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
                product.picture
                  ? { uri: product.picture }
                  : require("../../../assets/img/product1.jpg")
              }
              style={{
                width: "100%",
                height: 250,
                borderRadius: 12,
              }}
              resizeMode="cover"
            />
          </View>

          <View className="px-4 pt-4">
            <Text
              style={{
                fontFamily: "latoBold",
                fontSize: 20,
                color: "#000",
                marginBottom: 8,
              }}
            >
              {product.productName || product.title}
            </Text>
            <Text
              style={{
                fontFamily: "latoBold",
                fontSize: 18,
                color: "#EB278D",
                marginBottom: 16,
              }}
            >
              {formatAmount(product.productPrice)}
            </Text>

            <View className="flex-row items-center justify-between mb-4">
              <Text
                style={{
                  fontFamily: "latoBold",
                  fontSize: 16,
                  color: "#222",
                  marginBottom: 4,
                }}
              >
                Vendor details
              </Text>
              <TouchableOpacity
                onPress={handleSeeReviews}
                disabled={reviewsLoading}
                className="border border-primary self-start rounded-lg py-2 px-4 flex-row items-center"
              >
                {reviewsLoading ? (
                  <ActivityIndicator size="small" color="#EB278D" />
                ) : (
                  <Text
                    className="mt-1 text-primary"
                    style={{ fontFamily: "poppinsRegular", fontSize: 14 }}
                  >
                    See Reviews
                  </Text>
                )}
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
                    fontSize: 18,
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
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  {businessName}
                </Text>
                <Text
                  style={{
                    fontFamily: "latoRegular",
                    fontSize: 14,
                    marginTop: 4,
                    color: "#A5A5A5",
                  }}
                >
                  {location}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleChatVendor}
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
                    fontSize: 14,
                    marginLeft: 4,
                  }}
                >
                  Chat Vendor
                </Text>
                <MaterialIcons name="chat" size={16} color="#EB278D" />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <Text
              style={{
                fontFamily: "poppinsMedium",
                fontSize: 16,
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
                fontSize: 14,
                color: "#666",
                lineHeight: 20,
                marginBottom: 100, // Extra space for the bottom button
              }}
            >
              {product.description || "No description available."}
            </Text>
          </View>
        </ScrollView>

        {/* Fixed bottom section */}
        <View
          style={{
            paddingVertical: 20,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
          }}
        >
          <View className="px-4">
            {isInCart ? (
              <OutlinedButton title="Added to Cart" />
            ) : (
              <AuthButton
                title={isAdding ? "Adding..." : "Add to Cart"}
                disabled={isInCart || isAdding}
                onPress={handleAddToCart}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
