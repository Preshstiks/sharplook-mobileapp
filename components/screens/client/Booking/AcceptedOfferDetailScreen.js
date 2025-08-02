import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StatusBar,
} from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Mock data for vendors
const vendors = [
  {
    id: 1,
    name: "Heritage Spa and Beauty Services",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
    type: "In-shop",
    rating: 5.0,
    availability: "Mon-Fri",
    initials: null,
  },
  {
    id: 2,
    name: "Hair by Ire",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    verified: false,
    type: "Home Service",
    rating: 5.0,
    availability: "Mon-Fri",
    initials: null,
  },
  {
    id: 3,
    name: "Dampson Hair",
    avatar: null,
    verified: false,
    type: "Home Service",
    rating: 5.0,
    availability: "Mon-Fri",
    initials: "DL",
  },
];

export default function AcceptedOfferDetailScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white">
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View className="bg-primary pt-[60px] pb-4 px-4">
        <View className="flex-row items-center justify-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute left-4"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-white text-[16px]"
          >
            Choose Vendor
          </Text>
        </View>
      </View>
      <ScrollView className="px-4 pt-8 pb-[80px]">
        <Text
          style={{ fontFamily: "poppinsSemiBold" }}
          className="text-[18px] mb-4"
        >
          Accepted Offers
        </Text>
        <View className="w-[100px]" />

        {/* Map over vendors */}
        {vendors.map((vendor) => (
          <View key={vendor.id} className="bg-white rounded-xl shadow p-4 mb-4">
            <View className="items-center">
              {vendor.avatar ? (
                <View>
                  <Image
                    source={{ uri: vendor.avatar }}
                    className="w-20 h-20 rounded-full mb-2"
                  />
                  {vendor.verified && (
                    <View className="absolute bottom-[2px] right-[2px]">
                      <MaterialIcons
                        name="verified"
                        size={20}
                        color="#34C759"
                      />
                    </View>
                  )}
                </View>
              ) : (
                <View
                  style={{ borderRadius: 40 }}
                  className="w-20 h-20 bg-[#9095A0] mb-2 items-center justify-center"
                >
                  <Text
                    style={{ fontFamily: "latoBold" }}
                    className="text-[32px] text-white text-center"
                  >
                    {vendor.initials}
                  </Text>
                </View>
              )}
              <Text
                style={{ fontFamily: "poppinsMedium" }}
                className="text-[14px] mt-6 text-center"
              >
                {vendor.name}
              </Text>
              <View className="bg-primary my-3 px-[10px] py-1 rounded-[8px] mt-1">
                <Text
                  style={{ fontFamily: "poppinsRegular" }}
                  className="text-[10px] pt-1 text-white "
                >
                  {vendor.type}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center mt-2 mb-4 justify-between">
              <View className="flex-row items-center gap-2">
                <Ionicons name="star-outline" size={18} color="#FFD600" />
                <Text className="text-sm">{vendor.rating.toFixed(1)}</Text>
                <Text className="text-sm">Rating</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <FontAwesome
                  name="calendar-check-o"
                  size={15}
                  color="#FFD600"
                />
                <Text
                  style={{ fontFamily: "poppinsRegular" }}
                  className="text-[14px]"
                >
                  {vendor.availability}
                </Text>
                <Text
                  style={{ fontFamily: "poppinsRegular" }}
                  className="text-[14px]"
                >
                  Availability
                </Text>
              </View>
            </View>
            <View className="flex-row mt-4 space-x-2">
              <TouchableOpacity className="flex-1 bg-primary rounded-lg px-2 py-3 mr-2">
                <Text
                  style={{ fontFamily: "latoBold" }}
                  className="text-white text-center text-[14px]"
                >
                  Select Vendor
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 border border-primary rounded-lg px-2 py-3 ml-2">
                <Text
                  style={{ fontFamily: "latoBold" }}
                  className="text-primary text-[14px] text-center"
                >
                  View Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ height: 50 }} />
    </View>
  );
}
