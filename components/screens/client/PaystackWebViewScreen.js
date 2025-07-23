import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { PaystackWebView } from "react-native-paystack-webview";
import { Ionicons } from "@expo/vector-icons";

export default function PaystackWebViewScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { paymentUrl } = route.params || {};

  if (!paymentUrl) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No payment URL provided.</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 20 }}
        >
          <Text style={{ color: "#EB278D" }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Simple Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          backgroundColor: "#EB278D",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            marginLeft: 16,
            fontWeight: "bold",
          }}
        >
          Pay with Paystack
        </Text>
      </View>
      <PaystackWebView
        autoStart={true}
        paystackUri={paymentUrl}
        onSuccess={(response) => {
          // response.transactionRef.reference should be the reference
          const reference = response.transactionRef?.reference;
          if (reference) {
            navigation.reset({
              index: 1,
              routes: [
                {
                  name: "BookAppointmentScreen",
                  params: { paymentReference: reference },
                },
              ],
            });
          }
        }}
        onCancel={() => {
          navigation.goBack();
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
