import { Text, View } from "react-native";
import Empty from "../../assets/img/empty.svg";
export const EmptyState = ({ item }) => (
  <View className="flex-1 justify-center items-center px-8">
    <Empty width={150} height={150} />

    <Text
      style={{ fontFamily: "poppinsRegular" }}
      className="text-[12px] text-center"
    >
      Oops! You have no {item}
    </Text>
  </View>
);
