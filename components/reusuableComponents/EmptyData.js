import { Text, View } from "react-native";
import EmptySVG from "../../assets/img/empty.svg";
export const EmptyData = ({ msg }) => {
  return (
    <View className="items-center justify-center py-8">
      <EmptySVG width={120} height={120} />
      <Text
        className="text-[14px] text-center text-gray-400 mt-2"
        style={{ fontFamily: "poppinsRegular" }}
      >
        {msg}
      </Text>
    </View>
  );
};
