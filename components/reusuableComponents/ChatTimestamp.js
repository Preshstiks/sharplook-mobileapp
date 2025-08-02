import React from "react";
import { Text, View } from "react-native";

export const ChatTimestamp = ({
  timestamp,
  showDate = true,
  showTime = true,
}) => {
  if (!timestamp) return null;

  const messageDate = new Date(timestamp);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const messageDay = new Date(
    messageDate.getFullYear(),
    messageDate.getMonth(),
    messageDate.getDate()
  );

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDayName = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  const isToday = messageDay.getTime() === today.getTime();
  const isYesterday = messageDay.getTime() === yesterday.getTime();
  const isThisWeek =
    messageDay.getTime() >=
    new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).getTime();

  let dateText = "";
  let timeText = formatTime(messageDate);

  if (isToday) {
    // Today - only show time
    dateText = "";
  } else if (isYesterday) {
    // Yesterday - show "Yesterday" and time
    dateText = "Yesterday";
  } else if (isThisWeek) {
    // This week - show day name and time
    dateText = getDayName(messageDate);
  } else {
    // Older - show full date and time
    dateText = formatDate(messageDate);
  }

  return (
    <View className="items-end">
      {showDate && dateText && (
        <Text
          className="text-xs text-[#A9A9A9] mb-1"
          style={{ fontFamily: "poppinsRegular" }}
        >
          {dateText}
        </Text>
      )}
      {showTime && (
        <Text
          className="text-xs text-[#A9A9A9]"
          style={{ fontFamily: "poppinsRegular" }}
        >
          {timeText}
        </Text>
      )}
    </View>
  );
};
