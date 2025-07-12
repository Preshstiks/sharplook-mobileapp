import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import FilterBtn from "../../../assets/icon/filter.svg";
import ChatIcon from "../../../assets/icon/chat.svg";
import { useNavigation } from "@react-navigation/native";
import { useStatusBar } from "../../../context/StatusBarContext";

const products = [
  {
    id: 1,
    title: "AC Power Supply",
    desc: "Lorem ipsum dolor sit amet.",
    vendor: "Mhildv Store",
    price: 176000,
    image: require("../../../assets/img/product1.jpg"),
    rating: 4.5,
    reviews: 335566,
  },
  {
    id: 2,
    title: "Set of Screwdrivers",
    desc: "Lorem ipsum dolor sit amet.",
    vendor: "Mhildv Store",
    price: 176000,
    image: require("../../../assets/img/product2.jpg"),
    rating: 3.5,
    reviews: 152344,
  },
  {
    id: 3,
    title: "Insulated Gloves",
    desc: "Lorem ipsum dolor sit amet.",
    vendor: "Mhildv Store",
    price: 176000,
    image: require("../../../assets/img/product3.jpg"),
    rating: 5,
    reviews: 523456,
  },
  {
    id: 4,
    title: "Power Analyzer",
    desc: "Lorem ipsum dolor sit amet.",
    vendor: "Mhildv Store",
    price: 176000,
    image: require("../../../assets/img/product4.jpg"),
    rating: 4,
    reviews: 45478,
  },
  {
    id: 5,
    title: "Oscilloscope Probe",
    desc: "Lorem ipsum dolor sit amet.",
    vendor: "Mhildv Store",
    price: 176000,
    image: require("../../../assets/img/product5.jpg"),
    rating: 4.5,
    reviews: 335566,
  },
  {
    id: 6,
    title: "Microcontroller Board",
    desc: "Lorem ipsum dolor sit amet.",
    vendor: "Mhildv Store",
    price: 176000,
    image: require("../../../assets/img/product6.jpg"),
    rating: 3,
    reviews: 27344,
  },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function Market() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const { setBarType } = useStatusBar();
  React.useEffect(() => {
    setBarType("secondary");
  }, []);

  const renderProduct = ({ item }) => (
    <View
      style={{ width: CARD_WIDTH, marginBottom: 18 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden mr-3"
    >
      <Image
        source={item.image}
        style={{ width: "100%", height: 110 }}
        resizeMode="cover"
      />
      <View className="p-3">
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[16px] text-faintDark mb-1"
        >
          {item.title}
        </Text>
        <Text
          style={{ fontFamily: "latoRegular" }}
          className="text-[10px] text-[#A9A9A9] mb-1"
        >
          {item.desc}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text style={{ fontFamily: "latoBold" }} className="text-[10px] my-2">
            Vendor: {item.vendor}
          </Text>
          <MaterialIcons name="chat" size={20} color="#EB278D" />
        </View>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[13px] text-faintDark mb-1"
        >
          ₦ {item.price.toLocaleString()}
        </Text>
        <View className="flex-row items-center justify-between mt-1">
          <View className="flex-row items-center">
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name={i < Math.floor(item.rating) ? "star" : "star-outline"}
                size={14}
                color="#FFC107"
              />
            ))}
            <Text
              style={{ fontFamily: "latoRegular" }}
              className="text-[10px] ml-1 text-[#A9A9A9]"
            >
              {item.reviews.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

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
          52,082+ Items
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
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      />
    </View>
  );
}
