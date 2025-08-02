import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { HttpClient } from "../../../api/HttpClient";
import { formatAmount } from "../../formatAmount";
import { EmptyData } from "../../reusuableComponents/EmptyData";
import { formatDateTime } from "../../reusuableComponents/DateConverter";

export default function WalletScreen() {
  const navigation = useNavigation();
  const [isShowBalance, setIsShowBalance] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletInfo, setWalletInfo] = React.useState();
  const toggleShowBalance = () => {
    setIsShowBalance(!isShowBalance);
  };
  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchTransactions = async () => {
  //       setLoading(true);
  //       setError(null);
  //       try {
  //         const res = await HttpClient.get("/wallet/transactions");
  //         setTransactions(res.data?.data || []);
  //       } catch (err) {
  //         setTransactions([]);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchTransactions();
  //   }, [])
  // );
  const getWalletBalance = async () => {
    setLoading(true);
    try {
      const [walletRes, transactionsRes] = await Promise.all([
        HttpClient.get("/wallet/walletDetails"),
        HttpClient.get("/wallet/transactions"),
      ]);
      setWalletInfo(walletRes.data.wallet);
      setTransactions(transactionsRes.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getWalletBalance();
    }, [])
  );
  // Skeleton loader for transaction card
  const SkeletonCard = () => (
    <View className="flex-row items-center mb-4" style={{ opacity: 0.7 }}>
      <View style={styles.skeletonAvatar} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={styles.skeletonLineShort} />
        <View style={{ flexDirection: "row", marginTop: 6 }}>
          <View style={styles.skeletonLineTiny} />
          <View style={[styles.skeletonLineTiny, { marginLeft: 8 }]} />
        </View>
      </View>
      <View style={{ alignItems: "flex-end", marginLeft: 12 }}>
        <View style={styles.skeletonLineTiny} />
        <View style={styles.skeletonLineShort} />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("ClientApp")}>
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
              {walletInfo?.balance
                ? formatAmount(walletInfo.balance)
                : formatAmount(0)}
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
              onPress={() => navigation.navigate("FundClientWallet")}
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
              onPress={() => navigation.navigate("ClientWithdrawScreen")}
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TransactionHistory", {
                  transactions: walletInfo?.transactions,
                })
              }
            >
              <Text
                className="text-primary text-[12px]"
                style={{ fontFamily: "latoBold" }}
              >
                View all
              </Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            // Show 5 skeleton cards while loading
            Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          ) : transactions?.length === 0 ? (
            <EmptyData title="No transactions found" />
          ) : (
            transactions?.slice(0, 5).map((tx, idx) => (
              <View key={tx.id || idx} className="flex-row items-center mb-4">
                <Image
                  source={require("../../../assets/icon/avatar.png")}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <View className="flex-1">
                  <Text
                    className="text-[12px]"
                    style={{ fontFamily: "poppinsMedium" }}
                  >
                    {tx?.description}
                  </Text>
                  <View className="flex-row mt-1 items-center">
                    <Text
                      className="text-[10px] text-faintDark mr-2"
                      style={{ fontFamily: "poppinsRegular" }}
                    >
                      {formatDateTime(tx?.createdAt)}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <View className="flex-row items-center gap-1">
                    <Text
                      className="text-[10px] text-faintDark mb-1"
                      style={{ fontFamily: "poppinsRegular" }}
                    >
                      {tx?.type}
                    </Text>
                    <Text
                      className={`text-[10px] mb-1 ${tx?.status === "SUCCESS" ? "text-success" : tx?.status === "failed" ? "text-[#ff0000]" : tx?.status === "pending" || tx?.status === "PENDING" ? "text-pending" : tx?.status === "paid" ? "text-[#0D9488]" : null}`}
                      style={{ fontFamily: "poppinsRegular" }}
                    >
                      {`(${tx?.status})`.toUpperCase()}
                    </Text>
                  </View>
                  <Text
                    className="text-primary text-[12px]"
                    style={{ fontFamily: "latoBold" }}
                  >
                    ₦
                    {(tx.amount || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              </View>
            ))
          )}
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
  // Skeleton styles
  skeletonAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  skeletonLineShort: {
    width: 90,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E5E7EB",
    marginTop: 4,
  },
  skeletonLineTiny: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    marginTop: 4,
  },
});
