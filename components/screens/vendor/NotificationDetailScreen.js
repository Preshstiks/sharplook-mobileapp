import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { showToast } from "../../ToastComponent/Toast";
import { HttpClient } from "../../../api/HttpClient";

export default function NotificationDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { notification } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFAFD" }}>
      {/* Header */}
      <View className="pt-[40px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#201E1F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "latoBold" }}
          className="text-[14px] text-faintDark"
        >
          Notification Details
        </Text>
        <View style={{ width: 26 }} />
      </View>
      <View style={styles.body}>
        {notification.message.includes("booking") && (
          <Text
            className="text-[16px] font-bold mb-6"
            style={{ fontFamily: "poppinsBold" }}
          >
            Booking Notification
          </Text>
        )}
        <Text
          className="text-[14px] mb-4"
          style={{ fontFamily: "latoRegular" }}
        >
          {notification.message}
        </Text>
        <Text
          className="text-[14px] mt-6"
          style={{ fontFamily: "latoRegular" }}
        >
          Thank you!
        </Text>
      </View>
      {/* Accept/Reject Buttons */}
      {notification.heading === "Appointment Booking" && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            className="bg-primary text-white w-[48%] py-4 px-4 rounded-[12px]"
            onPress={() => handleSubmit("ACCEPTED")}
          >
            <Text
              className="text-[14px] text-white text-center"
              style={{ fontFamily: "poppinsMedium" }}
            >
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border border-primary text-white w-[48%] py-4 px-4 rounded-[12px]"
            onPress={() => handleSubmit("REJECTED")}
          >
            <Text
              className="text-[14px] text-primary text-center"
              style={{ fontFamily: "poppinsMedium" }}
            >
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
    marginLeft: -28, // visually center title between icons
  },
  body: {
    flex: 1,
    padding: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 64,
    gap: 16,
  },

  acceptText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "poppinsMedium",
  },
  rejectBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#EB278D",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginLeft: 8,
  },
  rejectText: {
    color: "#EB278D",
    fontSize: 16,
    fontFamily: "poppinsBold",
  },
});
