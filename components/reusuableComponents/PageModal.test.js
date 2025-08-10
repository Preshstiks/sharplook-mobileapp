import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import PageModal from "./PageModal";
import { Text } from "react-native";

describe("PageModal", () => {
  it("renders null when visible is false", () => {
    const { toJSON } = render(<PageModal visible={false} />);
    expect(toJSON()).toBeNull();
  });

  it("renders children when visible is true", () => {
    const { getByText } = render(
      <PageModal visible={true} onClose={() => {}}>
        <Text>Modal Content</Text>
      </PageModal>
    );
    expect(getByText("Modal Content")).toBeTruthy();
  });

  it("calls onClose when backdrop is pressed and showCloseBtn is false", () => {
    const onCloseMock = jest.fn();

    const { getByTestId } = render(
      <PageModal visible={true} onClose={onCloseMock} showCloseBtn={false}>
        <Text>Modal Content</Text>
      </PageModal>
    );

    fireEvent.press(getByTestId("backdrop-touchable"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onClose when backdrop pressed and showCloseBtn is true", () => {
    const onCloseMock = jest.fn();

    const { getByTestId } = render(
      <PageModal visible={true} onClose={onCloseMock} showCloseBtn={true}>
        <Text>Modal Content</Text>
      </PageModal>
    );

    fireEvent.press(getByTestId("backdrop-touchable"));
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
