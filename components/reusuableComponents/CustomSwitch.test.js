import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomSwitch from "./CustomSwitch";
import { Animated } from "react-native";
import { act } from "@testing-library/react-native";
describe("CustomSwitch", () => {
  beforeAll(() => {
    jest.useFakeTimers(); // control Animated.timing
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders 'on' text when value is true", () => {
    const { getByText } = render(
      <CustomSwitch value={true} onValueChange={() => {}} />
    );
    expect(getByText("on")).toBeTruthy();
  });
  it("animates thumb position on value change", () => {
    const { rerender } = render(
      <CustomSwitch value={false} onValueChange={() => {}} />
    );
    const spy = jest.spyOn(Animated, "timing");

    act(() => {
      rerender(<CustomSwitch value={true} onValueChange={() => {}} />);
      jest.runAllTimers(); // finish animation
    });

    expect(spy).toHaveBeenCalled();
  });
  it("renders 'off' text when value is false", () => {
    const { getByText } = render(
      <CustomSwitch value={false} onValueChange={() => {}} />
    );
    expect(getByText("off")).toBeTruthy();
  });

  it("calls onValueChange with toggled value when pressed", () => {
    const mockFn = jest.fn();
    const { getByRole } = render(
      <CustomSwitch value={false} onValueChange={mockFn} />
    );
    fireEvent.press(getByRole("switch"));
    expect(mockFn).toHaveBeenCalledWith(true);
  });

  it("shows correct accessibility state when on", () => {
    const { getByRole } = render(
      <CustomSwitch value={true} onValueChange={() => {}} />
    );
    expect(getByRole("switch").props.accessibilityState).toEqual({
      checked: true,
    });
  });

  it("shows correct accessibility state when off", () => {
    const { getByRole } = render(
      <CustomSwitch value={false} onValueChange={() => {}} />
    );
    expect(getByRole("switch").props.accessibilityState).toEqual({
      checked: false,
    });
  });

  it("animates thumb position on value change", () => {
    const { rerender } = render(
      <CustomSwitch value={false} onValueChange={() => {}} />
    );
    const spy = jest.spyOn(Animated, "timing");
    act(() => {
      rerender(<CustomSwitch value={true} onValueChange={() => {}} />);
      jest.runAllTimers();
    });

    expect(spy).toHaveBeenCalled();
  });
});
