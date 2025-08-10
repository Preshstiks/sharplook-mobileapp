import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SuccessModal from "./SuccessModal";

jest.mock("lottie-react-native", () => "LottieView");

jest.mock("react-native-modal", () => {
  return ({ children, isVisible }) => (isVisible ? children : null);
});

describe("SuccessModal Component", () => {
  it("renders the message and button when visible", () => {
    const mockClose = jest.fn();

    const { getByText } = render(
      <SuccessModal visible={true} onClose={mockClose} />
    );

    expect(
      getByText(
        "Congratulations, you have successfully verified your email account"
      )
    ).toBeTruthy();

    const button = getByText("Proceed to Login");
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(mockClose).toHaveBeenCalled();
  });

  it("does not render when visible is false", () => {
    const { queryByText } = render(<SuccessModal visible={false} />);
    expect(
      queryByText(
        "Congratulations, you have successfully verified your email account"
      )
    ).toBeNull();
  });
});
