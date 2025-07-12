import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";

export default function MyProductsScreen({ navigation }) {
  const products = [
    {
      id: 1,
      name: "Make up Brush",
      price: "₦188,528.00",
      pieces: 64,
      image: require("../../../assets/img/product1.jpg"),
    },
    {
      id: 2,
      name: "Nail Polish",
      price: "₦12,000.00",
      pieces: 120,
      image: require("../../../assets/img/product2.jpg"),
    },
    {
      id: 3,
      name: "Facial Scrub",
      price: "₦8,500.00",
      pieces: 80,
      image: require("../../../assets/img/product3.jpg"),
    },
    {
      id: 4,
      name: "Hair Dryer",
      price: "₦45,000.00",
      pieces: 30,
      image: require("../../../assets/img/product4.jpg"),
    },
    {
      id: 5,
      name: "Lipstick Set",
      price: "₦22,000.00",
      pieces: 50,
      image: require("../../../assets/img/product5.jpg"),
    },
    {
      id: 6,
      name: "Pedicure Kit",
      price: "₦15,000.00",
      pieces: 40,
      image: require("../../../assets/img/product6.jpg"),
    },
    {
      id: 7,
      name: "Makeup Remover",
      price: "₦6,000.00",
      pieces: 90,
      image: require("../../../assets/img/product1.jpg"),
    },
    {
      id: 8,
      name: "Beauty Blender",
      price: "₦5,500.00",
      pieces: 100,
      image: require("../../../assets/img/product2.jpg"),
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      <View
        className="pt-[60px] mb-5 pb-[20px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          backgroundColor: "#fff",
        }}
      >
        <View>
          <Text
            className="text-center"
            style={{ fontSize: 18, fontFamily: "latoBold" }}
          >
            My Products
          </Text>
        </View>
      </View>
      <View className="px-6">
        <AuthButton
          iconRight={<Feather name="plus" size={16} color="#fff" />}
          title="Add New Product"
          onPress={() => navigation.navigate("AddProduct")}
        />
        <View className="flex-row flex-wrap mt-10 justify-between">
          {products.map((p) => (
            <View
              key={p.id}
              className="bg-white rounded-[12px] w-[48%] mb-4 shadow border border-pinklight"
            >
              <Image
                source={p.image}
                className="w-full h-[110px] rounded-t-[12px] mb-2"
                style={{ resizeMode: "cover" }}
              />
              <View className="p-3">
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  {p.name}
                </Text>
                <Text
                  className="text-primary text-[14px]"
                  style={{ fontFamily: "latoBold" }}
                >
                  {p.price}
                </Text>
                <View className="flex-row items-center justify-between">
                  <Text
                    className="text-[8px] mt-1 text-[#00000066] mb-1"
                    style={{ fontFamily: "latoBold" }}
                  >
                    {p.pieces} pieces remaining
                  </Text>
                  <TouchableOpacity>
                    <MaterialIcons name="mode-edit" size={16} color="#eb278d" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
