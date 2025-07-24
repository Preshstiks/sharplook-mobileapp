import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { HttpClient } from "../../../../api/HttpClient";
import EmptySVG from "../../../../assets/img/empty.svg";

export default function NotificationList() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      const fetchNotifications = async () => {
        setLoading(true);
        try {
          const res = await HttpClient.get("/notifications/getNotifications");
          setNotifications(res.data?.data || []);
        } catch (error) {
          setNotifications([]);
        } finally {
          setLoading(false);
        }
      };
      fetchNotifications();
    }, [])
  );

  if (loading) {
    // Skeleton loader for notifications (no section headers)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFAFD",
        }}
      >
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
        <View style={{ paddingHorizontal: 0, paddingTop: 16 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={styles.notificationItem}>
              <View style={styles.iconContainer}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: "#e0e0e0",
                  }}
                />
              </View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <View
                  style={{
                    height: 14,
                    width: "80%",
                    backgroundColor: "#e0e0e0",
                    borderRadius: 4,
                    marginBottom: 6,
                  }}
                />
              </View>
              <View
                style={{
                  height: 10,
                  width: 40,
                  backgroundColor: "#e0e0e0",
                  borderRadius: 4,
                  alignSelf: "center",
                }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (!loading && (!notifications || notifications.length === 0)) {
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            marginTop: -30,
          }}
        >
          <EmptySVG width={120} height={120} />
          <Text
            className="text-faintDark"
            style={{
              fontFamily: "poppinsRegular",
              fontSize: 14,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            Oops! You have no notification
          </Text>
        </View>
      </View>
    );
  }

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
        keyExtractor={(item) =>
          item.id?.toString?.() || Math.random().toString()
        }
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
              navigation.navigate("NotificationDetailScreen", {
                notification: item,
              })
            }
          >
            <View style={styles.iconContainer}>
              {item.icon ? (
                item.icon
              ) : (
                <Ionicons
                  name="notifications-outline"
                  size={28}
                  color="#EB278D"
                />
              )}
            </View>
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
