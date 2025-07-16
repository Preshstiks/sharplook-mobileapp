import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const mockTransactions = [
  {
    id: 1,
    name: "Heritage Spa and Beauty Services",
    type: "Facials",
    date: "February 02, 2024",
    time: "11:50",
    amount: 2100,
    avatar: require("../../../assets/icon/avatar.png"),
  },
  ...Array(7).fill({
    id: 2,
    name: "Makeup Brush",
    type: "Product",
    date: "February 02, 2024",
    time: "11:50",
    amount: 2100,
    avatar: require("../../../assets/icon/avatar.png"),
  }),
];

export default function WalletScreen() {
  const navigation = useNavigation();
  const [isShowBalance, setIsShowBalance] = useState(false);
  const toggleShowBalance = () => {
    setIsShowBalance(!isShowBalance);
  };
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Client")}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SharpPay</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <TouchableOpacity
              className="items-center flex-1"
              style={{ gap: 4 }}
            >
              <MaterialIcons name="file-download" size={28} color="white" />
              <Text
                style={{ fontFamily: "latoRegular" }}
                className="text-white text-[12px] mt-1"
              >
                Fund wallet
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="items-center flex-1"
              style={{ gap: 4 }}
            >
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
        {/* Transaction History */}
        <View className="mt-8 px-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
              Transaction History
            </Text>
            <TouchableOpacity>
              <Text
                className="text-primary text-[12px]"
                style={{ fontFamily: "latoBold" }}
              >
                View all
              </Text>
            </TouchableOpacity>
          </View>
          {mockTransactions.map((tx, idx) => (
            <View key={idx} className="flex-row items-center mb-4">
              <Image
                source={tx.avatar}
                className="w-10 h-10 rounded-full mr-3"
              />
              <View className="flex-1">
                <Text
                  className="text-[12px]"
                  style={{ fontFamily: "poppinsMedium" }}
                >
                  {tx.name}
                </Text>
                <View className="flex-row mt-1 items-center">
                  <Text
                    className="text-[10px] text-faintDark mr-2"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    {tx.date}
                  </Text>
                  <Text
                    className="text-[10px] text-faintDark"
                    style={{ fontFamily: "poppinsRegular" }}
                  >
                    {tx.time}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text
                  className="text-[10px] text-faintDark mb-1"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  {tx.type}
                </Text>
                <Text
                  className="text-primary text-[12px]"
                  style={{ fontFamily: "latoBold" }}
                >
                  ₦
                  {tx.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    color: "#222",
    fontSize: 16,
    fontFamily: "poppinsMedium",
    flex: 1,
    textAlign: "center",
    marginLeft: -28,
  },
});
