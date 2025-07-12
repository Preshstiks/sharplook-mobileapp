import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Specialist1 from "../../../assets/img/ayo.svg";
import Specialist2 from "../../../assets/img/alex.svg";
import Specialist3 from "../../../assets/img/sharon.svg";
import Specialist4 from "../../../assets/img/priti.svg";
import { Calendar } from "react-native-calendars";
import { AuthInput } from "../../reusuableComponents/inputFields/AuthInput";
import { useStatusBar } from "../../../context/StatusBarContext";
const specialists = [
  { name: "Ayomide", Img: Specialist1 },
  { name: "Alex", Img: Specialist2 },
  { name: "Sharon", Img: Specialist3 },
  { name: "Priti", Img: Specialist4 },
  { name: "James", Img: Specialist2 },
];

const daysShort = ["Mo", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = Array.from({ length: 31 }, (_, i) => i + 1);

export default function BookAppointmentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { setBarType } = useStatusBar();
  useEffect(() => {
    setBarType("primary");
  }, []);
  const { service } = route.params || {};
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayString);
  const [selectedSpecialist, setSelectedSpecialist] = useState(0);
  const [time, setTime] = useState("");
  const totalPayment = service?.price || "₦4,000";

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary pt-[60px] pb-4 flex-row items-center justify-between px-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          className="text-white text-[16px] flex-1 text-center"
          style={{ fontFamily: "poppinsMedium" }}
        >
          Book Appointment
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="px-4 mt-6">
          <Text
            className="text-[16px] mb-2"
            style={{ fontFamily: "poppinsMedium" }}
          >
            Choose Date and Time
          </Text>
          {/* Calendar */}
          <View className="bg-white rounded-xl p-4 mb-4">
            <Calendar
              current={selectedDate}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: "#EB278D",
                  selectedTextColor: "#fff",
                },
              }}
              theme={{
                backgroundColor: "#fff",
                calendarBackground: "#fff",
                textSectionTitleColor: "#222",
                textSectionTitleDisabledColor: "#d9e1e8",
                selectedDayBackgroundColor: "#E91E63",
                selectedDayTextColor: "#fff",
                todayTextColor: "#E91E63",
                dayTextColor: "#222",
                textDisabledColor: "#d9e1e8",
                arrowColor: "#222",
                monthTextColor: "#222",
                textMonthFontWeight: "bold",
                textDayFontFamily: "Poppins-Medium",
                textMonthFontFamily: "Poppins-Medium",
                textDayHeaderFontFamily: "Poppins-Medium",
              }}
              renderArrow={(direction) => (
                <Ionicons
                  name={
                    direction === "left" ? "chevron-back" : "chevron-forward"
                  }
                  size={20}
                  color="#222"
                />
              )}
              hideExtraDays={true}
              firstDay={1}
              style={{ borderRadius: 16 }}
            />
          </View>
          <View className="mb-5">
            <AuthInput label="Enter Time" name="time" />
          </View>
          {/* Specialist selection */}
          <Text
            className="text-lg font-semibold mb-2 mt-2"
            style={{ fontFamily: "poppinsMedium" }}
          >
            Choose Specialist
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {specialists.map((sp, idx) => (
              <TouchableOpacity
                key={sp.name}
                className={`items-center mr-6 ${selectedSpecialist === idx ? "" : "opacity-60"}`}
                onPress={() => setSelectedSpecialist(idx)}
              >
                <View
                  className={`rounded-full border-2 ${selectedSpecialist === idx ? "border-primary" : "border-lightgray"} mb-2`}
                  style={{
                    width: 64,
                    height: 64,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <sp.Img width={60} height={60} />
                </View>
                <Text
                  className="text-xs font-semibold text-faintDark2 text-center"
                  style={{ fontFamily: "poppinsSemiBold" }}
                >
                  {sp.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Total Payment */}
          <View className="flex-row justify-between items-center border-t border-[#0000001A] py-4 mt-2">
            <Text
              className="text-base font-semibold"
              style={{ fontFamily: "poppinsMedium" }}
            >
              Total Payment
            </Text>
            <Text
              className="text-primary text-lg font-bold"
              style={{ fontFamily: "poppinsMedium" }}
            >
              {totalPayment}
            </Text>
          </View>
        </View>
        {/* Proceed to Payment Button */}
        <View className="px-4 mt-4">
          <TouchableOpacity
            className="bg-primary rounded-xl py-4 items-center"
            onPress={() => navigation.navigate("DebitCardScreen")}
          >
            <Text
              className="text-white text-base font-semibold"
              style={{ fontFamily: "poppinsMedium" }}
            >
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
