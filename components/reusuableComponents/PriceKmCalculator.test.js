import { calculatePrice } from "./PriceKmCalculator";

describe("calculatePrice", () => {
  it("returns 0 for negative distance", () => {
    expect(calculatePrice(-10)).toBe(0);
  });

  it("calculates price correctly for distances within 0 to 100 km", () => {
    expect(calculatePrice(0)).toBe(1000);
    expect(calculatePrice(1)).toBe(1000);
    expect(calculatePrice(5)).toBe(1000);

    expect(calculatePrice(6)).toBe(2000);
    expect(calculatePrice(10)).toBe(2000);

    expect(calculatePrice(11)).toBe(3000);
    expect(calculatePrice(15)).toBe(3000);

    expect(calculatePrice(96)).toBe(20000);
    expect(calculatePrice(100)).toBe(20000);
  });

  it("calculates price correctly for distances above 100 km", () => {
    expect(calculatePrice(101)).toBe(21000);
    expect(calculatePrice(110)).toBe(22000);
    expect(calculatePrice(115)).toBe(23000);
  });

  it("returns 0 for distance exactly 0 if not covered by loop (but covered here)", () => {
    expect(calculatePrice(0)).toBe(1000);
  });
});
