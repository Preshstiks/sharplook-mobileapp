import React from "react";
import { render } from "@testing-library/react-native";
import { EmptyData } from "./EmptyData";

jest.mock("../../assets/img/empty.svg", () => (props) => {
  return <svg {...props} testID="empty-svg" />;
});

describe("EmptyData", () => {
  it("renders correctly with given msg prop", () => {
    const testMsg = "No data available";

    const { getByText, getByTestId } = render(<EmptyData msg={testMsg} />);

    expect(getByTestId("empty-svg")).toBeTruthy();

    expect(getByText(testMsg)).toBeTruthy();
  });
});
