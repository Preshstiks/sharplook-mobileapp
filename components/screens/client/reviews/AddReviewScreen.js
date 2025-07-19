import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import OutlineTextInput, {
  OutlineTextAreaInput,
} from "../../../reusuableComponents/inputFields/OutlineTextInput";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";

export default function AddReviewScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [star, setStar] = useState(5);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View
        style={{
          backgroundColor: "#EB278D",
          paddingTop: 50,
          paddingBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "poppinsMedium" }}
          className="text-[16px] text-white"
        >
          Add Review
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <View className="flex-1 px-4 mt-6">
        <OutlineTextInput
          label="Name"
          placeholder="Type your name"
          value={name}
          onChangeText={setName}
        />
        <OutlineTextAreaInput
          label="How was your experience?"
          placeholder="Describe your experience?"
          value={experience}
          onChangeText={setExperience}
        />

        <View className="flex-row justify-between mt-2 items-center">
          <Text className="text-[12px]" style={{ fontFamily: "poppinsMedium" }}>
            Star
          </Text>
          <Text
            className="text-[15px] text-primary ml-auto"
            style={{ fontFamily: "poppinsBold" }}
          >
            {star.toFixed(1)}
          </Text>
        </View>
        <View className="flex-row items-center mb-8">
          <Text className="text-[12px] mr-2">1.0</Text>
          <Slider
            style={{ flex: 1, height: 40 }}
            minimumValue={1}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#EB278D"
            maximumTrackTintColor="#F6F6F6"
            thumbTintColor="#EB278D"
            value={star}
            onValueChange={setStar}
          />
          <Text className="text-[12px] ml-2">5.0</Text>
        </View>
      </View>
      <View className="px-4 mb-8">
        <AuthButton title="Submit Review" />
      </View>
    </View>
  );
}
