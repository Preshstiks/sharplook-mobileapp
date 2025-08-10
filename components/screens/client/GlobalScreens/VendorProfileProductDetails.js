import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import PageModal from "../../../reusuableComponents/PageModal";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { formatAmount } from "../../../formatAmount";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { useNavigation } from "@react-navigation/native";
import OutlinedButton from "../../../reusuableComponents/buttons/OutlineButton";
import { useChatNavigation } from "../../../../hooks/useChatNavigation";
import { ChatConnectionLoader } from "../../../reusuableComponents/ChatConnectionLoader";

export default function VendorProfileProductDetails({
  visible,
  onClose,
  product,
  vendorData, // Accept vendor data
  onAddToCart,
  cartProductIds = [],
  addingToCart = {},
}) {
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const { navigateToChat, isConnecting } = useChatNavigation();

  if (!product) return null;

  const productId = product.id || product._id;
  const isInCart = cartProductIds.includes(productId);
  const isAdding = addingToCart[productId];
  const maxStock = product.stock || 24;

  // Use vendor data instead of product.vendor
  const businessName =
    vendorData?.vendorOnboarding?.businessName || "Mhidiy Store";
  const businessInitial = businessName
    ? businessName.charAt(0).toUpperCase()
    : "M";
  const location =
    vendorData?.vendorOnboarding?.location || "Location not available";

  const handleChatVendor = () => {
    const vendorId = vendorData?.id;
    const vendorName = vendorData?.vendorOnboarding?.businessName;

    if (vendorId) {
      navigateToChat(navigation, {
        vendorId: vendorId,
        receiverName: vendorName,
        chat: {
          id: vendorId,
          name: vendorName,
          vendorId: vendorId,
        },
      });
    }
  };

  return (
    <PageModal visible={visible} onClose={onClose}>
      {/* Chat Connection Loader */}
      <ChatConnectionLoader visible={isConnecting} />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {/* Close Button */}
            <View className="absolute top-10 right-10 z-10">
              <TouchableOpacity
                onPress={onClose}
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
                  : require("../../../../assets/img/product1.jpg")
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
                fontSize: 18,
                color: "#000",
                marginBottom: 8,
              }}
            >
              {product.productName || product.title}
            </Text>
            <Text
              style={{
                fontFamily: "latoBold",
                fontSize: 16,
                color: "#EB278D",
                marginBottom: 16,
              }}
            >
              {formatAmount(product.price)}
            </Text>

            <View className="flex-row items-center justify-between mt-5 mb-4">
              <Text
                style={{
                  fontFamily: "latoBold",
                  fontSize: 14,
                  color: "#222",
                  marginBottom: 4,
                }}
              >
                Vendor details
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductReviewsScreen", {
                    vendor: vendorData,
                    product: product,
                  });
                }}
                className="border border-primary self-start rounded-lg py-2 px-4 flex-row items-center"
              >
                <Text
                  className="mt-1 text-primary"
                  style={{ fontFamily: "poppinsRegular", fontSize: 12 }}
                >
                  See Reviews
                </Text>
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
            {isInCart ? (
              <OutlinedButton title="Added to Cart" />
            ) : (
              <AuthButton
                title={isAdding ? "Adding..." : "Add to Cart"}
                disabled={isInCart || isAdding}
                onPress={() => {
                  if (!isInCart && !isAdding) {
                    onAddToCart(product, quantity);
                  }
                }}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </PageModal>
  );
}
