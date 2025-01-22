import { render, screen, fireEvent } from "@testing-library/react";
import { TaskStatus } from "@prisma/client";
import TaskItemComponent from "@/components/dashboard/task-item-component";

describe("TaskItemComponent", () => {
  const mockItem = {
    id: 1,
    title: "Test Task",
    description: "Test Description",
    status: TaskStatus.PENDING,
  };

  const mockOnChange = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    render(
      <TaskItemComponent
        item={mockItem}
        onChange={mockOnChange}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
  });

  test("renders task item details correctly", () => {
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockItem.description)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockItem.status)).toBeInTheDocument();
  });

  test("calls onChange when input changes", () => {
    fireEvent.change(screen.getByDisplayValue(mockItem.description), {
      target: { value: "New Description" },
    });
    expect(mockOnChange).toHaveBeenCalledWith(
      mockItem.id,
      "description",
      "New Description"
    );
  });

  test("calls onEdit when input loses focus", () => {
    fireEvent.blur(screen.getByDisplayValue(mockItem.description), {
      target: { value: "New Description Blur" },
    });
    expect(mockOnEdit).toHaveBeenCalledWith(
      mockItem.id,
      "description",
      "New Description Blur"
    );
  });

  test("calls onEdit when status changes", () => {
    fireEvent.change(screen.getByDisplayValue(mockItem.status), {
      target: { value: TaskStatus.COMPLETED },
    });
    expect(mockOnEdit).toHaveBeenCalledWith(
      mockItem.id,
      "status",
      TaskStatus.COMPLETED
    );
  });

  test("calls onDelete when delete button is clicked", () => {
    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnDelete).toHaveBeenCalledWith(mockItem.id);
  });
});
