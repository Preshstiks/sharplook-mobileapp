import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import FilterBtn from "../../../assets/icon/filter.svg";
import Masseuse from "../../../assets/img/blackman.jpg";
import NailTech from "../../../assets/img/nailtech.jpg";
import Ped from "../../../assets/img/ped.jpg";
import MakeupPromo from "../../../assets/img/makeuppromo.png";
import Refer from "../../../assets/img/refer.png";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import Menu from "../../../assets/icon/homemenubtn.svg";
import OptionsIcon from "../../../assets/icon/options.svg";
import NailIcon from "../../../assets/icon/nail.svg";
import MakeupIcon from "../../../assets/icon/makeupicon.svg";
import BarbingSaloonIcon from "../../../assets/icon/clipper.svg";
import HairIcon from "../../../assets/icon/hairicon.svg";
import ProductOne from "../../../assets/img/product1.jpg";
import ProductTwo from "../../../assets/img/product2.jpg";
import ProductThree from "../../../assets/img/product3.jpg";
import ProductFour from "../../../assets/img/product4.jpg";
import ProductFive from "../../../assets/img/product5.jpg";
import ProductSix from "../../../assets/img/product6.jpg";
import HomeImg1 from "../../../assets/img/home1.svg";
import HomeImg2 from "../../../assets/img/home2.svg";
import HomeImg3 from "../../../assets/img/home3.svg";
import HomeImg4 from "../../../assets/img/home4.svg";
import { useStatusBar } from "../../../context/StatusBarContext";
const categories = [
  {
    label: "Nails",
    icon: <NailIcon width={24} height={24} color="#EB278D" />,
  },
  {
    label: "Makeup",
    icon: <MakeupIcon width={24} height={24} color="#EB278D" />,
  },
  {
    label: "Barbing Saloon",
    icon: <BarbingSaloonIcon width={24} height={24} color="#EB278D" />,
  },
  {
    label: "Hair",
    icon: <HairIcon width={24} height={24} color="#EB278D" />,
  },
  {
    label: "Other",
    icon: <OptionsIcon width={28} height={28} color="#EB278D" />,
  },
];

const topVendors = [
  {
    name: "Alison Leema",
    role: "Masseuse",
    image: Masseuse,
    rating: 4,
  },
  {
    name: "Temilolu",
    role: "Nail Technician",
    image: NailTech,
    rating: 4,
  },
  {
    name: "Alison Leema",
    role: "Pedicure Spec.",
    image: Ped,
    rating: 4,
  },
  {
    name: "Sarah Johnson",
    role: "Hair Stylist",
    image: Masseuse,
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Makeup Artist",
    image: NailTech,
    rating: 4,
  },
];

const recommendedProducts = [
  { image: ProductOne },
  { image: ProductTwo },
  { image: ProductThree },
  { image: ProductFour },
  { image: ProductFive },
  { image: ProductSix },
];

const bestOffers = [
  {
    title: "For all Makeup",
    discount: "40% OFF",
    bg: "bg-[#FCDFEE]",
    img: MakeupPromo,
  },
  {
    title: "Refer friends to get",
    discount: "10% OFF",
    bg: "bg-[#BAB9BA]",
    img: Refer,
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const { setBarType } = useStatusBar();
  const toggleSearchBar = () => {
    setIsSearchBarActive(!isSearchBarActive);
  };

  useEffect(() => {
    setBarType("secondary");
  }, []);
  return (
    <View className="flex-1 bg-secondary">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-[40px] items-center justify-between flex-row">
          <View>
            <Text
              style={{ fontFamily: "poppinsSemiBold" }}
              className="text-[18px]"
            >
              Hello Team Green
            </Text>
            <Text
              style={{ fontFamily: "poppinsRegular" }}
              className="text-[14px]"
            >
              Welcome to Sharplook
            </Text>
          </View>
          <View className="items-center flex-row gap-[12px]">
            <TouchableOpacity
              className="relative"
              onPress={() => navigation.navigate("ChatListScreen")}
            >
              <Entypo name="chat" size={24} color="#EB278D" />
              <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary items-center justify-center">
                <Text className="text-[8px] text-white font-medium">2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="relative"
              onPress={() => navigation.navigate("CartScreen")}
            >
              <Feather name="shopping-cart" size={24} color="#EB278D" />
              <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary items-center justify-center">
                <Text className="text-[8px] text-white font-medium">2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Menu width={30} height={30} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Search Bar */}
        <View className="flex-row items-center px-4 mt-6">
          <View className="flex-row items-center flex-1 bg-secondary border border-[#F9BCDC] rounded-xl px-4 mr-3">
            <Pressable onPress={() => toggleSearchBar()}>
              {isSearchBarActive ? (
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="#8c817a"
                />
              ) : (
                <MaterialIcons name="search" size={24} color="#8c817a" />
              )}
            </Pressable>
            <TextInput
              className="ml-2 text-xs pb-4 pt-5 placeholder:text-faintDark2"
              placeholder="Search Shop or Vendor"
              cursorColor="#EB278D"
              style={{ fontFamily: "poppinsRegular" }}
              onFocus={() => setIsSearchBarActive(true)}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
            <FilterBtn width={35} height={35} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* Categories */}
        {isSearchBarActive ? (
          <ScrollView className="mt-8 px-4 space-y-4">
            {[
              {
                id: 1,
                title: "Swedish Massage by Ayo",
                image: HomeImg1,
              },
              {
                id: 2,
                title: "Matoty Facials",
                image: HomeImg2,
              },
              {
                id: 3,
                title: "Salt Body Scrub",
                image: HomeImg3,
              },
              {
                id: 4,
                title: "Hot Stone Therapy",
                image: HomeImg4,
              },
            ].map((service) => {
              return (
                <Pressable
                  key={service.id}
                  onPress={() => navigation.navigate("VendorProfileScreen")}
                  className="bg-[#FCDFEE] mb-6 rounded-2xl overflow-hidden shadow-md"
                  style={{ elevation: 2 }}
                >
                  <View style={{ height: 150, width: "100%" }}>
                    <service.image width="100%" height={150} />
                  </View>
                  <View className="p-4">
                    <Text
                      className="text-base font-medium text-faintDark"
                      style={{ fontFamily: "poppinsRegular" }}
                    >
                      {service.title}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        ) : (
          <View>
            <View className="flex-row justify-between mt-6 px-2">
              {categories.map((cat, idx) => (
                <TouchableOpacity
                  key={cat.label}
                  className="items-center flex-1"
                  onPress={() => {
                    if (cat.label !== "Other") {
                      navigation.navigate("Categories", {
                        category: cat.label,
                      });
                    } else {
                      navigation.navigate("OtherScreen");
                    }
                  }}
                >
                  <View className="rounded-full h-[54px] w-[54px] items-center justify-center mb-1 border border-primary">
                    {cat.icon}
                  </View>
                  <Text
                    style={{ fontFamily: "latoRegular" }}
                    className="text-[10px] text-faintDark text-center mt-0.5"
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Top Vendors */}
            <View className="flex-row items-center justify-between mt-8 mb-4 px-5">
              <Text
                style={{ fontFamily: "poppinsMedium" }}
                className="text-[16px] text-fadedDark"
              >
                Top Vendors
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingLeft: 20 }}
            >
              {topVendors.map((vendor, idx) => (
                <Pressable
                  onPress={() => navigation.navigate("VendorProfileScreen")}
                  key={vendor.name + idx}
                  className="w-[125px] bg-white rounded-2xl mr-3 py-4 shadow-sm overflow-hidden"
                >
                  <Image
                    source={vendor.image}
                    style={{
                      width: "100%",
                      height: 100,
                      marginBottom: 8,
                      marginTop: -16,
                    }}
                    resizeMode="cover"
                  />
                  <View className="px-[10px]">
                    <Text
                      style={{ fontFamily: "poppinsRegular" }}
                      className="text-[12px] text-fadedDark mt-0.5"
                    >
                      {vendor.name}
                    </Text>
                    <Text
                      style={{ fontFamily: "poppinsRegular" }}
                      className="text-[10px] opacity-60 text-fadedDark"
                    >
                      {vendor.role}
                    </Text>
                    <View className="flex-row items-center mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Ionicons
                          key={i}
                          name={i < vendor.rating ? "star" : "star-outline"}
                          size={16}
                          color="#FFC107"
                        />
                      ))}
                      <Text
                        style={{ fontFamily: "poppinsRegular" }}
                        className="text-[12px] text-fadedDark mt-1 ml-1"
                      >
                        {vendor.rating}.0
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
            {/* Recommended Products */}
            <View className="flex-row items-center justify-between mt-8 px-5">
              <Text
                style={{ fontFamily: "poppinsMedium" }}
                className="text-[16px] text-fadedDark"
              >
                Recommended Products
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ fontFamily: "poppinsRegular" }}
                  className="text-primary text-[12px]"
                >
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingLeft: 20 }}
              className="flex-row px-5 mt-4"
            >
              {recommendedProducts.map((prod, idx) => (
                <View
                  key={idx}
                  className="rounded-[4px] mr-4 items-center justify-center w-[220px] h-[202px] overflow-hidden shadow-sm"
                >
                  <Image
                    source={prod.image}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </ScrollView>
            {/* Best Offers */}
            <View className="mt-8 px-5 pb-[40px]">
              <Text
                style={{ fontFamily: "poppinsMedium" }}
                className="text-[16px] text-fadedDark"
              >
                Best Offers
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row mt-3">
                  {bestOffers.map((offer, idx) => (
                    <View
                      key={idx}
                      className={`w-[200px] rounded-[8px] pt-5 pb-4 pl-5 mr-3 ${offer.bg}`}
                    >
                      <View>
                        <Text
                          style={{ fontFamily: "poppinsRegular" }}
                          className="text-[12px]"
                        >
                          {offer.title}
                        </Text>
                        <Text
                          style={{ fontFamily: "poppinsSemiBold" }}
                          className={`text-[20px] ${offer.color}`}
                        >
                          {offer.discount}
                        </Text>
                      </View>
                      <Image
                        className="absolute right-0 bottom-0"
                        source={offer.img}
                        style={{ width: 70, height: 70 }}
                      />
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
