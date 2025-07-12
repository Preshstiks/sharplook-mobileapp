import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

export default function AddReviewScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [star, setStar] = useState(5);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-12 pb-4 px-4 flex-row items-center justify-between bg-primary">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text
          className="text-lg font-bold text-white"
          style={{ fontFamily: "poppinsBold" }}
        >
          Add Review
        </Text>
        <View style={{ width: 22 }} />
      </View>
      <View className="flex-1 px-4 mt-6">
        <Text
          className="text-[15px] mb-2"
          style={{ fontFamily: "poppinsRegular" }}
        >
          Name
        </Text>
        <TextInput
          className="border border-pink-200 rounded-lg px-4 py-2 mb-4 text-[15px]"
          placeholder="Type your name"
          value={name}
          onChangeText={setName}
          style={{ fontFamily: "poppinsRegular" }}
        />
        <Text
          className="text-[15px] mb-2"
          style={{ fontFamily: "poppinsRegular" }}
        >
          How was your experience ?
        </Text>
        <TextInput
          className="border border-pink-200 rounded-lg px-4 py-2 mb-4 text-[15px] min-h-[100px]"
          placeholder="Describe your experience?"
          value={experience}
          onChangeText={setExperience}
          multiline
          numberOfLines={4}
          style={{
            fontFamily: "poppinsRegular",
            minHeight: 100,
            textAlignVertical: "top",
          }}
        />
        <Text
          className="text-[15px] mb-2"
          style={{ fontFamily: "poppinsRegular" }}
        >
          Star
        </Text>
        <View className="flex-row items-center mb-8">
          <Text className="text-[13px] text-gray-500 mr-2">0.0</Text>
          <Slider
            style={{ flex: 1, height: 40 }}
            minimumValue={0}
            maximumValue={5}
            step={0.1}
            minimumTrackTintColor="#EB278D"
            maximumTrackTintColor="#F6F6F6"
            thumbTintColor="#EB278D"
            value={star}
            onValueChange={setStar}
          />
          <Text className="text-[13px] text-gray-500 ml-2">5.0</Text>
        </View>
        <TouchableOpacity
          className="bg-primary rounded-xl py-4 items-center mt-8"
          onPress={() => {}}
        >
          <Text
            className="text-white text-[17px] font-bold"
            style={{ fontFamily: "poppinsBold" }}
          >
            Submit Review
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
