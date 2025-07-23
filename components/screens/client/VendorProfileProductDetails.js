import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import PageModal from "../../reusuableComponents/PageModal";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { formatAmount } from "../../formatAmount";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";

export default function VendorProfileProductDetails({
  visible,
  onClose,
  product,
  vendorData, // Accept vendor data
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const maxStock = product.stock || 24;

  // Use vendor data instead of product.vendor
  const businessName =
    vendorData?.vendorOnboarding?.businessName || "Mhidiy Store";
  const businessInitial = businessName
    ? businessName.charAt(0).toUpperCase()
    : "M";
  const location =
    vendorData?.vendorOnboarding?.location || "Location not available";

  return (
    <PageModal visible={visible} onClose={onClose} backgroundcolor="#FFFFFF">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* Product Image */}
          <View style={{ marginBottom: 20 }} className="relative">
            <View className="absolute top-5 right-5">
              <TouchableOpacity
                onPress={onClose}
                style={{
                  width: 32,
                  zIndex: 10,
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

          {/* Product Info */}
          <View style={{ paddingHorizontal: 20 }}>
            {/* Title and Quantity */}

            <View className="flex-row items-center justify-between mb-4">
              <View className="w-[65%]">
                <View style={{ flex: 1, marginRight: 16 }}>
                  <Text
                    style={{
                      fontFamily: "poppinsMedium",
                      fontSize: 16,
                      color: "#000",
                      lineHeight: 26,
                    }}
                  >
                    {product.productName}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#EB278D",
                    marginTop: 6,
                    fontFamily: "poppinsMedium",
                    fontSize: 16,
                    marginBottom: 8,
                  }}
                >
                  {formatAmount(product.price)}
                </Text>
              </View>

              <View
                className="bg-[#FDE9F4] w-[35%]"
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 20,
                  paddingHorizontal: 4,
                  paddingVertical: 4,
                }}
              >
                <TouchableOpacity
                  className="bg-white"
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="remove" size={18} color="#EB278D" />
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 12,
                    fontFamily: "latoBold",
                    fontSize: 16,
                    minWidth: 20,
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </Text>
                <TouchableOpacity
                  className="bg-white"
                  onPress={() => setQuantity(Math.min(maxStock, quantity + 1))}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="add" size={18} color="#EB278D" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Rating and Reviews */}
            <View className="flex-row items-center justify-between mb-4">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name={
                      i < Math.floor(product.rating || 0)
                        ? "star"
                        : "star-outline"
                    }
                    size={16}
                    color="#FFC107"
                  />
                ))}
                <Text
                  style={{
                    fontFamily: "latoRegular",
                    fontSize: 12,
                    marginLeft: 6,
                    color: "#333",
                  }}
                >
                  ({(product.reviews || 275).toLocaleString()} Reviews)
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "latoRegular",
                  fontSize: 12,
                  color: "#00000066",
                }}
              >
                {maxStock} pieces available in stock
              </Text>
            </View>
            <View className="h-[0.8px] bg-[#E5E5E5]" />
            <Text
              style={{
                fontFamily: "latoBold",
                fontSize: 14,
                color: "#000",
                marginTop: 18,
                marginBottom: 12,
              }}
            >
              Vendor details
            </Text>

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
                    fontSize: 16,
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
                    fontSize: 14,
                    color: "#000",
                  }}
                >
                  {businessName}
                </Text>
                <Text
                  style={{
                    fontFamily: "latoRegular",
                    fontSize: 12,
                    marginTop: 4,
                    color: "#A5A5A5",
                  }}
                >
                  {location}
                </Text>
              </View>
              <TouchableOpacity
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
                    fontSize: 12,
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
                fontSize: 14,
                color: "#000",
                marginBottom: 12,
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontFamily: "poppinsRegular",
                fontSize: 12,
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
            <AuthButton
              title="Add to Cart"
              onPress={() => {
                onAddToCart(product, quantity);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </PageModal>
  );
}
