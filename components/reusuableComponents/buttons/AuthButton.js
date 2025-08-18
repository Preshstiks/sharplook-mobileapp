import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { BarIndicator } from "react-native-indicators";

export default function AuthButton({
  onPress,
  title,
  isloading,
  iconLeft,
  iconRight,
  loadingMsg,
  disabled,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      className={`mt-2 rounded-[12px] border h-[52px] flex items-center justify-center w-full  
bg-primary border-primary ${isloading ? "cursor-not-allowed bg-[#c681a5]" : ""} ${disabled ? "bg-[#ffddef]  border-[#ffddef] text-white cursor-not-allowed" : ""}`}
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
        <View className="flex-row items-center justify-center w-full">
          {iconLeft && <View className="mr-2">{iconLeft}</View>}
          <Text
            style={{ fontFamily: "poppinsMedium" }}
            className={`text-center text-[15px] ${disabled ? "text-white" : "text-white"}`}
          >
            {title}
          </Text>
          {iconRight && <View className="ml-2">{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}
