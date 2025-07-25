import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { formatAmount } from "../../formatAmount";
import { formatDateTime } from "../../reusuableComponents/DateConverter";

const mockTransactions = [
  {
    id: 1,
    name: "Withdrawn from Wallet",
    amount: 2100,
    createdAt: "2024-02-02T11:50:00Z",
    status: "Successful",
    type: "Out",
    icon: "check-circle",
    iconColor: "#EB278D",
  },
  {
    id: 2,
    name: "Make-up Brush",
    amount: 2100,
    createdAt: "2024-02-02T11:50:00Z",
    status: "Successful",
    type: "In",
    icon: "check-circle",
    iconColor: "#EB278D",
  },
  {
    id: 3,
    name: "Withdrawn from Wallet",
    amount: 2100,
    createdAt: "2024-02-02T11:50:00Z",
    status: "Failed",
    type: "Out",
    icon: "close-circle",
    iconColor: "#FF3B30",
  },
  {
    id: 4,
    name: "Facials",
    amount: 2100,
    createdAt: "2024-02-02T11:50:00Z",
    status: "Successful",
    type: "In",
    icon: "check-circle",
    iconColor: "#EB278D",
  },
  {
    id: 5,
    name: "Hair",
    amount: 2100,
    createdAt: "2024-02-02T11:50:00Z",
    status: "Successful",
    type: "In",
    icon: "check-circle",
    iconColor: "#EB278D",
  },
  // ...more mock data
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function TransactionHistoryScreen({ navigation }) {
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [transactions, setTransactions] = useState(mockTransactions);

  // Filter transactions by selected month (mock logic)
  const filteredTransactions = transactions.filter((tx) => {
    const txMonth = months[new Date(tx.createdAt).getMonth()];
    return txMonth === selectedMonth;
  });

  const totalIn = filteredTransactions
    .filter((tx) => tx.type === "In")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalOut = filteredTransactions
    .filter((tx) => tx.type === "Out")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <View style={{ width: 28 }} />
      </View>
      {/* Month Filter and Totals */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.monthDropdown}>
          <Text style={styles.monthText}>{selectedMonth}</Text>
          <Ionicons name="chevron-down" size={18} color="#222" />
        </TouchableOpacity>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsText}>In ₦{formatAmount(totalIn)}</Text>
          <Text style={styles.totalsText}>Out ₦{formatAmount(totalOut)}</Text>
        </View>
      </View>
      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.txRow}>
            <View style={styles.iconWrap}>
              <Ionicons
                name={item.icon}
                size={32}
                color={item.iconColor}
                style={{ backgroundColor: "#fff", borderRadius: 16 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.txName}>{item.name}</Text>
              <Text style={styles.txDate}>
                {formatDateTime(item.createdAt)}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.txAmount}>₦{formatAmount(item.amount)}</Text>
              <Text
                style={[
                  styles.txStatus,
                  {
                    color: item.status === "Successful" ? "#1DC37A" : "#FF3B30",
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            No transactions found
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
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
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  monthDropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  monthText: {
    fontFamily: "poppinsMedium",
    fontSize: 14,
    marginRight: 4,
    color: "#222",
  },
  totalsRow: {
    flexDirection: "row",
    gap: 12,
  },
  totalsText: {
    fontFamily: "latoBold",
    fontSize: 13,
    color: "#222",
    marginLeft: 8,
  },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  iconWrap: {
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  txName: {
    fontFamily: "poppinsMedium",
    fontSize: 13,
    color: "#222",
  },
  txDate: {
    fontFamily: "poppinsRegular",
    fontSize: 11,
    color: "#888",
    marginTop: 2,
  },
  txAmount: {
    fontFamily: "latoBold",
    fontSize: 14,
    color: "#222",
  },
  txStatus: {
    fontFamily: "poppinsRegular",
    fontSize: 12,
    marginTop: 2,
  },
});
