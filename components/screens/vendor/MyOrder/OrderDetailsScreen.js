import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { HexConverter } from "../../../reusuableComponents/HexConverter";
import {
  DateConverter,
  formatDateTime,
} from "../../../reusuableComponents/DateConverter";
import { formatAmount } from "../../../formatAmount";

export default function OrderDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params || {};

  return (
    <View className="flex-1 pb-[40px] bg-secondary">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
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
        <Text style={{ fontFamily: "poppinsMedium" }} className="text-[18px]">
          Order details
        </Text>
        <View className="relative">
          <MaterialIcons name="shopping-cart" size={24} color="#fff" />
        </View>
      </View>

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* Status */}
        <View className="mt-6 mb-2">
          <Text
            className="text-[16px] mb-3 text-[#A5A5A5]"
            style={{ fontFamily: "poppinsMedium" }}
          >
            Order{" "}
            <Text className="text-fadedDark">{HexConverter(order?.id)}</Text>
          </Text>
          <Text
            className={`text-[14px] ${order?.status === "PENDING" ? "text-pending" : order?.status === "DELIVERED" ? "text-success" : ""}`}
            style={{ fontFamily: "poppinsMedium" }}
          >
            {order?.status === "PENDING"
              ? "Pending"
              : order?.status === "DELIVERED"
                ? "Delivered"
                : ""}
          </Text>
        </View>
        <View
          className="bg-white rounded-xl p-4 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[18px] mb-1"
          >
            Order Details
          </Text>
          <Text
            className="text-primary text-[14px] mb-1"
            style={{ fontFamily: "poppinsSemiBold" }}
          >
            {formatDateTime(order?.createdAt)}
          </Text>
          <Text
            className="text-[14px] mb-2"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Delivery Type: {order?.order?.deliveryType}
          </Text>
          <Text
            className="text-[14px] mb-2"
            style={{ fontFamily: "poppinsRegular" }}
          >
            To: {order?.order?.user?.location}
          </Text>

          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[14px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {order?.items[0]?.productName}
            </Text>
            <Text
              className="text-[16px] text-[#00000066]"
              style={{ fontFamily: "latoBold" }}
            >
              {` ${formatAmount(order?.items[0]?.price)} x ${order?.items[0]?.quantity}`}
            </Text>
          </View>
        </View>
        {/* Payment Summary */}
        <View
          className="bg-white rounded-xl p-4 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[18px] mb-1"
          >
            Payment Summary
          </Text>
          <Text
            className="text-primary text-[14px] mb-1"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Payment Date: {DateConverter(order?.createdAt)}
          </Text>
          <View className="h-[1px] mt-3 mb-4 bg-[#00000013]" />
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[14px] mb-2"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Total Payment{" "}
            </Text>
            <Text className="text-[16px]" style={{ fontFamily: "latoBold" }}>
              {formatAmount(order?.total)}
            </Text>
          </View>
        </View>
        {/* Appointment Details */}
        <View
          className="bg-white rounded-xl p-4 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[18px] mb-2"
          >
            Customer's Details
          </Text>
          <View className="flex-row justify-between mt-2 mb-1">
            <Text
              className="text-[14px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Client's Name
            </Text>
            <Text
              className="text-[14px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {order?.order?.user?.lastName} {order?.order?.user?.firstName}
            </Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[14px] text-[#00000066]"
              style={{ fontFamily: "popptotalAmountinsRegular" }}
            >
              Phone Number
            </Text>
            <Text
              className="text-[14px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {order?.order?.user?.phone}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
