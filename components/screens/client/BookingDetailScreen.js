import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Vendor from "../../../assets/img/blackman.jpg";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";
export default function BookingDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { booking } = route.params || {};

  return (
    <View className="flex-1 pb-[60px] bg-secondary">
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 pt-[60px] pb-4 bg-secondary"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "poppinsMedium" }} className="text-[16px]">
          Booking details
        </Text>
        <View className="relative">
          <MaterialIcons name="shopping-cart" size={24} color="#000" />
          <View className="absolute -top-1 -right-1 bg-primary rounded-full w-4 h-4 items-center justify-center">
            <Text className="text-white text-xs font-bold">0</Text>
          </View>
        </View>
      </View>
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* Status */}
        <View className="items-center mt-4 mb-2">
          <Text
            style={{ fontFamily: "poppinsSemiBold" }}
            className="text-[20px]"
          >
            {booking?.status || "Pending"}
          </Text>
          <Text
            style={{ fontFamily: "latoBold" }}
            className="text-[16px] text-[#00000080] mt-1"
          >
            Booking ID: <Text className="text-[#000]">#440404</Text>
          </Text>
          <Text
            style={{ fontFamily: "latoBold" }}
            className="text-[12px] text-[#00000080] mt-2"
          >
            11/02/2024
          </Text>
        </View>
        <View className="h-[1px] my-5 bg-[#FDE9F4]" />
        {/* Team Green */}
        <View className="mt-4 mb-2">
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[16px] mb-1"
          >
            Team Green
          </Text>
          <Text
            style={{ fontFamily: "poppinsRegular" }}
            className="text-[12px] text-faintDark2"
          >
            No 25, Dosunmu Street, Mafoluku, Oshodi, 100024, Lagos
          </Text>
          <Text
            style={{ fontFamily: "poppinsRegular" }}
            className="text-[12px] mt-1 text-faintDark2"
          >
            +2349071682117
          </Text>
        </View>
        {/* Vendor */}
        <View className="mt-3">
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[16px] mb-1"
          >
            Vendor
          </Text>
          <View className="flex-row items-center mb-2">
            <Image
              source={Vendor}
              className="w-[44px] h-[44px] rounded-full mr-3"
            />
            <View className="flex-1">
              <Text
                style={{ fontFamily: "poppinsMedium" }}
                className="text-[14px]"
              >
                {booking?.vendor}
              </Text>
              <Text
                style={{ fontFamily: "poppinsRegular" }}
                className="text-[12px] text-faintDark2"
              >
                18, Afolabi Aina Street, Ikeja, Lagos
              </Text>
            </View>
            <MaterialIcons name="chat" size={20} color="#EB278D" />
          </View>
        </View>
        {/* Booking Description */}
        <View className=" rounded-xl mt-6 pb-3 mb-4">
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[16px] mb-1"
          >
            Booking Description
          </Text>
          <View className="flex-row items-center border border-[#FCDFEE] mt-4 p-4 rounded-[8px]">
            <Image
              source={booking?.image}
              className="w-[50px] h-[50px] rounded-lg mr-4"
            />
            <View className="flex-1">
              <Text
                style={{ fontFamily: "latoRegular" }}
                className="text-[16px]"
              >
                {booking?.service}
              </Text>
              <Text
                style={{ fontFamily: "poppinsRegular" }}
                className="text-[10px] mt-3 text-faintDark2"
              >
                9:00AM July 9, 2025
              </Text>
            </View>
            <Text
              style={{ fontFamily: "latoBold" }}
              className="text-primary text-[14px] "
            >
              ₦188,528
            </Text>
          </View>
        </View>
        {/* Static Map */}
        <View className="rounded-xl h-64 mb-6 overflow-hidden bg-gray-100 relative">
          {/* Map Background */}
          <View className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 items-center justify-center">
            <MaterialIcons name="map" size={48} color="#EB278D" />
            <Text className="text-gray-500 mt-2">Map View</Text>
          </View>

          {/* Custom Markers */}
          <View className="absolute top-1/4 left-1/4">
            <View className="bg-blue-500 rounded-full p-2 border-2 border-white shadow-lg">
              <MaterialIcons name="my-location" size={16} color="white" />
            </View>
            <Text className="text-xs text-gray-600 mt-1 text-center">You</Text>
          </View>

          <View className="absolute bottom-1/4 right-1/4">
            <View className="bg-primary rounded-full p-2 border-2 border-white shadow-lg">
              <MaterialIcons name="location-on" size={16} color="white" />
            </View>
            <Text className="text-xs text-gray-600 mt-1 text-center">
              Vendor
            </Text>
          </View>

          {/* Map Controls Overlay */}
          <View className="absolute top-4 right-4">
            <TouchableOpacity
              className="bg-white rounded-full p-2 shadow-lg"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <MaterialIcons name="navigation" size={20} color="#EB278D" />
            </TouchableOpacity>
          </View>

          {/* Location Info Card */}
          <View
            className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-3 shadow-lg"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View className="flex-row items-center">
              <MaterialIcons name="access-time" size={16} color="#EB278D" />
              <Text className="ml-2 text-xs text-gray-600">
                Estimated arrival: 15 mins
              </Text>
            </View>
            <View className="flex-row items-center mt-1">
              <MaterialIcons name="directions-car" size={16} color="#EB278D" />
              <Text className="ml-2 text-xs text-gray-600">
                Distance: 2.3 km
              </Text>
            </View>
          </View>
        </View>
        {/* Action Buttons */}

        <AuthButton title="Booking Completed" isloading={false} />
        <OutlineButton title="Dispute Booking" />
      </ScrollView>
    </View>
  );
}
