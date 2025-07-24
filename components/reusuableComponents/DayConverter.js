export const DayConverter = (dateInput) => {
  if (!dateInput) return "";

  let dateObj;

  if (typeof dateInput === "string") {
    // ISO string
    dateObj = new Date(dateInput);
  } else if (dateInput instanceof Date) {
    // Date object
    dateObj = dateInput;
  } else if (
    typeof dateInput === "object" &&
    dateInput.year &&
    dateInput.month &&
    dateInput.day
  ) {
    // Object with year, month, day
    dateObj = new Date(dateInput.year, dateInput.month - 1, dateInput.day);
  } else {
    return "";
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dateObj.getDay()];
};
