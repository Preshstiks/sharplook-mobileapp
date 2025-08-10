import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AuthButton from "./AuthButton";

jest.mock("react-native-indicators", () => {
  return {
    BarIndicator: () => <></>,
  };
});

describe("AuthButton Component", () => {
  it("renders title when not loading", () => {
    const { getByText } = render(
      <AuthButton title="Login" onPress={() => {}} />
    );
    expect(getByText("Login")).toBeTruthy();
  });

  it("shows loader when isloading is true", () => {
    const { queryByText } = render(
      <AuthButton title="Login" isloading={true} onPress={() => {}} />
    );

    expect(queryByText("Login")).toBeNull();
  });

  it("calls onPress when pressed and not disabled", () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <AuthButton title="Login" onPress={mockPress} />
    );
    fireEvent.press(getByText("Login"));
    expect(mockPress).toHaveBeenCalled();
  });

  it("does not call onPress when disabled", () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <AuthButton title="Login" onPress={mockPress} disabled={true} />
    );
    fireEvent.press(getByText("Login"));
    expect(mockPress).not.toHaveBeenCalled();
  });
});
