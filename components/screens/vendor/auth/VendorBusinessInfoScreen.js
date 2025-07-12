import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { AuthInput } from "../../../reusuableComponents/inputFields/AuthInput";
import { useStatusBar } from "../../../../context/StatusBarContext";

export default function VendorBusinessInfoScreen({ navigation }) {
  const { setBarType } = useStatusBar();
  useEffect(() => {
    setBarType("primary");
  }, []);
  const [form, setForm] = React.useState({
    businessName: "",
    businessDescription: "",
    location: "",
    registrationNumber: "",
    portfolioLink: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View className="pb-[60px]" style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#EB278D",
          paddingTop: 60,
          paddingBottom: 16,
          paddingHorizontal: 16,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
        </Pressable>
        <Text
          style={{ color: "#fff", fontFamily: "poppinsMedium", fontSize: 16 }}
        >
          Vendor's Information
        </Text>
        <TouchableOpacity onPress={() => navigation.replace("Home")}>
          {" "}
          {/* Replace with your skip logic */}
          <Text
            style={{
              color: "#fff",
              fontFamily: "poppinsRegular",
              fontSize: 10,
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontFamily: "poppinsMedium",
              fontSize: 16,
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            Please fill in the information below
          </Text>
          {/* Business Name */}
          <AuthInput label="Business Name" />
          <AuthInput label="Business Description" />
          <AuthInput label="Location" />
          <AuthInput label="Business Registration Number" />
          <AuthInput label="Portfolio Link" />
        </ScrollView>
      </View>

      {/* Button at bottom */}
      <View style={{ padding: 20, paddingBottom: 30 }}>
        <AuthButton
          title="Continue"
          onPress={() =>
            navigation.navigate("Vendor", { screen: "AddLocation" })
          }
          isloading={false}
        />
      </View>
    </View>
  );
}
