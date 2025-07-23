import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OutlineTextInput from "../../reusuableComponents/inputFields/OutlineTextInput";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import { useAuth } from "../../../context/AuthContext";
import { Formik } from "formik";
import { fundWalletSchema } from "../../../utils/validationSchemas";
import { HttpClient } from "../../../api/HttpClient";
import LoaderOverlay from "../../reusuableComponents/LoaderOverlay";
import { showToast } from "../../ToastComponent/Toast";
export default function FundClientWalletScreen({ navigation }) {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState("");
  const [pendingReference, setPendingReference] = React.useState(null);
  const [successMsg, setSuccessMsg] = React.useState("");

  const handleFundWallet = async (values, { resetForm }) => {
    setLoading(true);
    setApiError("");
    setSuccessMsg("");
    try {
      const res = await HttpClient.post("/payment/paystack/initiate", {
        email: user.email,
        amount: values.amount,
      });
      if (res.data && res.data.authorization_url) {
        setPendingReference(res.data.reference);
        navigation.navigate("PaystackWebViewScreen", {
          paymentUrl: res.data.authorization_url,
        });
      } else {
        setApiError("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      console.log(error.response);
      setApiError(
        error?.response?.data?.message ||
          "Failed to fund wallet. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  console.log({ pendingReference });
  const handleVerifyPayment = async () => {
    setLoading(true);
    setApiError("");
    setSuccessMsg("");
    try {
      const res = await HttpClient.post("/wallet/verify", {
        reference: pendingReference,
      });
      const message = res.data.data.message || res.data.message;
      showToast.success(message);
    } catch (error) {
      console.log(error);
      setApiError(
        error?.response?.data?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  console.log({ pendingReference });
  return (
    <View className="flex-1 pb-10 bg-white">
      {/* Header */}
      <View className="pt-[60px] pb-4 px-4 bg-white flex-row items-center justify-between shadow-sm">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text
          className="flex-1 text-center text-[18px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          FundWallet
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <Formik
        initialValues={{ amount: "" }}
        validationSchema={fundWalletSchema}
        onSubmit={handleFundWallet}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView
            className="flex-1 px-4"
            showsVerticalScrollIndicator={false}
          >
            <Text
              className="text-[14px] mt-6 mb-4"
              style={{ fontFamily: "latoBold" }}
            >
              Enter the amount you want to fund your wallet
            </Text>
            <OutlineTextInput
              keyboardType="numeric"
              label="Amount"
              error={errors.amount}
              touched={touched.amount}
              value={values.amount}
              onChangeText={handleChange("amount")}
              onBlur={handleBlur("amount")}
              placeholder="Enter amount"
            />

            {apiError ? (
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  marginTop: 8,
                  fontFamily: "latoRegular",
                }}
              >
                {apiError}
              </Text>
            ) : null}
            {successMsg ? (
              <Text style={{ color: "green", fontSize: 14, marginTop: 12 }}>
                {successMsg}
              </Text>
            ) : null}
            {pendingReference && (
              <View style={{ marginTop: 20 }}>
                <AuthButton
                  title="Verify Payment"
                  onPress={handleVerifyPayment}
                  isloading={loading}
                  disabled={loading}
                />
                <Text style={{ fontSize: 12, marginTop: 8, color: "#555" }}>
                  After completing payment, tap "Verify Payment" to confirm.
                </Text>
              </View>
            )}
            <View className="px-0 pb-6 bg-white mt-6">
              <AuthButton
                title="Fund Wallet"
                loadingMsg="Funding"
                onPress={handleSubmit}
                isloading={loading}
                disabled={loading}
              />
            </View>
          </ScrollView>
        )}
      </Formik>
      <LoaderOverlay visible={loading} />
    </View>
  );
}
