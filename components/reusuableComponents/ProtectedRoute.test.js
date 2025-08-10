import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import ProtectedRoute from "./ProtectedRoute";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from "../../context/AuthContext";

describe("ProtectedRoute", () => {
  function FallbackComponent() {
    return <View testID="fallback" />;
  }

  function ChildComponent() {
    return <View testID="child" />;
  }

  const fallback = <FallbackComponent />;
  const children = <ChildComponent />;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows loader while isLoading and showLoader is true", () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      canAccess: () => false,
    });

    const { getByTestId } = render(<ProtectedRoute>{children}</ProtectedRoute>);

    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("does not show loader when isLoading is true but showLoader is false", () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      canAccess: () => false,
    });

    const { queryByTestId } = render(
      <ProtectedRoute showLoader={false} fallback={fallback}>
        {children}
      </ProtectedRoute>
    );

    expect(queryByTestId("loading-indicator")).toBeNull();
  });

  it("renders fallback when not authenticated", () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      canAccess: () => false,
    });

    const { queryByTestId } = render(
      <ProtectedRoute fallback={fallback}>{children}</ProtectedRoute>
    );

    expect(queryByTestId("fallback")).toBeTruthy();
  });

  it("renders fallback when user type not allowed", () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      canAccess: () => false,
    });

    const { queryByTestId } = render(
      <ProtectedRoute allowedUserTypes={["admin"]} fallback={fallback}>
        {children}
      </ProtectedRoute>
    );

    expect(queryByTestId("fallback")).toBeTruthy();
  });

  it("renders children when authenticated and allowed", () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      canAccess: () => true,
    });

    const { queryByTestId } = render(
      <ProtectedRoute allowedUserTypes={["admin"]} fallback={fallback}>
        {children}
      </ProtectedRoute>
    );

    expect(queryByTestId("child")).toBeTruthy();
  });
});
