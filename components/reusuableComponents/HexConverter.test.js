import { HexConverter } from "./HexConverter";

describe("HexConverter", () => {
  it("returns '#0' when input is falsy", () => {
    expect(HexConverter(null)).toBe("#0");
    expect(HexConverter(undefined)).toBe("#0");
    expect(HexConverter("")).toBe("#0");
  });

  it("returns a string starting with # for valid hex strings", () => {
    const result = HexConverter("abc123");
    expect(result).toMatch(/^#\d+$/);
  });

  it("returns different results for different inputs", () => {
    const res1 = HexConverter("abc");
    const res2 = HexConverter("def");
    expect(res1).not.toBe(res2);
  });

  it("returns a numeric hash within expected range", () => {
    const res = HexConverter("teststring");
    const numericPart = Number(res.slice(1));
    expect(numericPart).toBeGreaterThanOrEqual(0);
    expect(numericPart).toBeLessThan(1000000);
  });
});
