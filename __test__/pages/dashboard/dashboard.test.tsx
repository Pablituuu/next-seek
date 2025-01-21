import { render, screen } from "@testing-library/react";
import { fakeData } from "../../mocks/mock";
import TaskList from "@/components/dashboard/task-list";

const data = fakeData[0];

describe("Task List", () => {
  beforeEach(() => {
    render(<TaskList list={[data]} />);
  });
  test("should render the task list", () => {
    const description = expect(
      screen.getByText(data.description)
    ).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
