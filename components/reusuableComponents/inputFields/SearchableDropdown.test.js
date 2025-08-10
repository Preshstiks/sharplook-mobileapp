import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SearchableDropdown from "./SearchableDropdown";

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    Ionicons: ({ name }) => <Text>{name}</Text>,
  };
});

describe("SearchableDropdown", () => {
  const options = [
    { label: "First Bank", value: "first" },
    { label: "GTBank", value: "gtb" },
    { label: "Access Bank", value: "access" },
  ];

  it("renders label and placeholder", () => {
    const { getByText } = render(
      <SearchableDropdown
        label="Bank"
        placeholder="Select a bank"
        value=""
        onValueChange={() => {}}
        touched={false}
        error=""
        options={options}
      />
    );
    expect(getByText("Bank")).toBeTruthy();
    expect(getByText("Select a bank")).toBeTruthy();
  });

  it("opens modal when pressed", () => {
    const { getByText, queryByText } = render(
      <SearchableDropdown
        label="Bank"
        value=""
        placeholder="Select a bank"
        onValueChange={() => {}}
        touched={false}
        error=""
        options={options}
      />
    );

    // Modal content should not be visible initially
    expect(queryByText("First Bank")).toBeNull();

    // Press to open modal
    fireEvent.press(getByText("Select a bank"));

    // Now modal list should be visible
    expect(getByText("First Bank")).toBeTruthy();
  });

  it("filters options when searching", () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <SearchableDropdown
        label="Bank"
        value=""
        placeholder="Select a bank"
        onValueChange={() => {}}
        touched={false}
        error=""
        options={options}
      />
    );

    fireEvent.press(getByText("Select a bank"));

    const searchInput = getByPlaceholderText("Search banks...");
    fireEvent.changeText(searchInput, "GTB");

    expect(getByText("GTBank")).toBeTruthy();
    expect(queryByText("First Bank")).toBeNull();
  });

  it("shows 'no results' when no match found", () => {
    const { getByText, getByPlaceholderText } = render(
      <SearchableDropdown
        label="Bank"
        value=""
        placeholder="Select a bank"
        onValueChange={() => {}}
        touched={false}
        error=""
        options={options}
      />
    );

    fireEvent.press(getByText("Select a bank"));

    const searchInput = getByPlaceholderText("Search banks...");
    fireEvent.changeText(searchInput, "XYZ");

    expect(getByText("No banks found")).toBeTruthy();
  });

  it("calls onValueChange when option is selected", async () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <SearchableDropdown
        label="Bank"
        value=""
        placeholder="Select a bank"
        onValueChange={onValueChange}
        touched={false}
        error=""
        options={options}
      />
    );

    fireEvent.press(getByText("Select a bank"));
    fireEvent.press(getByText("GTBank"));

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith("gtb");
    });
  });
});
