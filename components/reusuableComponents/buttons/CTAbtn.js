import { Text, TouchableOpacity } from "react-native";

export const CTAbtn = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#EB278D",
        borderRadius: 8,
        marginTop: 10,
        paddingVertical: 12,
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "#fff",
          fontFamily: "poppinsRegular",
          fontSize: 12,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
