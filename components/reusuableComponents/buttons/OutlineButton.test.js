import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OutlineButton from "./OutlineButton";
import { View } from "react-native";

describe("OutlineButton Component", () => {
  it("renders the title", () => {
    const { getByText } = render(
      <OutlineButton title="Click Me" onPress={() => {}} />
    );
    expect(getByText("Click Me")).toBeTruthy();
  });

  it("calls onPress when tapped", () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <OutlineButton title="Click Me" onPress={mockPress} />
    );
    fireEvent.press(getByText("Click Me"));
    expect(mockPress).toHaveBeenCalled();
  });

  it("renders icon on the left", () => {
    const icon = <View testID="icon-left" />;
    const { getByTestId } = render(
      <OutlineButton
        title="Click Me"
        onPress={() => {}}
        icon={icon}
        iconPosition="left"
      />
    );
    expect(getByTestId("icon-left")).toBeTruthy();
  });

  it("renders icon on the right", () => {
    const icon = <View testID="icon-right" />;
    const { getByTestId } = render(
      <OutlineButton
        title="Click Me"
        onPress={() => {}}
        icon={icon}
        iconPosition="right"
      />
    );
    expect(getByTestId("icon-right")).toBeTruthy();
  });

  it("applies left alignment when positionLeft is true", () => {
    const { UNSAFE_getByType } = render(
      <OutlineButton title="Click Me" onPress={() => {}} positionLeft={true} />
    );
    const button = UNSAFE_getByType(require("react-native").TouchableOpacity);
    expect(button.props.className).toContain("justify-start");
  });
});
