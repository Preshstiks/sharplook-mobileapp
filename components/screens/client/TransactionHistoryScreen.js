import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Modal,
  Animated,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { formatAmount } from "../../formatAmount";
import { formatDateTime } from "../../reusuableComponents/DateConverter";
import { EmptyData } from "../../reusuableComponents/EmptyData";
import { useFocusEffect } from "@react-navigation/native";
import { HttpClient } from "../../../api/HttpClient";
import { UIActivityIndicator } from "react-native-indicators";

const mockTransactions = [
  {
    id: 1,
    name: "Withdrawn from Wallet",
    amount: 2100,
    createdAt: "2024-02-02T11:50:00Z",
    status: "Successful",
    type: "Out",
    icon: "checkmark-circle-sharp",
    iconColor: "#EB278D",
  },
  {
    id: 2,
    name: "Make-up Brush",
    amount: 2100,
    createdAt: "2024-02-02T11:50:00Z",
    status: "Successful",
    type: "In",
    icon: "checkmark-circle-sharp",
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
    icon: "checkmark-circle-sharp",
    iconColor: "#EB278D",
  },
  {
    id: 5,
    name: "Hair",
    amount: 2100,
    createdAt: "2024-02-02T11:50:00Z",
    status: "Successful",
    type: "In",
    icon: "checkmark-circle-sharp",
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
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Animation refs
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  // Calculate pagination values
  const totalItems = allTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allTransactions.slice(startIndex, endIndex);
  };

  const currentPageItems = getCurrentPageItems();

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await HttpClient.get("/wallet/transactions");
      setAllTransactions(res.data || []);
      setCurrentPage(1); // Reset to first page when new data loads
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top with animation
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    }
  };

  const renderPaginationItem = (
    pageNumber,
    isActive = false,
    isDisabled = false
  ) => (
    <TouchableOpacity
      key={pageNumber}
      style={[
        styles.paginationItem,
        isActive && styles.paginationItemActive,
        isDisabled && styles.paginationItemDisabled,
      ]}
      onPress={() => !isDisabled && handlePageChange(pageNumber)}
      disabled={isDisabled}
    >
      <Text
        style={[
          styles.paginationText,
          isActive && styles.paginationTextActive,
          isDisabled && styles.paginationTextDisabled,
        ]}
      >
        {pageNumber}
      </Text>
    </TouchableOpacity>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const items = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    items.push(
      <TouchableOpacity
        key="prev"
        style={[
          styles.paginationItem,
          styles.paginationArrow,
          !hasPrevPage && styles.paginationItemDisabled,
        ]}
        onPress={() => hasPrevPage && handlePageChange(currentPage - 1)}
        disabled={!hasPrevPage}
      >
        <Ionicons
          name="chevron-back"
          size={16}
          color={hasPrevPage ? "#EB278D" : "#D1D5DB"}
        />
      </TouchableOpacity>
    );

    // First page
    if (startPage > 1) {
      items.push(renderPaginationItem(1));
      if (startPage > 2) {
        items.push(
          <View key="dots1" style={styles.paginationDots}>
            <Text style={styles.paginationDotsText}>...</Text>
          </View>
        );
      }
    }

    // Visible pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(renderPaginationItem(i, i === currentPage));
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <View key="dots2" style={styles.paginationDots}>
            <Text style={styles.paginationDotsText}>...</Text>
          </View>
        );
      }
      items.push(renderPaginationItem(totalPages));
    }

    // Next button
    items.push(
      <TouchableOpacity
        key="next"
        style={[
          styles.paginationItem,
          styles.paginationArrow,
          !hasNextPage && styles.paginationItemDisabled,
        ]}
        onPress={() => hasNextPage && handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        <Ionicons
          name="chevron-forward"
          size={16}
          color={hasNextPage ? "#EB278D" : "#D1D5DB"}
        />
      </TouchableOpacity>
    );

    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationInfo}>
          <Text style={styles.paginationInfoText}>
            Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            transactions
          </Text>
        </View>
        <View style={styles.paginationButtons}>{items}</View>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View className="pt-[40px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[14px] text-faintDark"
        >
          Transaction History
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Transaction List */}
      <FlatList
        ref={flatListRef}
        data={currentPageItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.txRow}>
            <View style={styles.iconWrap}>
              {item.status === "SUCCESS" ? (
                <Ionicons
                  name="checkmark-circle-sharp"
                  size={40}
                  color="#16A34A"
                />
              ) : item.status === "failed" ? (
                <Ionicons name="close-circle" size={40} color="#DC2626" />
              ) : item.status === "PENDING" || item.status === "pending" ? (
                <MaterialIcons name="pending" size={40} color="#D97706" />
              ) : item.status === "paid" ? (
                <Ionicons
                  name="checkmark-circle-sharp"
                  size={40}
                  color="#0D9488"
                />
              ) : null}
            </View>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Text style={styles.txName}>{item.description}</Text>
              <Text style={styles.txDate}>
                {formatDateTime(item.createdAt)}
              </Text>
            </View>
            <View
              style={{ alignItems: "flex-end", minWidth: 80, paddingLeft: 12 }}
            >
              <Text style={styles.txAmount}>{formatAmount(item.amount)}</Text>
              <Text
                className="pt-2 uppercase"
                style={[
                  styles.txStatus,
                  {
                    textAlign: "right",
                    color:
                      item.status === "SUCCESS"
                        ? "#16A34A"
                        : item.status === "failed"
                          ? "#DC2626"
                          : item.status === "PENDING" ||
                              item.status === "pending"
                            ? "#D97706"
                            : "#0D9488",
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<EmptyData msg="No transaction found" />}
        ListFooterComponent={renderPagination}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />

      {/* White background bottom padding */}
      <View style={styles.bottomPadding} />

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View>
            <UIActivityIndicator color="#EB278D" size={60} />
          </View>
        </View>
      )}

      {/* Month Dropdown Modal */}
      <Modal
        visible={showMonthDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMonthDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMonthDropdown(false)}
        >
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Select Month</Text>
              <TouchableOpacity onPress={() => setShowMonthDropdown(false)}>
                <Ionicons name="close" size={24} color="#222" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.dropdownList}>
              {months.map((month) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.dropdownItem,
                    selectedMonth === month && styles.selectedDropdownItem,
                  ]}
                  onPress={() => handleMonthSelect(month)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedMonth === month &&
                        styles.selectedDropdownItemText,
                    ]}
                  >
                    {month}
                  </Text>
                  {selectedMonth === month && (
                    <Ionicons name="checkmark" size={20} color="#EB278D" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  totalsRow: {
    flexDirection: "row",
    gap: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "80%",
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownTitle: {
    fontFamily: "poppinsMedium",
    fontSize: 16,
    color: "#222",
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedDropdownItem: {
    backgroundColor: "#F7F7F7",
  },
  dropdownItemText: {
    fontFamily: "poppinsRegular",
    fontSize: 14,
    color: "#222",
  },
  selectedDropdownItemText: {
    fontFamily: "poppinsMedium",
    color: "#EB278D",
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
    fontFamily: "latoBold",
    fontSize: 10,
    color: "#888",
    marginTop: 2,
  },
  txAmount: {
    fontFamily: "latoBold",
    fontSize: 14,
    color: "#222",
  },
  txStatus: {
    fontFamily: "latoBold",
    fontSize: 10,
    marginTop: 2,
  },
  paginationContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 10,
    marginHorizontal: 16,
  },
  paginationInfo: {
    alignItems: "center",
    marginBottom: 8,
  },
  paginationInfoText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "poppinsRegular",
  },
  paginationButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  paginationItem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  paginationItemActive: {
    backgroundColor: "#EB278D",
    borderWidth: 1,
    borderColor: "#EB278D",
  },
  paginationItemDisabled: {
    opacity: 0.5,
  },
  paginationArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  paginationText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "poppinsMedium",
  },
  paginationTextActive: {
    color: "#fff",
  },
  paginationTextDisabled: {
    color: "#ccc",
  },
  paginationDots: {
    width: 20,
    alignItems: "center",
  },
  paginationDotsText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "poppinsRegular",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  loadingSpinner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
    fontFamily: "poppinsMedium",
  },
  bottomPadding: {
    height: 50,
    backgroundColor: "#fff",
  },
});
