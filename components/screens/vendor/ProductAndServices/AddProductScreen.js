import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { AuthInput } from "../../../reusuableComponents/inputFields/AuthInput";
import * as ImagePicker from "expo-image-picker";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { HttpClient } from "../../../../api/HttpClient";
import SuccessModal from "../../../Modal/SuccessModal";
import { addProductSchema } from "../../../../utils/validationSchemas";
import LoaderOverlay from "../../../reusuableComponents/LoaderOverlay";

export default function AddProductScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
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
  const handleAddProduct = async (values) => {
    setLoading(true);
    console.log("handleAddProduct called with values:", values);
    console.log("Selected image:", selectedImage);
    try {
      const formData = new FormData();
      formData.append("productName", values.productName);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("qtyAvailable", values.qtyAvailable);

      if (selectedImage) {
        const filename = selectedImage.split("/").pop();
        const match = /\.(\w+)$/.exec(filename ?? "");
        const type = match ? `image/${match[1]}` : `image`;
        formData.append("picture", {
          uri: selectedImage,
          name: filename,
          type,
        });
      }

      // Debug: log FormData keys and values
      for (let pair of formData.entries()) {
        console.log("FormData entry:", pair[0], pair[1]);
      }

      const res = await HttpClient.post(
        "/products/vendor/addProducts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("handleAddProduct response:", res);
      setVisible(true);
    } catch (error) {
      console.log("AddProduct error:", error, error.response);
      let errorMsg = "An error occurred. Please try again.";
      if (error.response && error.response.data) {
        errorMsg =
          error.response.data.message || JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMsg = error.message;
      }
      showToast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (visible) {
      timer = setTimeout(() => {
        setVisible(false);
        navigation.navigate("Home", {
          screen: "Dashboard",
          params: { screen: "My Products" },
        });
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible]);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Formik
        initialValues={{
          productName: "",
          description: "",
          price: "",
          qtyAvailable: "",
          picture: "",
        }}
        validationSchema={addProductSchema}
        onSubmit={handleAddProduct}
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
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              keyboardVerticalOffset={80}
            >
              <ScrollView
                className="flex-1 bg-white"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
              >
                <View
                  className="px-4 pt-[60px] pb-[20px]"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    backgroundColor: "#fff",
                  }}
                >
                  <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <Text style={{ fontSize: 18, fontFamily: "latoBold" }}>
                        Add New Product
                      </Text>
                    </View>
                    <View style={{ width: 28 }} />
                  </View>
                </View>
                <View className="px-4 pt-[30px]">
                  <Text
                    className="text-[16px] mb-1"
                    style={{ fontFamily: "poppinsMedium" }}
                  >
                    Please fill the details below
                  </Text>
                  <Text
                    className="text-[14px] mb-4"
                    style={{ fontFamily: "latoRegular" }}
                  >
                    Make sure all information about the product is correct
                  </Text>
                  <AuthInput
                    label="Product Name"
                    value={values.productName}
                    onChangeText={handleChange("productName")}
                    onBlur={handleBlur("productName")}
                    error={errors.productName}
                    touched={touched.productName}
                  />
                  <AuthInput
                    label="Product Description"
                    value={values.description}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    error={errors.description}
                    touched={touched.description}
                  />
                  <AuthInput
                    label="Price"
                    value={values.price}
                    keyboardType="numeric"
                    onChangeText={handleChange("price")}
                    onBlur={handleBlur("price")}
                    error={errors.price}
                    touched={touched.price}
                  />
                  <AuthInput
                    label="Quantity Available"
                    value={values.qtyAvailable}
                    keyboardType="numeric"
                    onChangeText={handleChange("qtyAvailable")}
                    onBlur={handleBlur("qtyAvailable")}
                    error={errors.qtyAvailable}
                    touched={touched.qtyAvailable}
                  />

                  <TouchableOpacity
                    className="border border-dashed border-[#F9BCDC] rounded-lg py-2 px-4 flex-row items-center mb-8 mt-2 self-start"
                    onPress={pickImage}
                  >
                    <Text
                      className="text-[16px] mr-1"
                      style={{ fontFamily: "poppinsMedium" }}
                    >
                      Add Picture
                    </Text>
                    <Feather name="plus" size={16} color="black" />
                  </TouchableOpacity>
                  {selectedImage && (
                    <View
                      className="mb-4"
                      style={{ position: "relative", width: 172, height: 172 }}
                    >
                      <Image
                        source={{ uri: selectedImage }}
                        style={{ width: 172, height: 172, borderRadius: 8 }}
                      />
                      <TouchableOpacity
                        onPress={() => setSelectedImage(null)}
                        style={{
                          position: "absolute",
                          top: 6,
                          right: 6,
                          backgroundColor: "rgba(255,255,255,0.7)",
                          borderRadius: 16,
                          padding: 8,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AntDesign name="delete" size={16} color="#E53935" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#fff",
                paddingHorizontal: 16,
                paddingVertical: 16,
                paddingBottom: 50,
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 8,
              }}
            >
              {/* <Text>Formik values: {JSON.stringify(values)}</Text>
              <Text>Formik errors: {JSON.stringify(errors)}</Text> */}
              <AuthButton
                title="Add Product"
                isloading={loading}
                loadingMsg="Adding"
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
      <SuccessModal
        visible={visible}
        message="Congratulations, your product was uploaded successfully!!!"
        buttonText={false}
      />
      <LoaderOverlay visible={loading} />
    </View>
  );
}
