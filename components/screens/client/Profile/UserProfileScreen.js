import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import OutlineTextInput from "../../../reusuableComponents/inputFields/OutlineTextInput";
import { useAuth } from "../../../../context/AuthContext";

const UserProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#EB278D" barStyle="light-content" />
      {/* Header Section */}
      <View className="bg-primary rounded-b-[40px] items-center pt-[60px] pb-8 relative">
        {/* Back Button */}
        <TouchableOpacity className="absolute left-4 top-8">
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        {/* Edit Icon */}
        <TouchableOpacity
          className="absolute right-4 top-8"
          onPress={() => navigation.navigate("EditProfileScreen")}
        >
          <Feather name="edit" size={24} color="#fff" />
        </TouchableOpacity>
        {/* Avatar */}
        <Image
          source={
            user?.picture
              ? { uri: user?.picture }
              : require("../../../../assets/icon/avatar.png")
          }
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text
          className="text-white text-[16px]"
          style={{ fontFamily: "poppinsMedium" }}
        >
          {`${user.lastName} ${user.firstName}`}
        </Text>
        <Text
          className="text-white text-[12px] mt-1"
          style={{ fontFamily: "poppinsLight" }}
        >
          {user.email}
        </Text>
      </View>
      {/* Form Section */}
      <View className="flex-1 px-4 pt-6">
        <OutlineTextInput
          label="First Name"
          value={user.firstName}
          editable={false}
        />
        <OutlineTextInput
          label="Last Name"
          value={user.lastName}
          editable={false}
        />
        <OutlineTextInput
          label="Email Address"
          value={user.email}
          editable={false}
        />
        <OutlineTextInput
          label="Phone Number"
          value={user?.phone}
          editable={false}
        />
        <OutlineTextInput
          value={user?.location}
          label="Location"
          editable={false}
          style={{ marginTop: 0 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
