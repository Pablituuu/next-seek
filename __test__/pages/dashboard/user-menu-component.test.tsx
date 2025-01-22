import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For extended matchers
import UserMenuComponent from "@/components/dashboard/user-menu-component";

describe("UserMenuComponent", () => {
  const mockOnLogout = jest.fn();

  beforeEach(() => {
    render(<UserMenuComponent onLogout={mockOnLogout} />);
  });

  test("renders logout button", () => {
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("calls onLogout when logout button is clicked", () => {
    fireEvent.click(screen.getByText("Logout"));
    expect(mockOnLogout).toHaveBeenCalled();
  });
});
