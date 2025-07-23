import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Animated, // <-- Add Animated import
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import FilterBtn from "../../../assets/icon/filter.svg";
import ChatIcon from "../../../assets/icon/chat.svg";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useStatusBar } from "../../../context/StatusBarContext";
import { showToast } from "../../ToastComponent/Toast";
import { formatAmount } from "../../formatAmount";
import { HttpClient } from "../../../api/HttpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../../../context/CartContext";
import ProductDetailsModal from "./ProductDetailsModal";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

// SkeletonCard component for loading state
const SkeletonCard = () => {
  const shimmer = React.useRef(new Animated.Value(0.3)).current;

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
        width: CARD_WIDTH,
        marginBottom: 18,
        opacity: shimmer,
      }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden mr-3"
    >
      <View
        style={{
          width: "100%",
          height: 110,
          backgroundColor: "#ececec",
        }}
      />
      <View className="p-3">
        <View
          style={{
            width: "70%",
            height: 16,
            backgroundColor: "#ececec",
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
        <View
          style={{
            width: "90%",
            height: 10,
            backgroundColor: "#ececec",
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
        <View
          style={{
            width: "60%",
            height: 10,
            backgroundColor: "#ececec",
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
        <View
          style={{
            width: "40%",
            height: 13,
            backgroundColor: "#ececec",
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <View
              key={i}
              style={{
                width: 14,
                height: 14,
                backgroundColor: "#ececec",
                borderRadius: 7,
                marginRight: 2,
              }}
            />
          ))}
          <View
            style={{
              width: 20,
              height: 10,
              backgroundColor: "#ececec",
              borderRadius: 4,
              marginLeft: 4,
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default function Market() {
  const navigation = useNavigation();
  const { setBarType } = useStatusBar();
  const { cartItems, fetchCart, loading: cartLoading } = useCart();
  useEffect(() => {
    setBarType("primary");
  }, []);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Helper to get all product IDs in cart
  const cartProductIds = cartItems.map(
    (item) =>
      item.product?.id ||
      item.product?._id ||
      item.productId ||
      item.id ||
      item._id
  );

  const fetch = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    console.log("token", token);
    try {
      const res = await HttpClient.get("/products/getAllProducts");
      setProducts(res.data.data || []);
    } catch (error) {
      console.log("Error fetching products:", error.response);
      const message = error.response?.data?.message || error.response?.message;
      if (error.response && error.response.data) {
        showToast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetch();
      fetchCart();
    }, [fetchCart])
  );
  console.log({ products });

  const handleAddToCart = async (product) => {
    const productId = product.id || product._id;
    setAddingToCart((prev) => ({ ...prev, [productId]: true }));

    try {
      const res = await HttpClient.post("/client/addProductTocart", {
        productId: productId,
      });
      showToast.success(res.data.message);
      await fetchCart(); // Refresh cart after adding
    } catch (error) {
      console.log("Error adding to cart:", error.response);
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        "Failed to add to cart.";
      showToast.error(message);
    } finally {
      setAddingToCart((prev) => {
        const { [productId]: removed, ...rest } = prev;
        return rest;
      });
    }
  };
  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };
  const handleAddToCartFromModal = async (product, quantity) => {
    for (let i = 0; i < quantity; i++) {
      await handleAddToCart(product);
    }
    setModalVisible(false);
  };
  const renderProduct = ({ item }) => {
    const productId = item.id || item._id;
    const isInCart = cartProductIds.includes(productId);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleProductPress(item)}
      >
        <View
          style={{ width: CARD_WIDTH, marginBottom: 18 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden mr-3"
        >
          <Image
            source={
              item.picture
                ? { uri: item.picture }
                : require("../../../assets/img/product1.jpg")
            }
            style={{ width: "100%", height: 110 }}
            resizeMode="cover"
          />
          <View className="p-3">
            <Text
              style={{ fontFamily: "latoBold" }}
              className="text-[16px] text-faintDark mb-1"
            >
              {item.productName || item.title}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text
                style={{ fontFamily: "latoBold" }}
                className="text-[10px] w-[80%] my-2"
              >
                Vendor: {item?.vendor?.vendorOnboarding?.businessName}
              </Text>
              <TouchableOpacity className="">
                <MaterialIcons name="chat" size={20} color="#EB278D" />
              </TouchableOpacity>
            </View>
            <Text
              style={{ fontFamily: "latoBold" }}
              className="text-[13px] text-faintDark mb-1"
            >
              {formatAmount(item.price)}
            </Text>
            <View className="flex-row items-center justify-between mt-1">
              <View className="flex-row items-center">
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name={
                      i < Math.floor(item.rating || 0) ? "star" : "star-outline"
                    }
                    size={14}
                    color="#FFC107"
                  />
                ))}
                <Text
                  style={{ fontFamily: "latoRegular" }}
                  className="text-[10px] ml-1 text-[#A9A9A9]"
                >
                  {(item.reviews || 0).toLocaleString()}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              disabled={addingToCart[productId] || isInCart}
              className={` py-2 rounded-[8px] mt-3 ${addingToCart[productId] ? "opacity-50" : ""} ${isInCart ? "border border-primary" : "bg-primary"}`}
              onPress={() => handleAddToCart(item)}
            >
              <Text
                style={{ fontFamily: "poppinsRegular" }}
                className={`text-[11px] text-center  ${isInCart ? "text-primary" : "text-white"}`}
              >
                {isInCart
                  ? "Added to Cart"
                  : addingToCart[productId]
                    ? "Adding..."
                    : "Add to Cart"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-secondary">
      {/* Top Bar */}
      <View className="pt-[60px] pb-[10px] mb-6 shadow-sm items-center justify-between flex-row bg-secondary px-4">
        <View style={{ width: 26 }} />
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[16px] text-faintDark"
        >
          Market
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="cart-outline" size={26} color="#EB278D" />
        </TouchableOpacity>
      </View>
      {/* Search Bar & Filter */}
      <View className="flex-row items-center px-4 mt-2 mb-2">
        <View className="flex-row items-center flex-1 bg-secondary border border-[#F9BCDC] rounded-xl px-4 mr-3">
          <MaterialIcons name="search" size={22} color="#8c817a" />
          <TextInput
            className="ml-2 text-xs pt-5 pb-4 placeholder:text-faintDark2"
            placeholder="Search Market"
            cursorColor="#EB278D"
            style={{ fontFamily: "poppinsRegular" }}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      {/* Item Count & Filter */}
      <View className="flex-row items-center justify-between px-4 mb-2">
        <Text
          className="text-[16px] text-faintDark"
          style={{ fontFamily: "latoBold" }}
        >
          {products.length.toLocaleString()} Items
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Filter")}
          className="flex-row items-center bg-white rounded-[6px] px-3 py-4 pb-3 shadow-sm"
        >
          <Text
            className="text-[13px] mr-1"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Filter
          </Text>
          <Feather name="filter" size={16} color="black" />
        </TouchableOpacity>
      </View>
      {/* Product Grid */}
      {loading ? (
        <FlatList
          data={Array.from({ length: 6 })}
          renderItem={() => <SkeletonCard />}
          keyExtractor={(_, idx) => idx.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id?.toString() || item._id?.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        />
      )}
      <ProductDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCartFromModal}
      />
    </View>
  );
}
