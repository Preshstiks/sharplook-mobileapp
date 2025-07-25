import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OutlineTextInput from "../../reusuableComponents/inputFields/OutlineTextInput";
import Dropdown from "../../reusuableComponents/inputFields/Dropdown";
import AuthButton from "../../reusuableComponents/buttons/AuthButton";
import { Formik } from "formik";
import * as Yup from "yup";
import HttpClient from "../../../api/HttpClient";
import { showToast } from "../../ToastComponent/Toast";

const bankOptions = [
  { label: "Access Bank", value: "Access Bank" },
  { label: "Citibank", value: "Citibank" },
  { label: "Ecobank", value: "Ecobank" },
  { label: "Fidelity Bank", value: "Fidelity Bank" },
  { label: "First Bank", value: "First Bank" },
  {
    label: "First City Monument Bank (FCMB)",
    value: "First City Monument Bank (FCMB)",
  },
  { label: "Globus Bank", value: "Globus Bank" },
  { label: "Guaranty Trust Bank (GTB)", value: "Guaranty Trust Bank (GTB)" },
  { label: "Heritage Bank", value: "Heritage Bank" },
  { label: "Keystone Bank", value: "Keystone Bank" },
  { label: "Polaris Bank", value: "Polaris Bank" },
  { label: "Providus Bank", value: "Providus Bank" },
  { label: "Stanbic IBTC Bank", value: "Stanbic IBTC Bank" },
  { label: "Standard Chartered Bank", value: "Standard Chartered Bank" },
  { label: "Sterling Bank", value: "Sterling Bank" },
  { label: "Suntrust Bank", value: "Suntrust Bank" },
  { label: "Union Bank", value: "Union Bank" },
  {
    label: "United Bank for Africa (UBA)",
    value: "United Bank for Africa (UBA)",
  },
  { label: "Unity Bank", value: "Unity Bank" },
  { label: "Wema Bank", value: "Wema Bank" },
  { label: "Zenith Bank", value: "Zenith Bank" },
];

const methodOptions = [{ label: "Bank Transfer", value: "bank_transfer" }];

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  reason: Yup.string().required("Reason is required"),
  method: Yup.string().required("Withdrawal method is required"),
  accountName: Yup.string().required("Account name is required"),
  accountNumber: Yup.string()
    .matches(/^\d{10}$/, "Account number must be 10 digits")
    .required("Account number is required"),
  bankName: Yup.string().required("Bank name is required"),
});

export default function WithdrawScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

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
          Withdraw
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <Formik
        initialValues={{
          amount: "",
          reason: "",
          method: "bank_transfer",
          accountName: "",
          accountNumber: "",
          bankName: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          setLoading(true);
          try {
            const payload = {
              amount: Number(values.amount),
              reason: values.reason,
              method: values.method,
              metadata: {
                accountName: values.accountName,
                accountNumber: values.accountNumber,
                bankName: values.bankName,
              },
            };
            await HttpClient.post("/withdrawals/requestWithdrawals", payload);
            resetForm();
            navigation.goBack();
          } catch (error) {
            const message = error.response.data.message || error.message;
            showToast.error(message);
          } finally {
            setLoading(false);
            setSubmitting(false);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
        }) => (
          <>
            <ScrollView
              className="flex-1 px-4"
              showsVerticalScrollIndicator={false}
            >
              <Text
                className="text-[14px] mt-6 mb-4"
                style={{ fontFamily: "latoBold" }}
              >
                Please fill the details below
              </Text>

              {/* Amount */}
              <OutlineTextInput
                label="Enter Amount"
                value={values.amount}
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                keyboardType="numeric"
                error={errors.amount}
                touched={touched.amount}
              />
              {/* Reason */}
              <OutlineTextInput
                label="Reason for Withdrawal"
                value={values.reason}
                onChangeText={handleChange("reason")}
                onBlur={handleBlur("reason")}
                error={errors.reason}
                touched={touched.reason}
              />
              {/* Method */}
              <Dropdown
                label="Withdrawal Method"
                value={values.method}
                options={methodOptions}
                onValueChange={(val) => setFieldValue("method", val)}
                placeholder="Select Method"
                error={errors.method}
                touched={touched.method}
              />
              {/* Account Name */}
              <OutlineTextInput
                label="Account Name"
                value={values.accountName}
                onChangeText={handleChange("accountName")}
                onBlur={handleBlur("accountName")}
                error={errors.accountName}
                touched={touched.accountName}
              />
              {/* Account Number */}
              <OutlineTextInput
                label="Account Number"
                value={values.accountNumber}
                onChangeText={handleChange("accountNumber")}
                onBlur={handleBlur("accountNumber")}
                keyboardType="numeric"
                error={errors.accountNumber}
                touched={touched.accountNumber}
              />
              {/* Bank Name */}
              <Dropdown
                label="Select Bank"
                value={values.bankName}
                options={bankOptions}
                onValueChange={(val) => setFieldValue("bankName", val)}
                placeholder="Select Bank"
                error={errors.bankName}
                touched={touched.bankName}
              />
              {errors.submit && (
                <Text className="text-red-500 mt-2 mb-2 text-center">
                  {errors.submit}
                </Text>
              )}
              <View style={{ height: 24 }} />
            </ScrollView>
            <View className="px-4 pb-6 bg-white">
              <AuthButton
                title={loading ? "Processing..." : "Withdraw"}
                onPress={handleSubmit}
                disabled={loading || isSubmitting}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
