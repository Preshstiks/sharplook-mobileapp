// BottomModal.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BottomModal from "./BottomModal";
import { Animated, Text } from "react-native";

// Mock expo-blur to avoid native issues in tests
jest.mock("expo-blur", () => ({
  BlurView: ({ children }) => <>{children}</>,
}));

// Disable actual animations
jest.spyOn(Animated, "timing").mockImplementation(() => ({
  start: (cb) => cb && cb(),
}));

describe("BottomModal", () => {
  it("renders children when visible", () => {
    const { getByText } = render(
      <BottomModal isVisible={true} onClose={jest.fn()}>
        <Text>Test Content</Text>
      </BottomModal>
    );

    expect(getByText("Test Content")).toBeTruthy();
  });

  it("calls onClose when backdrop is pressed and showCloseBtn is false", () => {
    const onCloseMock = jest.fn();

    const { getByTestId } = render(
      <BottomModal isVisible={true} onClose={onCloseMock}>
        <Text>Backdrop Test</Text>
      </BottomModal>
    );

    fireEvent.press(getByTestId("backdrop"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("renders close button when showCloseBtn is true", () => {
    const { getByRole } = render(
      <BottomModal isVisible={true} showCloseBtn={true} onClose={jest.fn()}>
        <Text>With Close</Text>
      </BottomModal>
    );

    expect(getByRole("button")).toBeTruthy();
  });

  it("calls onClose when close button is pressed", () => {
    const onCloseMock = jest.fn();

    const { getByRole } = render(
      <BottomModal isVisible={true} showCloseBtn={true} onClose={onCloseMock}>
        <Text>With Close</Text>
      </BottomModal>
    );

    fireEvent.press(getByRole("button"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("does not call onClose when backdrop is pressed and showCloseBtn is true", () => {
    const onCloseMock = jest.fn();

    const { getByTestId } = render(
      <BottomModal isVisible={true} showCloseBtn={true} onClose={onCloseMock}>
        <Text>With Close</Text>
      </BottomModal>
    );

    fireEvent.press(getByTestId("backdrop"));
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
