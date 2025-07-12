import React, { useEffect } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useStatusBar } from "../../../context/StatusBarContext";

const notifications = [
  {
    title: "Today",
    data: [
      {
        id: 1,
        icon: <MaterialIcons name="cancel" size={28} color="#FF0000" />,
        title:
          "Your payment was not successful and has been refunded to your wallet",
        time: "5 min ago",
        details:
          "Your payment was not successful and has been refunded to your wallet.",
      },
      {
        id: 2,
        icon: <Ionicons name="ribbon-outline" size={28} color="#EB278D" />,
        title:
          "Team Green just booked an appointment with you, please either accept or reject",
        time: "5 min ago",
        details:
          "Team Green just booked an appointment with you, please either accept or reject the booking on time.",
        heading: "Appointment Booking",
      },
      {
        id: 3,
        icon: <Ionicons name="ribbon-outline" size={28} color="#EB278D" />,
        title:
          "You have scheduled an appointment with Heritage Spa and Beauty Services",
        time: "5 min ago",
        details:
          "You have scheduled an appointment with Heritage Spa and Beauty Services.",
      },
    ],
  },
  {
    title: "Yesterday",
    data: [
      {
        id: 4,
        icon: <Ionicons name="ribbon-outline" size={28} color="#EB278D" />,
        title: "Your payment has been received and now in escrow",
        time: "5 min ago",
        details: "Your payment has been received and now in escrow.",
      },
      {
        id: 5,
        icon: <Ionicons name="ribbon-outline" size={28} color="#EB278D" />,
        title: "Your order has been delivered",
        time: "5 min ago",
        details: "Your order has been delivered.",
      },
    ],
  },
  {
    title: "5 days ago",
    data: [
      {
        id: 6,
        icon: <Ionicons name="ribbon-outline" size={28} color="#EB278D" />,
        title: "Your order has been shipped to your delivery address",
        time: "5 min ago",
        details: "Your order has been shipped to your delivery address.",
      },
      {
        id: 7,
        icon: <Ionicons name="ribbon-outline" size={28} color="#EB278D" />,
        title: "Congratulations you just got.....",
        time: "5 min ago",
        details: "Congratulations you just got.....",
      },
    ],
  },
];

export default function NotificationList() {
  const navigation = useNavigation();
  const { setBarType } = useStatusBar();
  useEffect(() => {
    setBarType("primary");
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFAFD" }}>
      <View
        style={{
          backgroundColor: "#EB278D",
          paddingTop: 60,
          paddingBottom: 16,
          alignItems: "center",
        }}
      >
        <Text
          style={{ color: "#fff", fontSize: 16, fontFamily: "poppinsMedium" }}
        >
          Notifications
        </Text>
      </View>
      <SectionList
        sections={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={{
              fontSize: 16,
              fontFamily: "LatoBold",
              marginTop: 24,
              marginLeft: 20,
            }}
          >
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notificationItem}
            onPress={() =>
              navigation.navigate("VendorNotificationDetailScreen", {
                notification: item,
              })
            }
          >
            <View style={styles.iconContainer}>{item.icon}</View>
            <View style={{ flex: 1 }}>
              <Text
                className="text-[14px] opacity-60"
                style={{ fontFamily: "latoRegular" }}
              >
                {item.title}
              </Text>
            </View>
            <Text
              className="text-[10px] opacity-60 mt-1"
              style={{ fontFamily: "latoRegular" }}
            >
              {item.time}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, backgroundColor: "#eee", marginLeft: 72 }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFAFD",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F8BBD0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  notificationText: {
    fontSize: 15,
    color: "#222",
    fontFamily: "poppinsRegular",
  },
  timeText: {
    fontSize: 13,
    color: "#888",
    marginLeft: 8,
    minWidth: 70,
    textAlign: "right",
  },
});
