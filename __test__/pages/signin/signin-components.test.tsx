import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import the jest-dom matchers
import React from "react"; // Ensure React is imported
import SignInFormComponent from "@/components/signin-form/signin-component";

describe("SignInFormComponent", () => {
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    render(
      <SignInFormComponent
        email=""
        setEmail={mockSetEmail}
        password=""
        setPassword={mockSetPassword}
        handleSubmit={mockHandleSubmit}
      />
    );
  });

  test("renders email and password inputs", () => {
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  test("calls setEmail on email input change", () => {
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(mockSetEmail).toHaveBeenCalledWith("test@example.com");
  });

  test("calls setPassword on password input change", () => {
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(mockSetPassword).toHaveBeenCalledWith("password123");
  });

  test("calls handleSubmit on button click", () => {
    const submitButtons = screen.getAllByRole("button", { name: "Login" });
    const submitButton = submitButtons.find((btn) => btn.tagName === "BUTTON")!; // Ensure it's the button
    fireEvent.click(submitButton);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
