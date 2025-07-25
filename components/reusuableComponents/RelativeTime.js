import React from "react";

/**
 * Converts an ISO date string to a relative time string (e.g., '5 mins ago', '1 hr ago', 'just now', '2 days ago', etc.).
 * @param {string|Date} isoDate - The ISO date string or Date object to convert.
 * @returns {string} The relative time string.
 */
export const getRelativeTime = (isoDate) => {
  if (!isoDate) return "";
  const now = new Date();
  const date = typeof isoDate === "string" ? new Date(isoDate) : isoDate;
  if (isNaN(date)) return "";

  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min${diffMin === 1 ? "" : "s"} ago`;
  if (diffHr < 24) return `${diffHr} hr${diffHr === 1 ? "" : "s"} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  if (diffWeek < 5) return `${diffWeek} week${diffWeek === 1 ? "" : "s"} ago`;
  if (diffMonth < 12)
    return `${diffMonth} month${diffMonth === 1 ? "" : "s"} ago`;
  return `${diffYear} year${diffYear === 1 ? "" : "s"} ago`;
};
