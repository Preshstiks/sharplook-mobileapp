import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NailIcon from "../../../assets/icon/nail.svg";
import MakeupIcon from "../../../assets/icon/makeupicon.svg";
import BarbingSaloonIcon from "../../../assets/icon/clipper.svg";
import HairIcon from "../../../assets/icon/hairicon.svg";
import OptionsIcon from "../../../assets/icon/options.svg";

const categories = [
  { label: "Nails", icon: <NailIcon width={36} height={36} color="#EB278D" /> },
  {
    label: "Makeup",
    icon: <MakeupIcon width={36} height={36} color="#EB278D" />,
  },
  {
    label: "Barbing Saloon",
    icon: <BarbingSaloonIcon width={36} height={36} color="#EB278D" />,
  },
  { label: "Hair", icon: <HairIcon width={36} height={36} color="#EB278D" /> },
  {
    label: "Pedicure",
    icon: <NailIcon width={36} height={36} color="#EB278D" />,
  },
  {
    label: "Facials",
    icon: <MakeupIcon width={36} height={36} color="#EB278D" />,
  },
  {
    label: "Manicure",
    icon: <BarbingSaloonIcon width={36} height={36} color="#EB278D" />,
  },
  {
    label: "Massage",
    icon: <HairIcon width={36} height={36} color="#EB278D" />,
  },
];

export default function OtherScreen({ navigation }) {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
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
          {categories.map((cat, idx) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Categories", {
                  category: cat.label,
                });
              }}
              key={cat.label + idx}
              className="w-1/3 px-1 mb-2"
              style={{ minHeight: 120 }}
            >
              <View
                className="bg-pinklight rounded-[12px] items-center justify-center p-2"
                style={{ minHeight: 120 }}
              >
                <View className="rounded-full h-[64px] w-[64px] items-center justify-center mb-2 border border-primary">
                  {cat.icon}
                </View>
                <Text
                  className="text-[10px] text-faintDark text-center mt-1"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  {cat.label}
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
