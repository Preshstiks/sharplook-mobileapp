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

const EditProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation] = useState(user?.location || "");

  React.useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setLocation(user?.location || "");
  }, [user]);
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
              source={{
                uri: "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-2 right-2 bg-white p-1 rounded-full border border-gray-200">
              <Feather name="edit" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Form */}
        <View className="px-4">
          <OutlineTextInput label="First Name" value={firstName} />
          <OutlineTextInput label="Last Name" value={lastName} />
          <OutlineTextInput label="Email Address" value={email} />
          <OutlineTextInput label="Phone Number" value={phone} />
          <View className="">
            <View className="absolute right-0 top-0">
              <TouchableOpacity onPress={() => console.log("Not implemented")}>
                <Text className="text-xs text-primary">Change My Location</Text>
              </TouchableOpacity>
            </View>
            <OutlineTextInput label="Location" value={location} />
          </View>
        </View>
        {/* Update Button */}
        <View className="px-4 mt-8">
          <AuthButton title="Update Profile" />
        </View>
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
