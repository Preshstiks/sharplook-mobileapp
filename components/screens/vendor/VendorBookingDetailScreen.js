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
import { HexConverter } from "../../reusuableComponents/HexConverter";
import { DateConverter } from "../../reusuableComponents/DateConverter";
import { formatAmount } from "../../formatAmount";

export default function VendorBookingDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { booking } = route.params || {};
  const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);
  const [showDisputeModal, setShowDisputeModal] = React.useState(false);
  const [isSubmittingDispute, setIsSubmittingDispute] = React.useState(false);
  const [isAccepting, setIsAccepting] = React.useState(false);
  const [isRejecting, setIsRejecting] = React.useState(false);
  const handleCompleteBooking = async () => {
    if (!booking?.id) return;
    setIsLoadingComplete(true);
    try {
      const res = await HttpClient.patch("/bookings/complete/vendor", {
        bookingId: booking?.id,
      });
      showToast.success(res.data.message || "Booking marked as completed.");
      navigation.goBack();
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
    referencePhoto: Yup.mixed()
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
      const formData = new FormData();
      formData.append("bookingId", booking?.id);

      // Add reason
      formData.append("reason", values.reason);

      // Add image if provided
      if (values.referencePhoto) {
        // Extract filename from URI
        const filename = values.referencePhoto.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("referencePhoto", {
          uri: values.referencePhoto,
          name: filename || "dispute_image.jpg",
          type: type,
        });
      }
      const res = await HttpClient.post("/disputes/raiseDispute", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast.success(res.data.message);
      // Optionally show a toast or feedback here
      setShowDisputeModal(false);
      resetForm();
    } catch (error) {
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
      setFieldValue("referencePhoto", result.assets[0].uri);
    }
  };
  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      const res = await HttpClient.patch(`/bookings/status`, {
        status: "ACCEPTED",
        bookingId: booking.id,
      });
      showToast.success(res.data.message);
      navigation.goBack();
    } catch (err) {
      console.error("Error accepting booking:", err.response);
      showToast.error(err.response.data.message);
    } finally {
      setIsAccepting(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      const res = await HttpClient.patch(`/bookings/status`, {
        status: "REJECTED",
        bookingId: booking.id,
      });
      showToast.success(res.data.message);
      navigation.goBack();
    } catch (err) {
      console.error("Error rejecting booking:", err.response);
      showToast.error(err.response.data.message);
    } finally {
      setIsRejecting(false);
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
            className="text-[14px] mb-3 text-[#A5A5A5]"
            style={{ fontFamily: "poppinsMedium" }}
          >
            Booking{" "}
            <Text className="text-fadedDark">{HexConverter(booking?.id)}</Text>
          </Text>
          <Text
            className={`text-[12px] ${booking?.dispute !== null ? "text-[#ff0000]" : booking?.status === "ACCEPTED" ? "text-[#0D9488]" : booking?.status === "COMPLETED" ? "text-success" : "text-pending"}`}
            style={{ fontFamily: "poppinsMedium" }}
          >
            {booking?.dispute === null ? booking?.status : "DISPUTED"}
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
            {DateConverter(booking?.date)} at {booking?.time}
          </Text>
          <Text
            className="text-[12px] mb-2"
            style={{ fontFamily: "poppinsRegular" }}
          >
            By: {booking?.client?.lastName} {booking?.client?.firstName}
          </Text>

          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {booking?.service?.serviceName}
            </Text>
            <Text
              className="text-[14px] text-[#00000066]"
              style={{ fontFamily: "latoBold" }}
            >
              {formatAmount(booking?.totalAmount)}
            </Text>
          </View>
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
            Cost Summary
          </Text>
          {/* <Text
            className="text-primary text-[12px] mb-1"
            style={{ fontFamily: "poppinsRegular" }}
          >
            Payment Date: 23-03-2024
          </Text> */}
          <View className="h-[1px] mt-3 mb-4 bg-[#00000013]" />
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[12px] mb-2"
              style={{ fontFamily: "poppinsRegular" }}
            >
              Total Payment{" "}
            </Text>
            <Text className="text-[14px]" style={{ fontFamily: "latoBold" }}>
              {formatAmount(booking?.totalAmount)}
            </Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {booking?.service?.serviceName}
            </Text>
            <Text
              className="text-[14px] text-[#00000066]"
              style={{ fontFamily: "latoBold" }}
            >
              {formatAmount(booking?.price)}
            </Text>
          </View>
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
              {booking?.client?.lastName} {booking?.client?.firstName}
            </Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "popptotalAmountinsRegular" }}
            >
              Time
            </Text>
            <Text
              className="text-[12px] text-[#00000066]"
              style={{ fontFamily: "poppinsRegular" }}
            >
              {booking?.time}
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
              {DateConverter(booking?.date)}
            </Text>
          </View>
        </View>
        {booking?.status === "PENDING" && booking?.dispute === null ? (
          <View className="mt-2 mb-1">
            <AuthButton
              title="Accept"
              onPress={handleAccept}
              isloading={isAccepting}
              loadingMsg="Accepting"
            />
            <OutlineButton
              title="Reject"
              onPress={handleReject}
              isloading={isRejecting}
              loadingMsg="Rejecting"
            />
          </View>
        ) : booking?.status === "ACCEPTED" && booking?.dispute === null ? (
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
        ) : null}
      </ScrollView>
      {/* Dispute Modal (local, not shared) */}
      <BottomModal
        isVisible={showDisputeModal}
        onClose={() => setShowDisputeModal(false)}
        showCloseBtn
        backgroundcolor="#fff"
      >
        <Formik
          initialValues={{ reason: "", referencePhoto: "" }}
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
              {values.referencePhoto && (
                <View className="mb-2 items-center">
                  <Image
                    source={{ uri: values.referencePhoto }}
                    style={{ width: 120, height: 120, borderRadius: 8 }}
                  />
                  <TouchableOpacity
                    onPress={() => setFieldValue("referencePhoto", null)}
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
