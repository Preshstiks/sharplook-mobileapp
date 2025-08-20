import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation, useRoute } from "@react-navigation/native";
import OutlineTextInput, {
  OutlineTextAreaInput,
} from "../../../reusuableComponents/inputFields/OutlineTextInput";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { HttpClient } from "../../../../api/HttpClient";
import { Formik } from "formik";
import { reviewValidationSchema } from "../../../../utils/validationSchemas";
import { useAuth } from "../../../../context/AuthContext";
import { showToast } from "../../../ToastComponent/Toast";

export default function AddServiceReviewScreen() {
  const route = useRoute();
  const vendorId = route.params?.vendorId;
  const serviceId = route.params?.serviceId;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth();
  const clientId = user.id;
  const handleAddReview = async (values) => {
    setLoading(true);
    // const payload = {
    //   type: "SERVICE",
    //   clientId,
    //   vendorId,
    //   serviceId,
    //   comment: values.comment,
    //   rating: values.rating,
    // };
    try {
      const res = await HttpClient.post("/reviews/postReview", {
        type: "SERVICE",
        clientId,
        vendorId,
        serviceId,
        comment: values.comment,
        rating: values.rating,
      });
      showToast.success(res.data.message);
      navigation.goBack();
    } catch (error) {
      showToast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

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
          className="text-[18px] text-white"
        >
          Add Review
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <Formik
        initialValues={{
          comment: "",
          rating: 1,
        }}
        validationSchema={reviewValidationSchema}
        onSubmit={handleAddReview}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <>
            <View className="px-4 mt-6">
              <OutlineTextAreaInput
                label="How was your experience?"
                placeholder="Describe your experience?"
                value={values.comment}
                onChangeText={handleChange("comment")}
                error={errors.comment}
                touched={touched.comment}
              />

              <View className="flex-row justify-between mt-2 items-center">
                <Text
                  className="text-[14px]"
                  style={{ fontFamily: "poppinsMedium" }}
                >
                  Star
                </Text>
                <Text
                  className="text-[17px] text-primary ml-auto"
                  style={{ fontFamily: "poppinsBold" }}
                >
                  {values.rating.toFixed(1)}
                </Text>
              </View>

              <View className="flex-row items-center mb-8">
                <Text className="text-[14px] mr-2">1.0</Text>
                <Slider
                  style={{ flex: 1, height: 40 }}
                  minimumValue={1}
                  maximumValue={5}
                  step={1}
                  minimumTrackTintColor="#EB278D"
                  maximumTrackTintColor="#666"
                  thumbTintColor="#EB278D"
                  value={values.star}
                  onValueChange={(value) => setFieldValue("rating", value)}
                />
                <Text className="text-[14px] ml-2">5.0</Text>
              </View>

              {/* Display star rating error if any */}
              {touched.star && errors.star && (
                <Text className="text-red-500 text-[14px] mb-2">
                  {errors.star}
                </Text>
              )}
            </View>

            <View className="px-4 mb-8">
              <AuthButton
                title="Submit Review"
                isloading={loading}
                onPress={handleSubmit}
                disabled={loading}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
