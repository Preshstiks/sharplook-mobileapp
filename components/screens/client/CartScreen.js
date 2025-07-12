import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import { useNavigation } from "@react-navigation/native";

const cartItems = [
  {
    id: 1,
    name: "Dr. Teal Body Wash",
    price: 176000,
    image: require("../../../assets/img/product1.jpg"),
    weight: 1.6,
    quantity: 1,
  },
  {
    id: 2,
    name: "Set of Makeup",
    price: 176000,
    image: require("../../../assets/img/product2.jpg"),
    weight: 1.6,
    quantity: 1,
  },
];

export default function CartScreen() {
  const navigation = useNavigation();
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 2000;
  const total = subtotal + delivery;

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
      {/* Cart Items */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-20">
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[16px] text-faintDark"
            >
              Your cart is empty
            </Text>
          </View>
        ) : (
          items.map((item) => (
            <View
              key={item.id}
              className="flex-row bg-white rounded-[8px] shadow-sm mb-4 p-3 items-center"
            >
              <Image
                source={item.image}
                className="w-[100px] h-[100px] rounded-xl mr-3"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text
                  style={{ fontFamily: "poppinsSemiBold" }}
                  className="text-[16px] text-faintDark"
                >
                  {item.name}
                </Text>
                <Text
                  style={{ fontFamily: "poppinsMedium" }}
                  className="text-[12px] text-primary"
                >
                  ₦ {item.price.toLocaleString()}
                </Text>
                <View className="flex-row items-center">
                  <Text
                    style={{ fontFamily: "latoRegular" }}
                    className="text-[13px] text-faintDark"
                  >
                    {item.weight} lbs
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
                onPress={() => removeItem(item.id)}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={24}
                  color="#EB278D"
                />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      {/* Summary & Checkout */}
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
            ₦ {subtotal.toLocaleString()}
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
    </View>
  );
}
