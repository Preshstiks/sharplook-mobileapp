import React from "react";
import { render } from "@testing-library/react-native";
import { ChatConnectionLoader } from "./ChatConnectionLoader";
import { ActivityIndicator } from "react-native";

// Mock Ionicons without referencing outer scope variables
jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");
  return {
    Ionicons: ({ name }) => <Text>{`Icon: ${name}`}</Text>,
  };
});

describe("ChatConnectionLoader", () => {
  it("does not render when visible is false", () => {
    const { queryByText } = render(<ChatConnectionLoader visible={false} />);
    expect(queryByText("Establishing connection...")).toBeNull();
  });

  it("renders default message when visible is true", () => {
    const { getByText } = render(<ChatConnectionLoader visible={true} />);
    expect(getByText("Establishing connection...")).toBeTruthy();
  });

  it("renders custom message when provided", () => {
    const customMsg = "Connecting to server...";
    const { getByText } = render(
      <ChatConnectionLoader visible={true} message={customMsg} />
    );
    expect(getByText(customMsg)).toBeTruthy();
  });

  it("renders ActivityIndicator", () => {
    const { UNSAFE_getByType } = render(
      <ChatConnectionLoader visible={true} />
    );
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("renders 'Connecting to SharpChat...' text", () => {
    const { getByText } = render(<ChatConnectionLoader visible={true} />);
    expect(getByText("Connecting to SharpChat...")).toBeTruthy();
  });
});
