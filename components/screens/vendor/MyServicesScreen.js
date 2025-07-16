import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import { HttpClient } from "../../../api/HttpClient";
import EmptySVG from "../../../assets/img/empty.svg";
import { formatAmount } from "../../formatAmount";

function SkeletonLoader() {
  return (
    <View className="flex-row flex-wrap mt-10 justify-between px-1">
      {[1, 2, 3, 4].map((i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#f3f3f3",
            borderRadius: 12,
            width: "48%",
            marginBottom: 16,
            height: 180,
            padding: 8,
          }}
        >
          <View
            style={{
              width: "100%",
              height: 110,
              borderRadius: 12,
              backgroundColor: "#e0e0e0",
              marginBottom: 8,
            }}
          />
          <View
            style={{
              width: "70%",
              height: 14,
              borderRadius: 7,
              backgroundColor: "#e0e0e0",
              marginBottom: 6,
            }}
          />
          <View
            style={{
              width: "40%",
              height: 12,
              borderRadius: 6,
              backgroundColor: "#e0e0e0",
              marginBottom: 8,
            }}
          />
          <View
            style={{
              width: "60%",
              height: 12,
              borderRadius: 6,
              backgroundColor: "#e0e0e0",
            }}
          />
        </View>
      ))}
    </View>
  );
}

export default function MyServicesScreen({ navigation }) {
  // Dummy data for services
  const dummyServices = [
    {
      id: 1,
      productName: "Classic Manicure",
      price: 5000,
      qtyAvailable: 10,
      picture:
        "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
    },
    {
      id: 2,
      productName: "Deluxe Pedicure",
      price: 7000,
      qtyAvailable: 7,
      picture:
        "https://images.pexels.com/photos/3993448/pexels-photo-3993448.jpeg",
    },
    {
      id: 3,
      productName: "Facial Treatment",
      price: 12000,
      qtyAvailable: 5,
      picture:
        "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg",
    },
    {
      id: 4,
      productName: "Hair Styling",
      price: 8000,
      qtyAvailable: 12,
      picture:
        "https://images.pexels.com/photos/3993446/pexels-photo-3993446.jpeg",
    },
  ];
  const [products] = useState(dummyServices);
  const [loading] = useState(false);

  // Remove useFocusEffect and API call
  console.log({ products });
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
            My Services
          </Text>
        </View>
      </View>
      <View className="px-6">
        <AuthButton
          iconRight={<Feather name="plus" size={16} color="#fff" />}
          title="Add New Service"
          onPress={() => navigation.navigate("AddServices")}
        />
        {loading ? (
          <SkeletonLoader />
        ) : products.length === 0 ? (
          <View className="items-center justify-center py-8">
            <EmptySVG width={120} height={120} />
            <Text
              className="text-[14px] text-gray-400 mt-2"
              style={{ fontFamily: "poppinsRegular" }}
            >
              No services found
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap mt-10 justify-between">
            {products.map((p) => (
              <View
                key={p.id}
                className="bg-white rounded-[12px] w-[48%] mb-4 shadow border border-pinklight"
              >
                <Image
                  source={{ uri: p.picture }}
                  className="w-full h-[110px] rounded-t-[12px] mb-2"
                  style={{ resizeMode: "cover" }}
                />
                <View className="p-3">
                  <Text
                    className="text-[14px]"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    {p.productName}
                  </Text>
                  <Text
                    className="text-primary text-[14px]"
                    style={{ fontFamily: "latoBold" }}
                  >
                    {formatAmount(p.price)}
                  </Text>
                  <TouchableOpacity className="bg-primary py-2 rounded-[8px] mt-3">
                    <Text
                      style={{ fontFamily: "poppinsRegular" }}
                      className="text-[11px] text-center text-white"
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
