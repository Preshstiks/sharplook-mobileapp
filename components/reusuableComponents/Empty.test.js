// Empty.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import { EmptyState } from "./Empty";
// Mock the SVG import as a simple React component for the test
jest.mock("../../assets/img/empty.svg", () => (props) => {
  return <svg {...props} testID="empty-svg" />;
});

describe("EmptyState", () => {
  it("renders correctly with given item prop", () => {
    const { getByText, getByTestId } = render(<EmptyState item="messages" />);

    expect(getByText("Oops! You have no messages")).toBeTruthy();
    expect(getByTestId("empty-svg")).toBeTruthy();
  });
});
