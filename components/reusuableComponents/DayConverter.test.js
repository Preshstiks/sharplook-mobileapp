import { DayConverter } from "./DayConverter";

describe("DayConverter", () => {
  it("returns empty string for null or undefined input", () => {
    expect(DayConverter(null)).toBe("");
    expect(DayConverter(undefined)).toBe("");
  });

  it("returns empty string for invalid input", () => {
    expect(DayConverter(123)).toBe("");
    expect(DayConverter({ foo: "bar" })).toBe("");
  });

  it("correctly converts ISO date string to day name", () => {
    expect(DayConverter("2023-08-10")).toBe("Thursday");
    expect(DayConverter("2023-08-13")).toBe("Sunday");
  });

  it("correctly converts Date object to day name", () => {
    expect(DayConverter(new Date("2023-08-10"))).toBe("Thursday");
    expect(DayConverter(new Date("2023-08-13"))).toBe("Sunday");
  });

  it("correctly converts object with year, month, day to day name", () => {
    expect(DayConverter({ year: 2023, month: 8, day: 10 })).toBe("Thursday");
    expect(DayConverter({ year: 2023, month: 8, day: 13 })).toBe("Sunday");
  });

  it("returns empty string if object missing year, month or day", () => {
    expect(DayConverter({ year: 2023, month: 8 })).toBe("");
    expect(DayConverter({ month: 8, day: 10 })).toBe("");
    expect(DayConverter({ year: 2023, day: 10 })).toBe("");
  });
});
