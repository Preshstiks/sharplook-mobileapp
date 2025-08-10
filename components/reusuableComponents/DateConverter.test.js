import {
  DateConverter,
  formatDateToDDMMYYYY,
  formatDateTime,
} from "./DateConverter";

describe("DateConverter", () => {
  it("should return long format", () => {
    expect(DateConverter("2025-08-10T14:30:00Z", "long")).toBe(
      "August 10, 2025"
    );
  });

  it("should return short format", () => {
    expect(DateConverter("2025-08-10T14:30:00Z", "short")).toBe("Aug 10, 2025");
  });

  it("should return medium format", () => {
    expect(DateConverter("2025-08-10T14:30:00Z", "medium")).toBe(
      "August 10, 2025"
    );
  });

  it("should return empty string for null or invalid date", () => {
    expect(DateConverter(null)).toBe("");
    expect(DateConverter("invalid-date")).toBe("");
  });
});

describe("formatDateToDDMMYYYY", () => {
  it("should format date as DD/MM/YYYY", () => {
    expect(formatDateToDDMMYYYY("2025-08-10T14:30:00Z")).toBe("10/08/2025");
    expect(formatDateToDDMMYYYY("2023-01-05T09:15:00Z")).toBe("05/01/2023");
  });

  it("should return empty string for null or invalid date", () => {
    expect(formatDateToDDMMYYYY(null)).toBe("");
    expect(formatDateToDDMMYYYY("invalid-date")).toBe("");
  });
});

describe("formatDateTime", () => {
  test("formatDateTime > should format date and time correctly", () => {
    const isoString = "2025-08-10T14:30:00Z";
    expect(formatDateTime(isoString)).toBe("August 10, 2025 15:30");
  });
});

it("should return '--' for null or invalid date", () => {
  expect(formatDateTime(null)).toBe("--");
  expect(formatDateTime("invalid-date")).toBe("--");
});
