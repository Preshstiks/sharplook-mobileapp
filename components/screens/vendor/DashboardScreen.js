import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import MenuOpen from "../../../assets/icon/vendormenubtn.svg";
import ChatIcon from "../../../assets/icon/vendorchat.svg";
export default function DashboardScreen({ navigation }) {
  const [isShowBalance, setIsShowBalance] = useState(false);

  const toggleShowBalance = () => {
    setIsShowBalance(!isShowBalance);
  };
  // Placeholder data
  const bookings = [
    {
      id: 1,
      name: "Team green",
      date: "February 02, 2024",
      time: "11:50",
      service: "Facials",
      price: "₦2,100.00",
      avatar: require("../../../assets/img/blackman.jpg"),
    },
    {
      id: 2,
      name: "Team green",
      date: "February 02, 2024",
      time: "11:50",
      service: "Facials",
      price: "₦2,100.00",
      avatar: require("../../../assets/img/blackman.jpg"),
    },
    {
      id: 3,
      name: "Team green",
      date: "February 02, 2024",
      time: "11:50",
      service: "Facials",
      price: "₦2,100.00",
      avatar: require("../../../assets/img/blackman.jpg"),
    },
    {
      id: 4,
      name: "Team green",
      date: "February 02, 2024",
      time: "11:50",
      service: "Facials",
      price: "₦2,100.00",
      avatar: require("../../../assets/img/blackman.jpg"),
    },
  ];
  const products = [
    {
      id: 1,
      name: "Make-Up Brush",
      price: "₦6,000",
      pieces: 64,
      image: require("../../../assets/img/product1.jpg"),
    },
    {
      id: 2,
      name: "Body Scrub",
      price: "",
      pieces: 64,
      image: require("../../../assets/img/product2.jpg"),
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-[60px] pb-4 bg-white">
        <TouchableOpacity onPress={() => navigation.getParent()?.openDrawer()}>
          <MenuOpen width={30} height={30} />
        </TouchableOpacity>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("VendorChatListScreen")}
          >
            <ChatIcon width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications-outline" size={22} color="#eb278d" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome */}
      <View className="flex-row items-center justify-between px-4 mt-2 mb-4">
        <View>
          <Text
            className="text-[16px] w-[80%]"
            style={{ fontFamily: "latoBold" }}
          >
            Welcome Heritage Spa and Beauty Services!
          </Text>
        </View>
        <Image
          source={require("../../../assets/img/blackman.jpg")}
          style={{ width: 40, height: 40, resizeMode: "cover" }}
          className="rounded-full mb-2"
        />
      </View>

      {/* Balance Card */}
      <View className="bg-primary mx-4 rounded-2xl p-5 mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center gap-2">
            <Text
              className="text-white text-[12px] opacity-80"
              style={{ fontFamily: "latoBold" }}
            >
              Available Balance
            </Text>
            <TouchableOpacity onPress={toggleShowBalance}>
              <Ionicons
                name={isShowBalance ? "eye-off" : "eye"}
                size={20}
                color="#FFFFFF80"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text
              className="text-white text-[12px] opacity-80"
              style={{ fontFamily: "latoBold" }}
            >
              Transaction History
            </Text>
          </TouchableOpacity>
        </View>
        {isShowBalance ? (
          <Text
            style={{ fontFamily: "poppinsBold" }}
            className="text-white opacity-80 text-[24px]"
          >
            ₦146,500
          </Text>
        ) : (
          <View className="flex-row gap-2 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <View
                key={i}
                className="w-3 h-3 rounded-full bg-white opacity-80"
              />
            ))}
          </View>
        )}
        <View className="flex-row justify-between mt-2">
          <TouchableOpacity className="items-center flex-1" style={{ gap: 4 }}>
            <MaterialIcons name="file-download" size={28} color="white" />
            <Text
              style={{ fontFamily: "latoRegular" }}
              className="text-white text-[12px] mt-1"
            >
              Fund wallet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center flex-1" style={{ gap: 4 }}>
            <MaterialIcons name="file-upload" size={28} color="white" />
            <Text
              style={{ fontFamily: "latoRegular" }}
              className="text-white text-[12px] mt-1"
            >
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Bookings */}
      <View className="px-4 mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-[16px]" style={{ fontFamily: "poppinsMedium" }}>
            Recent Bookings
          </Text>
          <TouchableOpacity>
            <Text
              className="text-primary text-[12px]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              View all
            </Text>
          </TouchableOpacity>
        </View>
        {bookings.map((b) => (
          <View key={b.id} className="flex-row items-center mb-2">
            <Image source={b.avatar} className="w-10 h-10 rounded-full mr-3" />
            <View className="flex-1">
              <Text
                className="text-[14px]"
                style={{ fontFamily: "poppinsMedium" }}
              >
                {b.name}
              </Text>
              <Text
                className="text-[12px] text-fadedDark"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {b.date} {b.time}
              </Text>
            </View>
            <View className="items-end">
              <Text
                className="text-[12px] text-fadedDark"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {b.service}
              </Text>
              <Text
                className="text-[14px] text-primary"
                style={{ fontFamily: "latoBold" }}
              >
                {b.price}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* My Products */}
      <View className="px-4 mb-8">
        <Text
          className="text-[16px] mb-2"
          style={{ fontFamily: "poppinsMedium" }}
        >
          My Products
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {products.map((p) => (
              <View
                key={p.id}
                className="bg-gray-100 rounded-[4px] w-[220px] mr-3"
              >
                <Image
                  source={p.image}
                  className="w-[220px] h-[202px] rounded-[4px] mb-2"
                  style={{ resizeMode: "cover" }}
                />
                <View className="flex-row justify-between items-center mb-1">
                  <Text
                    className="text-[14px]"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    {p.name}
                  </Text>
                  {p.price ? (
                    <Text
                      className="text-primary text-[12px]"
                      style={{ fontFamily: "poppinsRegular" }}
                    >
                      {p.price}
                    </Text>
                  ) : null}
                </View>
                <View className="flex-row justify-between items-center">
                  <Text
                    className="text-[12px] text-[#00000066]"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    {p.pieces} pieces remaining
                  </Text>
                  <TouchableOpacity>
                    <MaterialIcons name="mode-edit" size={24} color="#eb278d" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
