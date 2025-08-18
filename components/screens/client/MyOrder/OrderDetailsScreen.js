import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import OutlineButton from "../../../reusuableComponents/buttons/OutlineButton";
import { HttpClient } from "../../../../api/HttpClient";
import * as ImagePicker from "expo-image-picker";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import BottomModal from "../../../reusuableComponents/BottomModal";
import { useState } from "react";
import { OutlineTextAreaInput } from "../../../reusuableComponents/inputFields/OutlineTextInput";
import { HexConverter } from "../../../reusuableComponents/HexConverter";
import {
  DateConverter,
  formatDateToDDMMYYYY,
} from "../../../reusuableComponents/DateConverter";
import { formatAmount } from "../../../formatAmount";
import { showToast } from "../../../ToastComponent/Toast";
import { useChatNavigation } from "../../../../hooks/useChatNavigation";

export default function OrderDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [isloadingComplete, setIsloadingComplete] = useState(false);
  const { order } = route.params || {};
  const orderId = order?.id;

  // Calculate total price from all items
  const totalPrice =
    order?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;

  // Get overall order status (you might want to customize this logic)
  const getOrderStatus = () => {
    if (!order?.items || order.items.length === 0) return "Unknown";

    // Check if any item has a dispute
    const hasDispute = order.items.some((item) => item.hasDispute);

    const statuses = order.items.map((item) => item.vendor?.status);
    const uniqueStatuses = [...new Set(statuses)];

    if (hasDispute && uniqueStatuses.includes("PENDING")) {
      return "DISPUTED";
    } else if (uniqueStatuses.length === 1) {
      return uniqueStatuses[0];
    } else if (uniqueStatuses.includes("PENDING")) {
      return "PARTIALLY_DELIVERED";
    } else {
      return "MIXED_STATUS";
    }
  };

  // Then update the getStatusDisplayText function to include the DISPUTED case:
  const getStatusDisplayText = (status) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "DELIVERED":
        return "Delivered";
      case "DISPUTED":
        return "Disputed";
      default:
        return status || "Unknown";
    }
  };

  const orderStatus = getOrderStatus();

  // Group items by vendor
  const groupItemsByVendor = (items) => {
    const vendorMap = {};
    items?.forEach((item) => {
      const vendorId = item.vendor?.id;
      if (!vendorMap[vendorId]) {
        vendorMap[vendorId] = {
          vendor: item.vendor,
          items: [],
        };
      }
      vendorMap[vendorId].items.push(item);
    });
    return Object.values(vendorMap);
  };

  // Refactored: handle bulk completion
  const handleCompleteOrder = async () => {
    setIsloadingComplete(true);
    try {
      // Collect all vendorOrderIds
      const vendorOrderIds = order?.items
        ?.map((item) => item.vendorOrderId)
        .filter(Boolean);
      // If backend supports bulk, send as array. Otherwise, loop through.
      // Here, we assume backend supports array. If not, replace with Promise.all for each.
      const payload = {
        vendorOrderIds,
        role: "CLIENT",
      };

      const res = await HttpClient.post("/orders/complete", payload);
      showToast.success(res.data.message || "Order confirmed successfully");
      navigation.goBack();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to complete order"
      );
    } finally {
      setIsloadingComplete(false);
    }
  };

  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [isSubmittingDispute, setIsSubmittingDispute] = useState(false);
  const [selectedDisputeVendorOrderId, setSelectedDisputeVendorOrderId] =
    useState(null);

  // Dispute form validation schema
  const disputeSchema = Yup.object().shape({
    reason: Yup.string().required("Please provide a reason for the dispute."),
    disputeImage: Yup.mixed()
      .test("fileType", "Only JPEG images are allowed.", (value) => {
        if (!value) return true;
        return value.endsWith(".jpg") || value.endsWith(".jpeg");
      })
      .test("fileSize", "Image must be less than 5MB.", async (value) => {
        if (!value) return true;
        return true;
      }),
  });

  // Refactored: handle dispute for the whole order
  const handleDisputeSubmit = async (values, { resetForm }) => {
    setIsSubmittingDispute(true);
    try {
      // Collect all vendorOrderIds
      const vendorOrderIds = order?.items
        ?.map((item) => item.vendorOrderId)
        .filter(Boolean);

      // Create FormData object
      const formData = new FormData();

      // Add vendor order IDs (convert array to JSON string or append individually based on backend requirements)
      formData.append("vendorOrderIds", JSON.stringify(vendorOrderIds));
      formData.append("reason", values.reason);
      if (values.disputeImage) {
        // Extract filename from URI
        const filename = values.disputeImage.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("disputeImage", {
          uri: values.disputeImage,
          name: filename || "dispute_image.jpg",
          type: type,
        });
      }

      // Send FormData with proper headers
      const res = await HttpClient.post(
        "/disputes/createOrderdispute",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showToast.success(res.data.message);
      navigation.goBack();
      setShowDisputeModal(false);
      resetForm();
    } catch (error) {
      showToast.error(
        error?.response?.data?.message || "Failed to submit dispute"
      );
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
      setFieldValue("disputeImage", result.assets[0].uri);
    }
  };

  const { navigateToChat, isConnecting } = useChatNavigation();
  // Inside OrderDetailsScreen

  // Optimized chat navigation for vendors
  const handleChatVendor = async (vendor) => {
    try {
      if (!vendor?.id) return;

      await navigateToChat(navigation, {
        vendorId: vendor.id,
        receiverName: vendor.businessName,
        vendorPhone: vendor.phone,
        chat: {
          id: vendor.id,
          name: vendor.businessName,
          avatar: vendor.avatar,
          vendorId: vendor.id,
        },
      });
    } catch (error) {
      showToast.error("Failed to open chat");
    }
  };

  return (
    <View className="flex-1 pb-[40px] bg-secondary">
      {/* Header */}
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      <View
        className="flex-row items-center justify-between px-4 pt-[60px] pb-4 bg-secondary"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "poppinsMedium" }} className="text-[18px]">
          Order details
        </Text>
        <View className="relative">
          <MaterialIcons name="shopping-cart" size={24} color="#fff" />
        </View>
      </View>

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* Status */}
        <View className="items-center mt-4 mb-2">
          <Text
            style={{ fontFamily: "poppinsSemiBold" }}
            className="text-[20px]"
          >
            {`${getStatusDisplayText(orderStatus)} Order`}
          </Text>
          <Text
            style={{ fontFamily: "latoBold" }}
            className="text-[18px] text-[#00000080] mt-1"
          >
            Order ID:{" "}
            <Text className="text-[#000]">{HexConverter(order?.id)}</Text>
          </Text>
          <Text
            style={{ fontFamily: "latoBold" }}
            className="text-[14px] text-[#00000080] mt-2"
          >
            {formatDateToDDMMYYYY(order?.createdAt)}
          </Text>
          <Text
            className="text-[14px] text-gray-500 mb-1 mt-3"
            style={{ fontFamily: "latoRegular" }}
          >
            {order?.deliveryType}
          </Text>
        </View>

        <View className="h-[1px] my-5 bg-[#FDE9F4]" />

        {/* Order Items */}
        <View className="mt-4 mb-2">
          {groupItemsByVendor(order?.items).map((vendorGroup, vIdx) => (
            <View key={vIdx} className="mb-6">
              {/* Vendor Details */}
              <View className="mb-5">
                <Text
                  style={{ fontFamily: "poppinsMedium" }}
                  className="text-[16px] mb-2"
                >
                  Vendor
                </Text>
                <View className="flex-row items-center">
                  <Image
                    source={
                      vendorGroup.vendor?.avatar
                        ? { uri: vendorGroup.vendor?.avatar }
                        : require("../../../../assets/icon/avatar.png")
                    }
                    className="w-[36px] h-[36px] rounded-full mr-3"
                  />
                  <View className="flex-1">
                    <Text
                      style={{ fontFamily: "poppinsMedium" }}
                      className="text-[15px] mb-1"
                    >
                      {vendorGroup.vendor?.businessName}
                    </Text>
                    <Text
                      style={{ fontFamily: "poppinsRegular" }}
                      className="text-[13px] text-faintDark2"
                    >
                      {vendorGroup.vendor?.phone}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleChatVendor(vendorGroup.vendor)}
                    disabled={isConnecting}
                    style={{ opacity: isConnecting ? 0.6 : 1 }}
                  >
                    {isConnecting ? (
                      <ActivityIndicator size="small" color="#EB278D" />
                    ) : (
                      <MaterialIcons name="chat" size={18} color="#EB278D" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {/* Vendor's Products */}
              <Text
                style={{ fontFamily: "poppinsMedium" }}
                className="text-[16px] mb-3"
              >
                Order Items ({vendorGroup.items.length})
              </Text>
              {vendorGroup.items.map((item, idx) => (
                <View
                  key={idx}
                  className="flex-row items-center border border-[#FCDFEE] p-4 rounded-[8px] mb-2"
                >
                  <Image
                    source={{ uri: item?.productImage }}
                    className="w-[60px] h-[60px] rounded-lg mr-4"
                  />
                  <View>
                    <Text
                      style={{ fontFamily: "latoRegular" }}
                      className="text-[16px] mb-1"
                    >
                      {`${item?.productName}`}
                    </Text>
                    <View className="mt-3 flex-row items-center gap-3">
                      <Text className="text-primary text-[14px] mb-1">
                        {formatAmount(item?.price)}
                      </Text>
                      <Text className="text-primary text-[14px] mb-1">x</Text>
                      <Text className="text-primary text-[14px] mb-1">
                        {`${item?.quantity}`}
                      </Text>
                      <Text className="text-primary text-[14px] mb-1">=</Text>
                      <Text
                        style={{ fontFamily: "latoBold" }}
                        className="text-primary text-[14px] mb-1"
                      >
                        {formatAmount(item?.price * item?.quantity)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        {orderStatus === "PENDING" && (
          <>
            <AuthButton
              title="Confirm Order"
              isloading={isloadingComplete}
              onPress={handleCompleteOrder}
            />
            <OutlineButton
              title="Dispute Order"
              onPress={() => setShowDisputeModal(true)}
            />
          </>
        )}
      </ScrollView>

      {/* Dispute Modal */}
      <BottomModal
        isVisible={showDisputeModal}
        onClose={() => {
          setShowDisputeModal(false);
          setSelectedDisputeVendorOrderId(null);
        }}
        showCloseBtn
        backgroundcolor="#fff"
      >
        <Formik
          initialValues={{ reason: "", disputeImage: null }}
          validationSchema={disputeSchema}
          onSubmit={handleDisputeSubmit}
          enableReinitialize={true}
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
                className="text-[18px] mt-2 mb-1"
                style={{ fontFamily: "latoBold" }}
              >
                Dispute Order
              </Text>
              <Text
                className="text-[16px] text-[#888] mb-4"
                style={{ fontFamily: "latoRegular" }}
              >
                Why are you disputing this order?
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
                  className="text-[14px] text-center mr-2"
                  style={{ fontFamily: "poppinsRegular" }}
                >
                  Upload a picture evidence
                </Text>
                <Feather name="plus" size={16} color="#000" />
              </TouchableOpacity>

              {values.disputeImage && (
                <View className="mb-2 items-center">
                  <Image
                    source={{ uri: values.disputeImage }}
                    style={{ width: 120, height: 120, borderRadius: 8 }}
                  />
                  <TouchableOpacity
                    onPress={() => setFieldValue("disputeImage", null)}
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
                className="text-[12px] text-[#888] mb-2"
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
