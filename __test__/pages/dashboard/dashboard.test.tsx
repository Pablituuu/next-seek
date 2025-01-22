import { render, screen } from "@testing-library/react";
import { fakeData } from "../../mocks/mock";
import TaskList from "@/components/dashboard/task-list";

// Use the first item from fakeData for testing
const data = fakeData[0];

describe("TaskList Component", () => {
  beforeEach(() => {
    render(<TaskList list={fakeData} />);
  });

  test("should render the task list with correct data", () => {
    // Check if the title of the first task is rendered
    const titleElement = screen.getByText(data.title);
    expect(titleElement).toBeInTheDocument();

    // Check if the description of the first task is rendered
    const descriptionElement = screen.getByText(data.description);
    expect(descriptionElement).toBeInTheDocument();

    // Check if the status of the first task is rendered
    const statusElement = screen.getByText(data.status);
    expect(statusElement).toBeInTheDocument();
  });

  test("should render all tasks in the list", () => {
    fakeData.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      expect(screen.getByText(task.description)).toBeInTheDocument();
      expect(screen.getByText(task.status)).toBeInTheDocument();
    });
  });
});
