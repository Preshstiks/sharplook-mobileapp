import React from "react";
import { render } from "@testing-library/react-native";
import LoaderOverlay from "./LoaderOverlay";

jest.mock("react-native-indicators", () => {
  return {
    UIActivityIndicator: (props) => (
      <div testID="loader-indicator" {...props} />
    ),
  };
});

describe("LoaderOverlay", () => {
  it("renders nothing when visible is false", () => {
    const { toJSON } = render(<LoaderOverlay visible={false} />);
    expect(toJSON()).toBeNull();
  });

  it("renders the loader when visible is true", () => {
    const { getByTestId } = render(<LoaderOverlay visible={true} />);
    expect(getByTestId("loader-indicator")).toBeTruthy();
  });
});
