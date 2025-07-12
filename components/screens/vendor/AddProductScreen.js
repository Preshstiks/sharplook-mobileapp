import React, { useState } from "react";
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
import { Feather, Ionicons } from "@expo/vector-icons";
import { AuthInput } from "../../reusuableComponents/inputFields/AuthInput";
import * as ImagePicker from "expo-image-picker";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";

const addProductSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup.string().required("Price is required"),
  quantity: yup.string().required("Quantity is required"),
});

export default function AddProductScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Formik
        initialValues={{ name: "", price: "", quantity: "" }}
        validationSchema={addProductSchema}
        onSubmit={(values, { resetForm }) => {
          // handle submit
          resetForm();
        }}
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
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    error={errors.name}
                    touched={touched.name}
                  />
                  <AuthInput
                    label="Price"
                    value={values.price}
                    onChangeText={handleChange("price")}
                    onBlur={handleBlur("price")}
                    error={errors.price}
                    touched={touched.price}
                  />
                  <AuthInput
                    label="Quantity Available"
                    value={values.quantity}
                    onChangeText={handleChange("quantity")}
                    onBlur={handleBlur("quantity")}
                    error={errors.quantity}
                    touched={touched.quantity}
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
                    <View className="mb-4">
                      <Image
                        source={{ uri: selectedImage }}
                        style={{ width: 120, height: 90, borderRadius: 8 }}
                      />
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
              <AuthButton title="Add Product" onPress={handleSubmit} />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
