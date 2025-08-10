import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import OutlineTextInput from "../../../reusuableComponents/inputFields/OutlineTextInput";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { useAuth } from "../../../../context/AuthContext";
import { Formik } from "formik";
import { showToast } from "../../../ToastComponent/Toast";
import { HttpClient } from "../../../../api/HttpClient";

const EditProfileScreen = ({ navigation }) => {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        showToast.error(
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      showToast.error("Error selecting image. Please try again.");
    }
  };

  const uploadImage = async (imageUri) => {
    setIsUploadingImage(true);
    try {
      // Create form data
      const formData = new FormData();
      formData.append("avatar", {
        uri: imageUri,
        type: "image/jpeg",
        name: "profile-image.jpg",
      });

      const response = await HttpClient.put("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.user) {
        setUser(response.data.user);
        showToast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error uploading image";
      showToast.error(message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUpdateProfile = async (values) => {
    setIsLoading(true);
    try {
      const response = await HttpClient.put("/user/updateProfile", values);
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
      showToast.success(response.data.message);
      navigation.goBack();
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.data.message;
      showToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Get the current image source
  const getImageSource = () => {
    if (selectedImage) {
      return { uri: selectedImage };
    }
    if (user?.avatar) {
      return { uri: user.avatar };
    }
    return require("../../../../assets/icon/avatar.png");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="pt-[40px] pb-4 px-4 flex-row items-center shadow-sm mb-5 justify-between bg-white">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#201E1F" />
          </TouchableOpacity>
          <Text
            style={{ fontFamily: "latoBold" }}
            className="text-[14px] text-faintDark"
          >
            Edit Profile
          </Text>
          <View style={{ width: 26 }} />
        </View>

        {/* Profile Image */}
        <View className="items-center mt-2 mb-4">
          <View>
            <Image
              source={getImageSource()}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity
              className="absolute bottom-2 right-2 bg-white p-1 rounded-full border border-gray-200"
              onPress={pickImage}
              disabled={isUploadingImage}
            >
              {isUploadingImage ? (
                <View className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
              ) : (
                <Feather name="edit" size={18} color="#000" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* Formik Form */}
        <Formik
          initialValues={{
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: user?.phone || "",
            location: user?.location || "",
          }}
          enableReinitialize
          onSubmit={handleUpdateProfile}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View className="px-4">
                <OutlineTextInput
                  label="First Name"
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  error={errors.firstName}
                  touched={touched.firstName}
                />
                <OutlineTextInput
                  label="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  error={errors.lastName}
                  touched={touched.lastName}
                />
                <OutlineTextInput
                  label="Email Address"
                  value={values.email}
                  editable={false}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={errors.email}
                  touched={touched.email}
                />
                <OutlineTextInput
                  label="Phone Number"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  error={errors.phone}
                  touched={touched.phone}
                />
                <OutlineTextInput
                  label="Location"
                  value={values.location}
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  error={errors.location}
                  touched={touched.location}
                />
              </View>
              {/* Update Button */}
              <View className="px-4 mt-8">
                <AuthButton
                  isloading={isLoading}
                  disabled={isLoading}
                  title="Update Profile"
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
