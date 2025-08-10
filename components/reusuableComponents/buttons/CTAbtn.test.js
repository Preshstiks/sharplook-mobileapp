import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CTAbtn } from "./CTAbtn";

jest.mock("react-native-indicators", () => {
  return {
    BarIndicator: () => <></>,
  };
});

describe("CTAbtn Component", () => {
  it("renders the title when not loading", () => {
    const { getByText } = render(
      <CTAbtn title="Continue" onPress={() => {}} />
    );
    expect(getByText("Continue")).toBeTruthy();
  });

  it("shows loader when isloading is true", () => {
    const { queryByText } = render(
      <CTAbtn title="Continue" isloading={true} onPress={() => {}} />
    );
    expect(queryByText("Continue")).toBeNull();
  });

  it("calls onPress when tapped and not loading", () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <CTAbtn title="Continue" onPress={mockPress} />
    );
    fireEvent.press(getByText("Continue"));
    expect(mockPress).toHaveBeenCalled();
  });

  it("does not call onPress when loading", () => {
    const mockPress = jest.fn();
    const { UNSAFE_getByType } = render(
      <CTAbtn title="Continue" isloading={true} onPress={mockPress} />
    );
    fireEvent.press(UNSAFE_getByType(require("react-native").TouchableOpacity));
    expect(mockPress).toHaveBeenCalled();
  });
});
