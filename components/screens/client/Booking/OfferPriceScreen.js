import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import OutlineTextInput from "../../../reusuableComponents/inputFields/OutlineTextInput";
import Dropdown from "../../../reusuableComponents/inputFields/Dropdown";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import * as ImagePicker from "expo-image-picker";
export default function OfferPriceScreen() {
  const navigation = useNavigation();
  const [offerAmount, setOfferAmount] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Mock service options - you can replace with actual data
  const serviceOptions = [
    { label: "Nails", value: "Nails" },
    { label: "Barbing Saloon", value: "Barbing Saloon" },
    { label: "Makeup", value: "Makeup" },
    { label: "Pedicure", value: "Pedicure" },
    { label: "Manicure", value: "Manicure" },
    { label: "Hair", value: "Hair" },
    { label: "Massage", value: "Massage" },
  ];
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmitOffer = () => {
    // TODO: Implement offer submission logic
    console.log("Submit offer:", {
      offerAmount,
      selectedService,
      selectedImage,
    });
  };

  return (
    <View className="flex-1 bg-secondary">
      {/* Header */}
      <View className="bg-primary pt-[60px] pb-4 px-4">
        <View className="flex-row items-center">
          <Pressable onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-white text-[16px] flex-1 text-center"
          >
            Offer a Price
          </Text>
        </View>
      </View>

      {/* Form Content */}
      <ScrollView
        className="flex-1 px-4 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Offer Amount */}
        <OutlineTextInput
          label="Offer Amount"
          value={offerAmount}
          onChangeText={setOfferAmount}
          placeholder="Type here"
          keyboardType="numeric"
        />

        {/* Select Service */}
        <View className="my-3">
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[12px] -mb-2"
          >
            Select Service
          </Text>
          <Dropdown
            value={selectedService}
            onValueChange={setSelectedService}
            options={serviceOptions}
            placeholder="Select Service"
          />
        </View>

        {/* Upload Service Picture */}
        <View className="mb-6">
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[12px] pb-1"
          >
            Upload Service Picture
          </Text>
          <TouchableOpacity
            onPress={pickImage}
            className="border-2 border-dashed border-[#F9BCDC] rounded-lg h-[140px] items-center justify-center"
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <View className="items-center justify-center">
                <Ionicons name="image-outline" size={40} color="#8C8D8B" />
                <Text
                  className="text-[#8C8D8B] text-[12px] mt-2"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  Click to upload
                </Text>
                <Text
                  style={{ fontFamily: "poppinsRegular" }}
                  className="text-[#8C8D8B] text-[10px]"
                >
                  PNG, JPG, GIF up to 5MB
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <View className="pb-8">
          <AuthButton title="Submit Offer" onPress={handleSubmitOffer} />
        </View>
      </ScrollView>
    </View>
  );
}
