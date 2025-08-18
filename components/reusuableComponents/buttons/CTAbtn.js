import { Text, TouchableOpacity, View } from "react-native";
import { BarIndicator } from "react-native-indicators";

export const CTAbtn = ({ onPress, title, isloading }) => {
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
      {isloading ? (
        <View className="flex-row items-center gap-2">
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className="text-center text-[15px] text-white"
          >
            <BarIndicator color="#fff" size={20} />
          </Text>
        </View>
      ) : (
        <Text
          style={{
            color: "#fff",
            fontFamily: "poppinsRegular",
            fontSize: 14,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
