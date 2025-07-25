import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HttpClient } from "../../../../api/HttpClient";
import { showToast } from "../../../ToastComponent/Toast";

export default function NotificationDetailScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { notification } = route.params;
  const { id } = route.params;
  const notificationId = id;
  const handleDeleteNotification = async () => {
    console.log(id);
    setLoading(true);
    try {
      const res = await HttpClient.delete(
        `/notifications/delete/${notificationId}`
      );
      showToast.success(res.data.message);
      console.log(res.data);
      navigation.goBack();
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFAFD" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDeleteNotification()}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={24} />
          ) : (
            <MaterialIcons name="delete" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text className="text-[14px]" style={{ fontFamily: "latoRegular" }}>
          {notification.message}
        </Text>
        <Text
          className="text-[14px] mt-6"
          style={{ fontFamily: "latoRegular" }}
        >
          Thank you!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#EB278D",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "poppinsMedium",
    flex: 1,
    textAlign: "center",
    marginLeft: -24, // visually center title between icons
  },
  body: {
    flex: 1,
    padding: 24,
  },
  detailText: {
    fontSize: 16,
    color: "#222",
    fontFamily: "poppinsRegular",
    marginBottom: 16,
  },
});
