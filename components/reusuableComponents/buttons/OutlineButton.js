import { Text, TouchableOpacity, View } from "react-native";

export default function OutlineButton({
  onPress,
  title,
  icon,
  iconPosition = "left",
  positionLeft = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mt-2 rounded-[12px] mb-4 border h-[52px] flex flex-row items-center ${positionLeft ? "justify-start pl-6" : "justify-center"} w-full border-primary`}
    >
      {icon && iconPosition === "left" && <View className="mr-4">{icon}</View>}
      <Text
        style={{ fontFamily: "poppinsMedium" }}
        className="text-center text-[13px] text-primary"
      >
        {title}
      </Text>
      {icon && iconPosition === "right" && <View className="ml-2">{icon}</View>}
    </TouchableOpacity>
  );
}
