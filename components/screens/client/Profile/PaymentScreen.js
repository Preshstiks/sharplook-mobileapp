import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PaymentScreen() {
  const navigation = useNavigation();

  // Reusable data array
  const paymentData = [
    {
      id: 1,
      title: "Accepted payment methods",
      content:
        "We accept card payments, bank transfers, USSD, and wallet balance.",
    },
    {
      id: 2,
      title: "Funding your wallet",
      content:
        "Go to “SharpPay” → “Fund Wallet” → Choose Paystack and follow the payment steps.",
    },
    {
      id: 3,
      title: "Payment security & refunds",
      content:
        "All transactions are secure. Refunds are processed based on our policy if services aren’t delivered.",
    },
  ];

  // Reusable card component
  const HelpCard = ({ title, content, icon }) => (
    <TouchableOpacity className="bg-white rounded-xl px-4 py-4 mb-3 shadow-sm border border-[#F6F6F6]">
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text
            className="text-[16px] mb-1"
            style={{ fontFamily: "poppinsSemiBold" }}
          >
            {title}
          </Text>
          <Text
            className="text-[14px] text-[#00000080]"
            style={{ fontFamily: "poppinsRegular" }}
          >
            {content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-[40px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[16px] text-faintDark"
        >
          Payments
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Cards */}
      <View className="px-4 mt-4">
        {paymentData.map((item) => (
          <HelpCard
            key={item.id}
            title={item.title}
            content={item.content}
            icon={item.icon}
          />
        ))}
      </View>
    </View>
  );
}
