import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  { id: "1", name: "Hair" },
  { id: "2", name: "Nails" },
  { id: "3", name: "Makeup" },
  { id: "4", name: "Massage" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-secondary" edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Service Categories</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  categoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: 250,
    alignItems: "center",
  },
  categoryText: {
    fontSize: 18,
  },
});
