import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
  Modal,
  StyleSheet,
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
import WebView from "react-native-webview";
import { useFocusEffect } from "@react-navigation/native";
export default function FundVendorWalletScreen({ navigation }) {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const [pendingReference, setPendingReference] = React.useState(null);

  const [paystackPaymentUrl, setPaystackPaymentUrl] = React.useState(null);
  const [paystackModalVisible, setPaystackModalVisible] = React.useState(false);
  const [pendingPaymentValues, setPendingPaymentValues] = React.useState({});

  const handleFundWallet = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const res = await HttpClient.post("/wallet/fund", {
        email: user.email,
        amount: Number(values.amount),
      });
      setPendingReference(res.data.data.reference);
      console.log(res.data);
      setPendingReference(res.data.data.reference);
      setPaystackPaymentUrl(res.data.data.authorization_url);
      setPaystackModalVisible(true);
      // if (res.data && res.data.authorization_url) {
      //   setPendingReference(res.data.reference);
      //   navigation.navigate("PaystackWebViewScreen", {
      //     paymentUrl: res.data.authorization_url,
      //   });
      // } else {
      //   setApiError("Failed to initialize payment. Please try again.");
      // }
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };
  console.log({ paystackPaymentUrl });
  console.log({ pendingReference });
  const handleVerifyPayment = async () => {
    setLoading(true);
    try {
      const res = await HttpClient.post("/wallet/verify", {
        reference: pendingReference,
      });

      showToast.success("Wallet funded successfully");
      navigation.goBack();
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
      <Modal
        visible={paystackModalVisible}
        animationType="slide"
        onRequestClose={() => setPaystackModalVisible(false)}
        transparent={false}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity
              className="bg-primary rounded-[4px] py-2 px-4"
              onPress={() => {
                setPaystackModalVisible(false);
                handleVerifyPayment();
              }}
            >
              <Text className="text-[10px] text-white">Verify Payment</Text>
            </TouchableOpacity>
          </View>
          {paystackPaymentUrl ? (
            <WebView
              source={{ uri: paystackPaymentUrl }}
              onNavigationStateChange={(navState) => {
                // Detect Paystack close or success URL
                if (
                  navState.url.includes("paystack.com/close") ||
                  navState.url.includes("payment/success")
                ) {
                  // Try to extract reference from URL if possible
                  const refMatch = navState.url.match(/[?&]reference=([^&#]+)/);
                  const reference = refMatch ? refMatch[1] : pendingReference;
                  setPaystackModalVisible(false);
                  setPaystackPaymentUrl("");
                  if (reference) {
                    handlePaystackVerificationAndBooking(
                      reference,
                      pendingPaymentValues
                    );
                  } else {
                    Alert.alert(
                      "Payment",
                      "Payment completed, but reference not found."
                    );
                  }
                }
              }}
              startInLoadingState
              style={{ flex: 1 }}
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    color: "#222",
    fontSize: 16,
    fontFamily: "poppinsMedium",
    flex: 1,
    textAlign: "center",
    marginLeft: -28,
  },
});
