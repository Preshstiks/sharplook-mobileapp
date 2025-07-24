import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { HttpClient } from "../../../../api/HttpClient";
import EmptySVG from "../../../../assets/img/empty.svg";
import { formatAmount } from "../../../formatAmount";
import { useCart } from "../../../../context/CartContext";
import { showToast } from "../../../ToastComponent/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CartScreen() {
  const navigation = useNavigation();
  const { cartItems, setCartItems, fetchCart, loading } = useCart();
  const [deletingItemId, setDeletingItemId] = useState(null);
  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [fetchCart])
  );

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = async (itemId) => {
    setDeletingItemId(itemId);
    const token = await AsyncStorage.getItem("token");
    console.log("token", token);

    try {
      const res = await HttpClient.delete(`/client/removeProduct/${itemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      console.log("removeItem response:", res.data);
      showToast.success(res.data.message);
    } catch (error) {
      console.log("Error removing item:", error.response);
    } finally {
      setDeletingItemId(null);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const delivery = 2000;
  const total = subtotal + delivery;
  console.log({ cartItems });
  return (
    <View className="flex-1 bg-secondary">
      {/* Header */}
      <View className="pt-[60px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[16px] text-faintDark"
        >
          Cart
        </Text>
        <View style={{ width: 26 }} />
      </View>
      {/* Cart Items or Empty State */}
      {loading ? (
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 items-center justify-center mt-20">
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[16px] text-faintDark"
            >
              Loading cart...
            </Text>
          </View>
        </ScrollView>
      ) : cartItems.length === 0 ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EmptySVG width={120} height={120} />
          <Text
            className="text-[14px] text-gray-400 mt-2"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Your cart is empty
          </Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          {cartItems.map((item) => (
            <View
              key={item.product.id}
              className="flex-row bg-white rounded-[8px] shadow-sm mb-4 p-3 items-center"
            >
              <Image
                source={{ uri: item.product.picture }}
                className="w-[100px] h-[100px] rounded-xl mr-3"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text
                  style={{ fontFamily: "poppinsMedium" }}
                  className="text-[14px] text-faintDark"
                >
                  {item.product.productName}
                </Text>
                <Text
                  style={{ fontFamily: "poppinsMedium" }}
                  className="text-[12px] text-primary"
                >
                  {formatAmount(item.product.price)}
                </Text>
                <View className="flex-row items-center">
                  <Text
                    style={{ fontFamily: "latoRegular" }}
                    className="text-[13px] text-faintDark"
                  >
                    {item.product.status === "in stock"
                      ? "In Stock"
                      : "Out of Stock"}
                  </Text>
                </View>
                {/* Quantity Selector */}
                <View className="flex-row items-center mt-2">
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
                  >
                    <Ionicons name="remove" size={16} color="#EB278D" />
                  </TouchableOpacity>
                  <Text
                    style={{ fontFamily: "poppinsMedium" }}
                    className="text-[14px] text-[#868889] mx-4"
                  >
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
                  >
                    <Ionicons name="add" size={16} color="#EB278D" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                className="ml-2"
                onPress={() => removeItem(item.product.id)}
                disabled={deletingItemId === item.product.id}
              >
                {deletingItemId === item.product.id ? (
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator size="small" color="#EB278D" />
                  </View>
                ) : (
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color="#EB278D"
                  />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
      {/* Summary & Checkout */}
      {cartItems.length > 0 && (
        <View className="bg-white rounded-t-2xl pb-[60px] shadow-lg px-4 pt-4">
          <View className="flex-row justify-between mb-2">
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[14px] text-[#868889]"
            >
              Subtotal
            </Text>
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[14px] text-[#868889]"
            >
              {formatAmount(subtotal)}
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[14px] text-[#868889]"
            >
              Shipping
            </Text>
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[14px] text-[#868889]"
            >
              ₦ {delivery.toLocaleString()}
            </Text>
          </View>
          <View className="h-[1px] my-3 border-t border-[#EBEBEB]" />
          <View className="flex-row justify-between mb-4">
            <Text
              style={{ fontFamily: "poppinsSemiBold" }}
              className="text-[16px] text-faintDark"
            >
              Total
            </Text>
            <Text
              style={{ fontFamily: "poppinsSemiBold" }}
              className="text-[16px] text-fadedDark"
            >
              ₦ {total.toLocaleString()}
            </Text>
          </View>
          <AuthButton title="Checkout" onPress={() => {}} />
        </View>
      )}
    </View>
  );
}
