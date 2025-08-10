import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PhoneInput } from "./PhoneInput";
jest.mock("@expo/vector-icons", () => ({
  Ionicons: jest.fn(() => null),
}));

describe("PhoneInput", () => {
  it("renders the label", () => {
    const { getByText } = render(
      <PhoneInput
        label="Phone Number"
        value=""
        onChangeText={() => {}}
        touched={false}
        error=""
      />
    );
    expect(getByText("Phone Number")).toBeTruthy();
  });

  it("formats Nigerian phone number with +234", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <PhoneInput
        label="Phone"
        placeholder="Enter phone"
        value=""
        onChangeText={onChangeText}
        isPhoneInput
        touched={false}
        error=""
      />
    );

    const input = getByPlaceholderText("Enter phone");
    fireEvent.changeText(input, "08123456789");
    expect(onChangeText).toHaveBeenCalledWith("+2348123456789");
  });

  it("toggles password visibility when eye icon is pressed", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <PhoneInput
        label="Password"
        placeholder="Enter password"
        value="secret"
        onChangeText={() => {}}
        secureTextEntry
        touched={false}
        error=""
      />
    );

    const input = getByPlaceholderText("Enter password");
    expect(input.props.secureTextEntry).toBe(true);

    const eyeButton = getByTestId("toggle-password");
    fireEvent.press(eyeButton);
    expect(input.props.secureTextEntry).toBe(false);
  });

  it("shows error text when touched and error provided", () => {
    const { getByText } = render(
      <PhoneInput
        label="Phone"
        value=""
        onChangeText={() => {}}
        touched={true}
        error="Invalid number"
      />
    );

    expect(getByText("Invalid number")).toBeTruthy();
  });
});
