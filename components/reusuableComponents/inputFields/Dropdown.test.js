import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Dropdown from "./Dropdown";

describe("Dropdown Component", () => {
  const mockOnValueChange = jest.fn();
  const options = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label and placeholder", () => {
    const { getByText, getByTestId } = render(
      <Dropdown
        label="Select Item"
        placeholder="Choose one..."
        value=""
        onValueChange={mockOnValueChange}
        options={options}
      />
    );

    expect(getByText("Select Item")).toBeTruthy();
  });

  it("calls onValueChange when a value is selected", () => {
    const { getByTestId } = render(
      <Dropdown
        label="Select Item"
        value=""
        onValueChange={mockOnValueChange}
        options={options}
      />
    );

    fireEvent(getByTestId("picker-element"), "onValueChange", "opt1");
    expect(mockOnValueChange).toHaveBeenCalledWith("opt1");
  });

  it("renders all provided options", () => {
    const { getByTestId } = render(
      <Dropdown
        label="Select Item"
        value=""
        onValueChange={mockOnValueChange}
        options={options}
      />
    );
  });

  it("displays error text when error and touched are true", () => {
    const { getByText } = render(
      <Dropdown
        label="Select Item"
        value=""
        onValueChange={mockOnValueChange}
        options={options}
        error="This is required"
        touched={true}
      />
    );

    expect(getByText("This is required")).toBeTruthy();
  });

  it("does not display error text when touched is false", () => {
    const { queryByText } = render(
      <Dropdown
        label="Select Item"
        value=""
        onValueChange={mockOnValueChange}
        options={options}
        error="This is required"
        touched={false}
      />
    );

    expect(queryByText("This is required")).toBeNull();
  });
});
