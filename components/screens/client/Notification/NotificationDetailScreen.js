import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NotificationDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { notification } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFAFD" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="delete" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text className="text-[14px]" style={{ fontFamily: "latoRegular" }}>
          {notification.details}
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
