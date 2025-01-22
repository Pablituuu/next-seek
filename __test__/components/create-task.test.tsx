import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateTask from "@/components/dashboard/create-task";
import { createTask } from "@/service/client";
import useTokenStore from "@/app/store/use-token-store";
import useTasksStore from "@/app/store/use-tasks-store";

// Mock the createTask function
jest.mock("@/service/client", () => ({
  createTask: jest.fn(),
}));

// Mock the useTokenStore hook
jest.mock("@/app/store/use-token-store", () => ({
  __esModule: true,
  default: () => ({ token: "test-token" }),
}));

// Mock the useTasksStore hook
jest.mock("@/app/store/use-tasks-store", () => ({
  __esModule: true,
  default: () => ({
    setList: jest.fn(),
    list: [],
  }),
}));

describe("CreateTask Component", () => {
  test("renders the dialog and allows task creation", async () => {
    // Arrange
    (createTask as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Test Task",
      description: "Test Description",
      status: "PENDING",
    });

    render(<CreateTask />);

    // Act
    fireEvent.click(screen.getByText("Add New Task"));
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText("Descripton"), {
      target: { value: "Test Description" },
    });
    fireEvent.click(screen.getByText("Save changes"));

    // Assert
    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith(
        "test-token",
        "Test Task",
        "Test Description",
        "PENDING"
      );
    });

    expect(screen.queryByLabelText("Title")).toHaveValue("");
    expect(screen.queryByLabelText("Descripton")).toHaveValue("");
  });

  test("disables save button when fields are empty", async () => {
    render(<CreateTask />);

    fireEvent.click(screen.getByText("Add New Task"));

    const saveButton = screen.getByText("Save changes");
    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText("Descripton"), {
      target: { value: "Test Description" },
    });

    expect(saveButton).not.toBeDisabled();
  });
});
