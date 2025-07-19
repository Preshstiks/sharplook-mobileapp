import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Animated,
  Easing,
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
import EmptySVG from "../../../assets/img/empty.svg";
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
import { useAuth } from "../../../context/AuthContext";
import { HttpClient } from "../../../api/HttpClient";
import DefaultAvatar from "../../../assets/icon/avatar.png";
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

// SkeletonBox component for loading placeholders
function SkeletonBox({ width, height, style }) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ececec", "#f5f5f5"],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: 8,
          backgroundColor,
          marginRight: 12,
        },
        style,
      ]}
    />
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { setBarType } = useStatusBar();
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [topVendors, setTopVendors] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [allServices, setAllServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const toggleSearchBar = () => {
    setIsSearchBarActive(!isSearchBarActive);
  };
  const user = useAuth();
  useEffect(() => {
    setBarType("primary");
  }, []);
  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await HttpClient.get("/user/products/top-selling");
        setRecommendedProducts(res.data.data);
      } catch (error) {
        console.log("Error fetching recommended products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    const fetchTopVendors = async () => {
      setLoadingVendors(true);
      try {
        const res = await HttpClient.get("/user/topVendors");
        setTopVendors(res.data.data);
      } catch (error) {
        console.log("Error fetching top vendors:", error);
      } finally {
        setLoadingVendors(false);
      }
    };
    const fetchAllServices = async () => {
      setLoadingServices(true);
      try {
        const res = await HttpClient.get("/client/services");
        console.log("API response:", res.data);
        setAllServices(res.data.data); // Adjust if your API response structure differs
      } catch (error) {
        console.log("Error fetching all services:", error);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchRecommendedProducts();
    fetchTopVendors();
    fetchAllServices();
  }, []);

  console.log({ topVendors });
  const currentUser = user.user;
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
              Hello {currentUser.firstName}
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
                      // Filter services by category
                      const filteredServices = allServices.filter(
                        (service) => service.category === cat.label
                      );
                      navigation.navigate("Categories", {
                        category: cat.label,
                        services: filteredServices,
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
            {loadingVendors ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft: 20 }}
              >
                {[1, 2, 3].map((_, idx) => (
                  <SkeletonBox key={idx} width={125} height={160} />
                ))}
              </ScrollView>
            ) : topVendors.length === 0 ? (
              <View className="items-center justify-center py-8">
                <EmptySVG width={120} height={120} />
                <Text
                  className="text-[14px] text-gray-400 mt-2"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  No Top Vendors
                </Text>
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft: 20 }}
              >
                {topVendors.map((vendor, idx) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("VendorProfileScreen", {
                        vendorId: vendor.id,
                        vendorData: vendor, // Pass the full vendor object
                      })
                    }
                    key={vendor.id || idx}
                    className="w-[125px] bg-white rounded-2xl mr-3 py-4 shadow-sm overflow-hidden"
                  >
                    <Image
                      source={
                        vendor.avatar ? { uri: vendor.avatar } : DefaultAvatar
                      }
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
                        {vendor.businessName
                          ? vendor.businessName
                          : "SharpLook Salon"}
                      </Text>
                      <Text
                        style={{ fontFamily: "poppinsRegular" }}
                        className="text-[10px] opacity-60 text-fadedDark"
                      >
                        {vendor.specialties && vendor.specialties.length > 0
                          ? vendor.specialties[0]
                          : "Specialist"}
                      </Text>
                      <View className="flex-row items-center mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Ionicons
                            key={i}
                            name={
                              i < Math.round(vendor.rating)
                                ? "star"
                                : "star-outline"
                            }
                            size={16}
                            color="#FFC107"
                          />
                        ))}
                        <Text
                          style={{ fontFamily: "poppinsRegular" }}
                          className="text-[12px] text-fadedDark mt-1 ml-1"
                        >
                          {vendor.rating.toFixed(1)}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            )}

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
            {loadingProducts ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft: 20 }}
              >
                {[1, 2, 3].map((_, idx) => (
                  <SkeletonBox key={idx} width={220} height={202} />
                ))}
              </ScrollView>
            ) : recommendedProducts.length === 0 ? (
              <View className="items-center justify-center py-8">
                <EmptySVG width={120} height={120} />
                <Text
                  className="text-[14px] text-gray-400 mt-2"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  No recommended products
                </Text>
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft: 20 }}
                className="flex-row px-5 mt-4"
              >
                {recommendedProducts.map((prod, idx) => (
                  <View
                    key={prod.id || idx}
                    className="rounded-[4px] mr-4 items-center justify-center w-[220px] h-[202px] overflow-hidden shadow-sm"
                  >
                    <Image
                      source={{ uri: prod.picture }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        right: 8,
                        backgroundColor: "rgba(255,255,255,0.85)",
                        borderRadius: 6,
                        padding: 6,
                      }}
                    >
                      {/* <Text
                        style={{ fontFamily: "poppinsSemiBold", fontSize: 14 }}
                        numberOfLines={1}
                      >
                        {prod.productName}
                      </Text>
                      <Text
                        style={{ fontFamily: "poppinsRegular", fontSize: 12 }}
                      >
                        ₦{prod.price}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "poppinsRegular",
                          fontSize: 11,
                          color: "#888",
                        }}
                        numberOfLines={1}
                      >
                        By {prod.vendor?.name}
                      </Text> */}
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
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
