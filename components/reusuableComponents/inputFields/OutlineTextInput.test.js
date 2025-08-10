import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OutlineTextInput, { OutlineTextAreaInput } from "./OutlineTextInput";

describe("OutlineTextInput", () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label and placeholder", () => {
    const { getByText, getByPlaceholderText } = render(
      <OutlineTextInput
        label="Username"
        placeholder="Enter your username"
        value=""
        onChangeText={mockOnChangeText}
      />
    );

    expect(getByText("Username")).toBeTruthy();
    expect(getByPlaceholderText("Enter your username")).toBeTruthy();
  });

  it("calls onChangeText when typing", () => {
    const { getByPlaceholderText } = render(
      <OutlineTextInput
        placeholder="Type here"
        value=""
        onChangeText={mockOnChangeText}
      />
    );

    fireEvent.changeText(getByPlaceholderText("Type here"), "Hello");
    expect(mockOnChangeText).toHaveBeenCalledWith("Hello");
  });

  it("changes border color on focus", () => {
    const { getByPlaceholderText, toJSON } = render(
      <OutlineTextInput
        placeholder="Focus me"
        value=""
        onChangeText={() => {}}
      />
    );

    const input = getByPlaceholderText("Focus me");
    fireEvent(input, "focus");

    expect(toJSON()).toMatchSnapshot(); // Snapshot will capture focused border class
  });

  it("shows error when error and touched are true", () => {
    const { getByText } = render(
      <OutlineTextInput
        placeholder="Email"
        value=""
        onChangeText={() => {}}
        error="Required field"
        touched={true}
      />
    );

    expect(getByText("Required field")).toBeTruthy();
  });

  it("does not show error when touched is false", () => {
    const { queryByText } = render(
      <OutlineTextInput
        placeholder="Email"
        value=""
        onChangeText={() => {}}
        error="Required field"
        touched={false}
      />
    );

    expect(queryByText("Required field")).toBeNull();
  });

  it("is not editable when editable is false", () => {
    const { getByPlaceholderText } = render(
      <OutlineTextInput
        placeholder="Disabled"
        value=""
        onChangeText={() => {}}
        editable={false}
      />
    );

    const input = getByPlaceholderText("Disabled");
    expect(input.props.editable).toBe(false);
  });
});

describe("OutlineTextAreaInput", () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders multiline textarea with label", () => {
    const { getByText, getByPlaceholderText } = render(
      <OutlineTextAreaInput
        label="Description"
        placeholder="Enter description"
        value=""
        onChangeText={mockOnChangeText}
      />
    );

    expect(getByText("Description")).toBeTruthy();
    expect(getByPlaceholderText("Enter description")).toBeTruthy();
  });

  it("calls onChangeText when text changes", () => {
    const { getByPlaceholderText } = render(
      <OutlineTextAreaInput
        placeholder="Write here"
        value=""
        onChangeText={mockOnChangeText}
      />
    );

    fireEvent.changeText(getByPlaceholderText("Write here"), "Some text");
    expect(mockOnChangeText).toHaveBeenCalledWith("Some text");
  });

  it("shows error when error and touched are true", () => {
    const { getByText } = render(
      <OutlineTextAreaInput
        placeholder="Notes"
        value=""
        onChangeText={() => {}}
        error="Field required"
        touched={true}
      />
    );

    expect(getByText("Field required")).toBeTruthy();
  });
});
