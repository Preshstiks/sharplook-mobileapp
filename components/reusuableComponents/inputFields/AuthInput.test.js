import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { AuthInput } from "./AuthInput";
import { act } from "react-test-renderer";
describe("AuthInput Component", () => {
  it("renders label and placeholder", () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthInput label="Email" placeholder="Enter your email" />
    );

    expect(getByText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
  });

  it("calls onChangeText when typing", () => {
    const mockChange = jest.fn();
    const { getByPlaceholderText } = render(
      <AuthInput
        label="Name"
        placeholder="Enter name"
        onChangeText={mockChange}
      />
    );

    fireEvent.changeText(getByPlaceholderText("Enter name"), "John Doe");
    expect(mockChange).toHaveBeenCalledWith("John Doe");
  });

  it("toggles password visibility when eye icon is pressed", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <AuthInput
        label="Password"
        placeholder="Enter password"
        secureTextEntry
      />
    );

    const passwordInput = getByPlaceholderText("Enter password");
    expect(passwordInput.props.secureTextEntry).toBe(true);

    act(() => {
      fireEvent.press(getByTestId("toggle-password-visibility"));
    });

    expect(passwordInput.props.secureTextEntry).toBe(false);
  });

  it("calls onBlur when input loses focus", () => {
    const mockBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <AuthInput label="Email" placeholder="Enter email" onBlur={mockBlur} />
    );

    fireEvent(getByPlaceholderText("Enter email"), "blur");
    expect(mockBlur).toHaveBeenCalled();
  });

  it("displays error message when error and touched are true", () => {
    const { getByText } = render(
      <AuthInput
        label="Email"
        placeholder="Enter email"
        error="Invalid email"
        touched={true}
      />
    );

    expect(getByText("Invalid email")).toBeTruthy();
  });
});
