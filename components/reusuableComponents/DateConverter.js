export const DateConverter = (isoDate, format = "long") => {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  const options = {
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    medium: {
      year: "numeric",
      month: "long",
      day: "2-digit",
    },
  };

  return date.toLocaleDateString("en-US", options[format] || options.long);
};

export function formatDateToDDMMYYYY(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDateTime(isoString) {
  if (!isoString) return "--";
  const date = new Date(isoString);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month} ${day}, ${year} ${hours}:${minutes}`;
}
