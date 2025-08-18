import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OutlineTextInput from "../../../reusuableComponents/inputFields/OutlineTextInput";
import SearchableDropdown from "../../../reusuableComponents/inputFields/SearchableDropdown";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { HttpClient } from "../../../../api/HttpClient";
import { showToast } from "../../../ToastComponent/Toast";

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  bankAccountNumber: Yup.string()
    .matches(/^\d{10}$/, "Account number must be 10 digits")
    .required("Account number is required"),
  bankCode: Yup.string().required("Bank is required"),
});

export default function ClientWithdrawScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [bankOptions, setBankOptions] = useState([]);
  const [selectedBankName, setSelectedBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountVerified, setAccountVerified] = useState(false);

  const getBankList = async () => {
    setIsFetching(true);
    try {
      const res = await HttpClient.get("/withdrawals/getBanksList");

      if (res.data.success) {
        const banks = res.data.data.map((bank) => ({
          label: bank.name,
          value: bank.code,
        }));
        setBankOptions(banks);
      } else {
        showToast("error", "Failed to fetch banks");
      }
    } catch (error) {
      showToast("error", "Failed to fetch banks");
    } finally {
      setIsFetching(false);
    }
  };

  const verifyAccount = async (accountNumber, bankCode) => {
    if (!accountNumber || !bankCode || accountNumber.length !== 10) {
      setAccountName("");
      setAccountVerified(false);
      return;
    }

    // Clear previous account name and start verification
    setAccountName("");
    setAccountVerified(false);
    setIsVerifying(true);
    try {
      const res = await HttpClient.post("/withdrawals/verifyAcct", {
        bankAccountNumber: accountNumber,
        bankCode: bankCode,
      });

      if (res.data.message === "Account resolved successfully") {
        setAccountName(res.data.data.account_name);
        setAccountVerified(true);
      } else {
        setAccountName("Account does not exist");
        setAccountVerified(false);
      }
    } catch (error) {
      setAccountName("Account does not exist");
      setAccountVerified(false);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    getBankList();
  }, []);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      // Submit withdrawal request with correct parameters
      const withdrawalData = {
        resolvedAccountName: accountName,
        amount: Number(values.amount),
        bankAccountNumber: Number(values.bankAccountNumber),
        bankCode: Number(values.bankCode),
      };

      const response = await HttpClient.post(
        "/withdrawals/requestWithdrawals",
        withdrawalData
      );

      showToast.success(response.data.message);
      navigation.goBack();
    } catch (error) {
      showToast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 pb-10 bg-white">
      {/* Header */}
      <View className="pt-[60px] pb-4 px-4 bg-white flex-row items-center justify-between shadow-sm">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text
          className="flex-1 text-center text-[16px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Withdraw
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <Formik
        initialValues={{
          bankAccountNumber: "",
          bankCode: "",
          amount: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          isSubmitting: formikSubmitting,
        }) => (
          <>
            <ScrollView
              className="flex-1 px-4"
              showsVerticalScrollIndicator={false}
            >
              <Text
                className="text-[16px] mt-6 mb-4"
                style={{ fontFamily: "latoBold" }}
              >
                Please fill the details below
              </Text>

              {/* Account Number */}
              <OutlineTextInput
                label="Account Number"
                value={values.bankAccountNumber}
                onChangeText={(text) => {
                  handleChange("bankAccountNumber")(text);
                  // Verify account when account number is 10 digits and bank is selected
                  if (text.length === 10 && values.bankCode) {
                    verifyAccount(text, values.bankCode);
                  } else if (text.length !== 10) {
                    setAccountName("");
                    setAccountVerified(false);
                  }
                }}
                onBlur={handleBlur("bankAccountNumber")}
                keyboardType="numeric"
                error={errors.bankAccountNumber}
                touched={touched.bankAccountNumber}
              />

              {/* Bank Name */}
              <SearchableDropdown
                label="Select Bank"
                value={values.bankCode}
                options={bankOptions}
                onValueChange={(val) => {
                  setFieldValue("bankCode", val);
                  // Find the selected bank name for display
                  const selectedBank = bankOptions.find(
                    (bank) => bank.value === val
                  );
                  setSelectedBankName(selectedBank ? selectedBank.label : "");

                  // Verify account if account number is already 10 digits
                  if (values.bankAccountNumber.length === 10) {
                    verifyAccount(values.bankAccountNumber, val);
                  }
                }}
                placeholder="Select Bank"
                error={errors.bankCode}
                touched={touched.bankCode}
                disabled={isFetching}
              />

              {(accountName || isVerifying) && (
                <View className="-mt-3">
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className={`text-[13px] ${isVerifying ? "text-[#666666]" : accountVerified ? "text-primary" : "text-[#ff0000]"}`}
                  >
                    {isVerifying ? "Verifying account..." : accountName}
                  </Text>
                </View>
              )}

              {/* Amount */}
              <OutlineTextInput
                label="Enter Amount"
                value={values.amount}
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                keyboardType="numeric"
                error={errors.amount}
                touched={touched.amount}
                editable={!isVerifying}
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
                isloading={isSubmitting}
                title="Withdraw"
                onPress={handleSubmit}
                disabled={
                  loading ||
                  isSubmitting ||
                  formikSubmitting ||
                  isFetching ||
                  !accountVerified
                }
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
