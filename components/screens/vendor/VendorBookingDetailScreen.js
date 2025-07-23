import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import OutlineButton from "../../reusuableComponents/buttons/OutlineButton";
import { showToast } from "../../ToastComponent/Toast";
import { HttpClient } from "../../../api/HttpClient";
import * as ImagePicker from "expo-image-picker";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import BottomModal from "../../reusuableComponents/BottomModal";
import { OutlineTextAreaInput } from "../../reusuableComponents/inputFields/OutlineTextInput";

export default function VendorBookingDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { booking } = route.params || {};
  const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);
  const [showDisputeModal, setShowDisputeModal] = React.useState(false);
  const [isSubmittingDispute, setIsSubmittingDispute] = React.useState(false);

  // Example static data for demo (replace with real data as needed)
  const bookingDetails = [
    { name: "Facials", amount: 88528 },
    { name: "Pedicure", amount: 100000 },
  ];
  const paymentDetails = [
    { name: "Facials", amount: 18528 },
    { name: "Pedicure", amount: 178000 },
  ];

  const handleCompleteBooking = async () => {
    if (!booking?.id) return;
    setIsLoadingComplete(true);
    try {
      const res = await HttpClient.post(
        `/bookings/${booking.id}/complete/vendor`
      );
      showToast.success(res.data.message || "Booking marked as completed.");
      // Optionally, update UI or navigate
      if (typeof booking === "object") booking.status = "Completed";
    } catch (error) {
      showToast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to complete booking."
      );
    } finally {
      setIsLoadingComplete(false);
    }
  };

  // Dispute form validation schema
  const disputeSchema = Yup.object().shape({
    reason: Yup.string().required("Please provide a reason for the dispute."),
    image: Yup.mixed()
      .test("fileType", "Only JPEG images are allowed.", (value) => {
        if (!value) return true;
        return value.endsWith(".jpg") || value.endsWith(".jpeg");
      })
      .test("fileSize", "Image must be less than 5MB.", async (value) => {
        if (!value) return true;
        // We can't check file size reliably in RN, so skip or handle in backend
        return true;
      }),
  });

  const handleDisputeSubmit = async (values, { resetForm }) => {
    setIsSubmittingDispute(true);
    try {
      await HttpClient.post("/disputes/raiseDispute", {
        bookingId: booking?.id,
        reason: values.reason,
        image: values.image,
      });
      // Optionally show a toast or feedback here
      setShowDisputeModal(false);
      resetForm();
    } catch (error) {
      // Optionally show error toast or feedback
      console.log(error);
    } finally {
      setIsSubmittingDispute(false);
    }
  };

  const pickImage = async (setFieldValue) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFieldValue("image", result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 bg-white pb-[50px]">
      {/* Header */}

      <View
        className="pt-[60px] mb-3 pb-[20px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          backgroundColor: "#fff",
        }}
      >
        <View className="flex-row items-center px-4 justify-between">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </Pressable>
          <Text
            className="text-center"
            style={{ fontSize: 18, fontFamily: "latoBold" }}
          >
            Booking Details
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* Status */}
        <View className="mt-6 mb-2">
          <Text
            className="text-[16px] mb-3 text-[#A5A5A5]"
            style={{ fontFamily: "poppinsMedium" }}
          >
            Booking <Text className="text-fadedDark">#{booking?.id}</Text>
          </Text>
          <Text
            className={`text-[16px] ${booking?.status === "Completed" ? "text-success" : "text-pending"}`}
            style={{ fontFamily: "poppinsMedium" }}
          >
            {booking?.status || "Pending"}
          </Text>
        </View>
        {/* Booking Details */}
        <View
          className="bg-white rounded-xl p-4 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[16px] mb-1"
          >
            Booking Details
          </Text>
          <Text
            className="text-primary text-[12px] mb-1"
            style={{ fontFamily: "poppinsSemiBold" }}
          >
            July 22, 2024 at 09:15pm
          </Text>
          <Text
            className="text-[12px] mb-2"
            style={{ fontFamily: "poppinsRegular" }}
          >
            By: Team Green
          </Text>
          {bookingDetails.map((item, idx) => (
            <View key={idx} className="flex-row justify-between mb-1">
              <Text
                className="text-[12px] text-[#00000066]"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {idx + 1}. {item.name}
              </Text>
              <Text
                className="text-[14px] text-[#00000066]"
                style={{ fontFamily: "latoBold" }}
              >
                ₦{item.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
        {/* Payment Summary */}
        <View
          className="bg-white rounded-xl p-4 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[16px] mb-1"
          >
            Payment Summary
          </Text>
          <Text
            className="text-primary text-[12px] mb-1"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Payment Date: 23-03-2024
          </Text>
          <View className="h-[1px] mt-3 mb-4 bg-[#00000013]" />
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[12px] mb-2"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Total Payment{" "}
            </Text>
            <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
              ₦{booking?.amount?.toLocaleString()}
            </Text>
          </View>
          {paymentDetails.map((item, idx) => (
            <View key={idx} className="flex-row justify-between mb-1">
              <Text
                className="text-[12px] text-[#00000066]"
                style={{ fontFamily: "poppinsRegular" }}
              >
                {idx + 1}. {item.name}
              </Text>
              <Text
                className="text-[14px] text-[#00000066]"
                style={{ fontFamily: "latoBold" }}
              >
                ₦{item.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
        {/* Appointment Details */}
        <View
          className="bg-white rounded-xl p-4 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-[16px] mb-2"
          >
            Appointment Details
          </Text>
          <View className="flex-row justify-between mt-2 mb-1">
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Client's Name
            </Text>
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Team Green
            </Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Time
            </Text>
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              9:00AM
            </Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Date
            </Text>
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              July 6th, 2024
            </Text>
          </View>
        </View>
        {booking?.status === "Pending" && (
          <View className="mt-2 mb-1">
            <AuthButton
              title="Complete Booking"
              onPress={handleCompleteBooking}
              isloading={isLoadingComplete}
              loadingMsg="Completing"
            />
            <OutlineButton
              title="Dispute Booking"
              onPress={() => setShowDisputeModal(true)}
            />
          </View>
        )}
      </ScrollView>
      {/* Dispute Modal (local, not shared) */}
      <BottomModal
        isVisible={showDisputeModal}
        onClose={() => setShowDisputeModal(false)}
        showCloseBtn
        backgroundcolor="#fff"
      >
        <Formik
          initialValues={{ reason: "", image: null }}
          validationSchema={disputeSchema}
          onSubmit={handleDisputeSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            resetForm,
          }) => (
            <View className="w-full px-2">
              <Text
                className="text-[16px] mt-2 mb-1"
                style={{ fontFamily: "latoBold" }}
              >
                Dispute
              </Text>
              <Text
                className="text-[14px] text-[#888]  mb-4"
                style={{ fontFamily: "latoRegular" }}
              >
                Why are you disputing the booking?
              </Text>

              <OutlineTextAreaInput
                value={values.reason}
                onChangeText={handleChange("reason")}
                placeholder="Type here"
                minHeight={80}
              />

              <TouchableOpacity
                className="border border-dashed border-[#EB278D] rounded-lg py-[10px] px-4 flex-row items-center mb-2 mt-2 w-full justify-center"
                onPress={() => pickImage(setFieldValue)}
              >
                <Text
                  className="text-[12px] text-center mr-2"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  Upload a picture evidence
                </Text>
                <Feather name="plus" size={16} color="#000" />
              </TouchableOpacity>
              {values.image && (
                <View className="mb-2 items-center">
                  <Image
                    source={{ uri: values.image }}
                    style={{ width: 120, height: 120, borderRadius: 8 }}
                  />
                  <TouchableOpacity
                    onPress={() => setFieldValue("image", null)}
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      backgroundColor: "#fff",
                      borderRadius: 16,
                      padding: 4,
                    }}
                  >
                    <AntDesign name="delete" size={18} color="#E53935" />
                  </TouchableOpacity>
                </View>
              )}
              <Text
                style={{ fontFamily: "poppinsRegular" }}
                className="text-[10px] text-[#888] mb-2"
              >
                Acceptable document type is Jpeg only and it should not be more
                than 5MB
              </Text>

              <AuthButton
                title="Submit"
                onPress={handleSubmit}
                loadingMsg="Submitting"
                isloading={isSubmittingDispute}
                disabled={isSubmittingDispute}
              />
            </View>
          )}
        </Formik>
      </BottomModal>
    </View>
  );
}
