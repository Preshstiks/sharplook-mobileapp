import React from "react";
import { render } from "@testing-library/react-native";
import { ChatTimestamp } from "./ChatTimestamp";

describe("ChatTimestamp", () => {
  const fixedNow = new Date("2025-08-10T12:00:00Z");

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(fixedNow);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("returns null if timestamp is not provided", () => {
    const { toJSON } = render(<ChatTimestamp />);
    expect(toJSON()).toBeNull();
  });

  it("shows only time for today", () => {
    const ts = new Date("2025-08-10T09:30:00Z").toISOString();
    const { queryByText } = render(<ChatTimestamp timestamp={ts} />);
    expect(queryByText("Yesterday")).toBeNull();
    expect(queryByText(/\d{1,2}:\d{2} (AM|PM)/)).toBeTruthy();
  });

  it("shows 'Yesterday' for yesterday's date", () => {
    const ts = new Date("2025-08-09T15:45:00Z").toISOString();
    const { getByText } = render(<ChatTimestamp timestamp={ts} />);
    expect(getByText("Yesterday")).toBeTruthy();
  });

  it("shows weekday name for earlier this week", () => {
    const ts = new Date("2025-08-08T18:00:00Z").toISOString(); // Friday
    const { getByText } = render(<ChatTimestamp timestamp={ts} />);
    expect(getByText("Friday")).toBeTruthy();
  });

  it("shows full date for older dates", () => {
    const ts = new Date("2025-07-20T14:00:00Z").toISOString();
    const { getByText } = render(<ChatTimestamp timestamp={ts} />);
    expect(getByText("20/07/2025")).toBeTruthy();
  });

  it("hides date if showDate is false", () => {
    const ts = new Date("2025-08-09T15:45:00Z").toISOString();
    const { queryByText } = render(
      <ChatTimestamp timestamp={ts} showDate={false} />
    );
    expect(queryByText("Yesterday")).toBeNull();
  });

  it("hides time if showTime is false", () => {
    const ts = new Date("2025-08-09T15:45:00Z").toISOString();
    const { queryByText } = render(
      <ChatTimestamp timestamp={ts} showTime={false} />
    );
    expect(queryByText(/\d{1,2}:\d{2} (AM|PM)/)).toBeNull();
  });
});
