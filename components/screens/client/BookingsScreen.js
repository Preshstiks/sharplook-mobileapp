import React, { useEffect } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStatusBar } from "../../../context/StatusBarContext";
import Empty from "../../../assets/img/empty.svg";
const bookings = [
  {
    id: "1",
    service: "Facials",
    vendor: "Heritage Spa and Beauty Services",
    date: "July 26, 2025",
    time: "9:00PM",
    day: "Monday",
    price: "₦ 176,000",
    image: require("../../../assets/img/facials.png"),
    status: "Pending",
  },
  {
    id: "2",
    service: "Facials",
    vendor: "Heritage Spa and Beauty Services",
    date: "July 26, 2025",
    time: "9:00PM",
    day: "Monday",
    price: "₦ 176,000",
    image: require("../../../assets/img/facials.png"),
    status: "Pending",
  },
  {
    id: "3",
    service: "Facials",
    vendor: "Heritage Spa and Beauty Services",
    date: "July 26, 2025",
    time: "9:00PM",
    day: "Monday",
    price: "₦ 176,000",
    image: require("../../../assets/img/facials.png"),
    status: "Pending",
  },
];

export default function BookingsScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = React.useState("Pending");
  const { setBarType } = useStatusBar();
  useEffect(() => {
    setBarType("primary");
  }, []);
  const filteredBookings = bookings.filter((b) => b.status === tab);

  const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-8">
      <Empty width={150} height={150} />

      <Text
        style={{ fontFamily: "poppinsRegular" }}
        className="text-[12px] text-center"
      >
        {tab === "Pending"
          ? "You don't have any pending bookings at the moment."
          : "You don't have any completed bookings yet."}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-secondary">
      <View className="bg-primary pt-[60px] pb-4 px-4">
        <Text
          style={{ fontFamily: "poppinsMedium" }}
          className="text-white text-center text-[16px]"
        >
          My Bookings
        </Text>
      </View>
      <View className="flex-row justify-center mt-8 mb-2 gap-3">
        <Pressable
          className={`px-6 py-3 rounded-[8px] ${tab === "Pending" ? "bg-primary" : "bg-white border border-[#A5A5A5]"}`}
          onPress={() => setTab("Pending")}
        >
          <Text
            style={{ fontFamily: "latoBold" }}
            className={`text-[12px] ${tab === "Pending" ? "text-white" : "text-[#A5A5A5]"}`}
          >
            Pending
          </Text>
        </Pressable>
        <Pressable
          className={`px-6 py-3 rounded-[8px] ${tab === "Completed" ? "bg-primary" : "bg-white border border-[#A5A5A5]"}`}
          onPress={() => setTab("Completed")}
        >
          <Text
            style={{ fontFamily: "latoBold" }}
            className={`text-[12px] ${tab === "Completed" ? "text-white" : "text-[#A5A5A5]"}`}
          >
            Completed
          </Text>
        </Pressable>
      </View>
      {filteredBookings.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView className="px-3 mt-2" showsVerticalScrollIndicator={false}>
          {filteredBookings.map((booking) => (
            <Pressable
              key={booking.id}
              className="flex-row gap-3 bg-white rounded-[12px] shadow-md mb-5 p-3"
              onPress={() =>
                navigation.navigate("BookingDetailScreen", { booking })
              }
            >
              <Image
                source={booking.image}
                className="w-[100px] h-[100px] rounded-[8px] mr-2"
              />
              <View className="flex-1 justify-between">
                <View>
                  <Text
                    style={{ fontFamily: "poppinsMedium" }}
                    className="text-[16px] mb-1 text-fadedDark"
                  >
                    {booking.service}
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[10px] text-fadedDark"
                  >
                    {booking.vendor}
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[10px] text-fadedDark"
                  >
                    {booking.date}
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[10px] text-fadedDark"
                  >
                    {booking.time}
                  </Text>
                  <Text
                    style={{ fontFamily: "poppinsRegular" }}
                    className="text-[10px] text-fadedDark"
                  >
                    {booking.day}
                  </Text>
                </View>
                <Text
                  style={{ fontFamily: "latoBold" }}
                  className="text-primary text-[14px] pr-2 self-end"
                >
                  {booking.price}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
