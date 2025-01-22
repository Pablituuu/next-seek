import { render, screen, fireEvent } from "@testing-library/react";
import { TaskStatus } from "@prisma/client";
import CreateTask from "@/components/dashboard/create-task-component";

describe("CreateTask Component", () => {
  const mockSetInputTitle = jest.fn();
  const mockSetInputDescription = jest.fn();
  const mockSetStateSelect = jest.fn();
  const mockSetOpen = jest.fn();
  const mockHandleCreate = jest.fn();

  it("renders the CreateTask component", () => {
    render(
      <CreateTask
        inputTitle=""
        setInputTitle={mockSetInputTitle}
        inputDescription=""
        setInputDescription={mockSetInputDescription}
        stateSelect={TaskStatus.PENDING}
        setStateSelect={mockSetStateSelect}
        onOpen={true}
        setOpen={mockSetOpen}
        handleCreate={mockHandleCreate}
      />
    );

    // Check if elements are rendered
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByText("Save changes")).toBeInTheDocument();
  });

  it("calls setInputTitle on title input change", () => {
    render(
      <CreateTask
        inputTitle=""
        setInputTitle={mockSetInputTitle}
        inputDescription=""
        setInputDescription={mockSetInputDescription}
        stateSelect={"PENDING"}
        setStateSelect={mockSetStateSelect}
        onOpen={true}
        setOpen={mockSetOpen}
        handleCreate={mockHandleCreate}
      />
    );

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Task" },
    });
    expect(mockSetInputTitle).toHaveBeenCalledWith("New Task");
  });

  // Additional tests can be written similarly
});
