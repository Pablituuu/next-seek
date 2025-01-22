import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import the jest-dom matchers
import SignUpFormComponent from "@/components/signup-form/signup-component";

describe("SignUpFormComponent", () => {
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    render(
      <SignUpFormComponent
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

  test("calls handleSubmit on register button click", () => {
    const registerButtons = screen.getAllByRole("button", { name: "Register" });
    const registerButton = registerButtons.find(
      (btn) => btn.tagName === "BUTTON"
    ); // Ensure it's a button element
    if (registerButton) {
      fireEvent.click(registerButton);
      expect(mockHandleSubmit).toHaveBeenCalled();
    }
  });
});
