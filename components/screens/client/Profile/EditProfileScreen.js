import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import OutlineTextInput from "../../../reusuableComponents/inputFields/OutlineTextInput";
import AuthButton from "../../../reusuableComponents/buttons/AuthButton";
import { useAuth } from "../../../../context/AuthContext";
import { Formik } from "formik";
import { showToast } from "../../../ToastComponent/Toast";
import { HttpClient } from "../../../../api/HttpClient";

const EditProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateProfile = async (values) => {
    setIsLoading(true);
    try {
      const response = await HttpClient.put("/users/updateProfile", values);
      showToast(response.data.message);
      navigation.goBack();
    } catch (error) {
      console.log(error.response);
      const message =
        error.response.data.message || error.message || error.data.message;
      showToast(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 22 }} />
        </View>
        {/* Profile Image */}
        <View className="items-center mt-2 mb-4">
          <View>
            <Image
              source={
                user?.picture
                  ? { uri: user?.picture }
                  : require("../../../../assets/icon/avatar.png")
              }
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-2 right-2 bg-white p-1 rounded-full border border-gray-200">
              <Feather name="edit" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Formik Form */}
        <Formik
          initialValues={{
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: user?.phone || "",
            location: user?.location || "",
          }}
          enableReinitialize
          onSubmit={handleUpdateProfile}
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
              <View className="px-4">
                <OutlineTextInput
                  label="First Name"
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  error={errors.firstName}
                  touched={touched.firstName}
                />
                <OutlineTextInput
                  label="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  error={errors.lastName}
                  touched={touched.lastName}
                />
                <OutlineTextInput
                  label="Email Address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={errors.email}
                  touched={touched.email}
                />
                <OutlineTextInput
                  label="Phone Number"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  error={errors.phone}
                  touched={touched.phone}
                />
                <OutlineTextInput
                  label="Location"
                  value={values.location}
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  error={errors.location}
                  touched={touched.location}
                />
              </View>
              {/* Update Button */}
              <View className="px-4 mt-8">
                <AuthButton
                  isloading={isLoading}
                  disabled={isLoading}
                  title="Update Profile"
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
