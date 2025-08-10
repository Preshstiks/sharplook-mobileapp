// __tests__/timeUtils.test.js
import { getRelativeTime, groupNotificationsByAge } from "./RelativeTime";

describe("getRelativeTime", () => {
  const now = new Date();

  test("returns empty string if no date is passed", () => {
    expect(getRelativeTime(null)).toBe("");
    expect(getRelativeTime(undefined)).toBe("");
  });

  test("returns 'just now' if difference is less than 1 minute", () => {
    const date = new Date(now.getTime() - 30 * 1000); // 30 seconds ago
    expect(getRelativeTime(date)).toBe("just now");
  });

  test("returns minutes ago", () => {
    const date = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
    expect(getRelativeTime(date)).toBe("5 mins ago");
  });

  test("returns singular minute correctly", () => {
    const date = new Date(now.getTime() - 60 * 1000); // 1 minute ago
    expect(getRelativeTime(date)).toBe("1 min ago");
  });

  test("returns hours ago", () => {
    const date = new Date(now.getTime() - 3 * 60 * 60 * 1000); // 3 hours ago
    expect(getRelativeTime(date)).toBe("3 hrs ago");
  });

  test("returns singular hour correctly", () => {
    const date = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
    expect(getRelativeTime(date)).toBe("1 hr ago");
  });

  test("returns days ago", () => {
    const date = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    expect(getRelativeTime(date)).toBe("2 days ago");
  });

  test("returns weeks ago", () => {
    const date = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000); // 2 weeks ago
    expect(getRelativeTime(date)).toBe("2 weeks ago");
  });

  test("returns months ago", () => {
    const date = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000); // ~2 months ago
    expect(getRelativeTime(date)).toBe("2 months ago");
  });

  test("returns years ago", () => {
    const date = new Date(now.getTime() - 3 * 365 * 24 * 60 * 60 * 1000); // 3 years ago
    expect(getRelativeTime(date)).toBe("3 years ago");
  });

  test("returns empty string for invalid date", () => {
    expect(getRelativeTime("invalid-date")).toBe("");
  });
});

describe("groupNotificationsByAge", () => {
  const now = new Date();

  const makeNotification = (offsetMs) => ({
    id: Math.random().toString(36).substring(7),
    createdAt: new Date(now.getTime() - offsetMs).toISOString(),
    message: "Test notification",
  });

  test("returns empty array if input is not an array", () => {
    expect(groupNotificationsByAge(null)).toEqual([]);
    expect(groupNotificationsByAge({})).toEqual([]);
  });

  test("groups notifications into 'Today'", () => {
    const notifications = [
      makeNotification(2 * 60 * 60 * 1000), // 2 hours ago
      makeNotification(10 * 60 * 1000), // 10 mins ago
    ];
    const result = groupNotificationsByAge(notifications);
    expect(result[0].title).toBe("Today");
    expect(result[0].data.length).toBe(2);
  });

  test("groups notifications into 'Yesterday'", () => {
    const notifications = [makeNotification(25 * 60 * 60 * 1000)]; // 25 hours ago
    const result = groupNotificationsByAge(notifications);
    expect(result[0].title).toBe("Yesterday");
  });

  test("groups notifications into '2 days ago' to '6 days ago'", () => {
    const notifications = [makeNotification(3 * 24 * 60 * 60 * 1000)]; // 3 days ago
    const result = groupNotificationsByAge(notifications);
    expect(result[0].title).toBe("3 days ago");
  });

  test("groups notifications into weeks", () => {
    const notifications = [
      makeNotification(8 * 24 * 60 * 60 * 1000), // 8 days ago → 1 week ago
      makeNotification(15 * 24 * 60 * 60 * 1000), // 2 weeks ago
    ];
    const result = groupNotificationsByAge(notifications);
    expect(result.map((section) => section.title)).toEqual(
      expect.arrayContaining(["1 week ago", "2 weeks ago"])
    );
  });

  test("groups notifications into months", () => {
    const notifications = [
      makeNotification(32 * 24 * 60 * 60 * 1000), // 1 month ago approx
      makeNotification(90 * 24 * 60 * 60 * 1000), // 3 months ago approx
    ];
    const result = groupNotificationsByAge(notifications);
    expect(result.map((section) => section.title)).toEqual(
      expect.arrayContaining(["1 month ago", "3 months ago"])
    );
  });

  test("groups notifications into years", () => {
    const notifications = [
      makeNotification(365 * 24 * 60 * 60 * 1000), // 1 year ago
      makeNotification(3 * 365 * 24 * 60 * 60 * 1000), // 3 years ago
    ];
    const result = groupNotificationsByAge(notifications);
    expect(result.map((section) => section.title)).toEqual(
      expect.arrayContaining(["1 year ago", "3 years ago"])
    );
  });

  test("ignores notifications with invalid or missing dates", () => {
    const notifications = [
      makeNotification(60 * 60 * 1000),
      { id: "invalid", createdAt: "bad-date" },
      { id: "no-date" },
    ];
    const result = groupNotificationsByAge(notifications);
    expect(result[0].data.some((n) => n.id === "invalid")).toBe(false);
    expect(result[0].data.some((n) => n.id === "no-date")).toBe(false);
  });
});
