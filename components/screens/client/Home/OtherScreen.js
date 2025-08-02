import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useCategories } from "../../../../hooks/useCategories";

// Categories will be populated dynamically from API

export default function OtherScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const allServices = route.params?.allServices || [];
  const { categories, loading: categoriesLoading } = useCategories();

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={{ width: 28 }} />
      </View>
      {/* Categories Grid */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingTop: 6,
          paddingBottom: 6,
        }}
      >
        <View className="flex-row flex-wrap">
          {categoriesLoading
            ? // Show skeleton loading for categories
              Array.from({ length: 8 }).map((_, idx) => (
                <View
                  key={idx}
                  className="w-1/3 px-1 mb-2"
                  style={{ minHeight: 120 }}
                >
                  <View
                    className="bg-gray-100 rounded-[12px] items-center justify-center p-2"
                    style={{ minHeight: 120 }}
                  >
                    <View className="rounded-full h-[64px] w-[64px] items-center justify-center mb-2 border border-gray-200 bg-gray-200" />
                    <View className="w-12 h-3 bg-gray-200 rounded mt-1" />
                  </View>
                </View>
              ))
            : categories.map((cat, idx) => (
                <TouchableOpacity
                  onPress={() => {
                    const filteredServices = allServices.filter(
                      (service) => service.serviceName === cat.name
                    );
                    navigation.navigate("Categories", {
                      category: cat.name,
                      services: filteredServices,
                    });
                  }}
                  key={cat.id}
                  className="w-1/3 px-1 mb-2"
                  style={{ minHeight: 120 }}
                >
                  <View
                    className="bg-pinklight rounded-[12px] items-center justify-center p-2"
                    style={{ minHeight: 120 }}
                  >
                    <View className="rounded-full h-[64px] w-[64px] items-center justify-center mb-2 border border-primary">
                      <Ionicons name="sparkles" size={36} color="#EB278D" />
                    </View>
                    <Text
                      className="text-[10px] text-faintDark text-center mt-1"
                      style={{ fontFamily: "poppinsRegular" }}
                    >
                      {cat.name}
                    </Text>
                  </View>
                </TouchableOpacity>
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
