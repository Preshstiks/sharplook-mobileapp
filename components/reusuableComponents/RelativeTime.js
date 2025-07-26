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

/**
 * Groups notifications by their age into sections
 * @param {Array} notifications - Array of notification objects
 * @returns {Array} Array of sections with title and data properties
 */
export const groupNotificationsByAge = (notifications) => {
  if (!Array.isArray(notifications)) return [];

  const now = new Date();
  const sections = {};

  notifications.forEach((notification) => {
    if (!notification.createdAt) return;

    const date = new Date(notification.createdAt);
    if (isNaN(date)) return;

    const diffMs = now - date;
    const diffHr = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDay = Math.floor(diffHr / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    let sectionTitle = "";

    if (diffHr < 24) {
      sectionTitle = "Today";
    } else if (diffDay === 1) {
      sectionTitle = "Yesterday";
    } else if (diffDay >= 2 && diffDay <= 6) {
      sectionTitle = `${diffDay} days ago`;
    } else if (diffWeek === 1) {
      sectionTitle = "1 week ago";
    } else if (diffWeek >= 2 && diffWeek <= 3) {
      sectionTitle = `${diffWeek} weeks ago`;
    } else if (diffMonth === 1) {
      sectionTitle = "1 month ago";
    } else if (diffMonth >= 2 && diffMonth <= 11) {
      sectionTitle = `${diffMonth} months ago`;
    } else if (diffYear === 1) {
      sectionTitle = "1 year ago";
    } else if (diffYear > 1) {
      sectionTitle = `${diffYear} years ago`;
    } else {
      sectionTitle = "Older";
    }

    if (!sections[sectionTitle]) {
      sections[sectionTitle] = [];
    }
    sections[sectionTitle].push(notification);
  });

  // Convert to array format and sort by recency
  const sectionOrder = [
    "Today",
    "Yesterday",
    "2 days ago",
    "3 days ago",
    "4 days ago",
    "5 days ago",
    "6 days ago",
    "1 week ago",
    "2 weeks ago",
    "3 weeks ago",
    "1 month ago",
    "2 months ago",
    "3 months ago",
    "4 months ago",
    "5 months ago",
    "6 months ago",
    "7 months ago",
    "8 months ago",
    "9 months ago",
    "10 months ago",
    "11 months ago",
    "1 year ago",
    "2 years ago",
    "3 years ago",
    "4 years ago",
    "5 years ago",
    "Older",
  ];

  return sectionOrder
    .filter((title) => sections[title] && sections[title].length > 0)
    .map((title) => ({
      title,
      data: sections[title],
    }));
};
