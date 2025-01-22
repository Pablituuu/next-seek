import { render, act } from "@testing-library/react";
import * as clientService from "../../../src/service/client";
import * as useTokenStore from "@/app/store/use-token-store";
import * as useTasksStore from "@/app/store/use-tasks-store";
import CreateTaskContainer from "@/components/dashboard/create-task";

jest.mock("@/service/client");
jest.mock("@/app/store/use-token-store");
jest.mock("@/app/store/use-tasks-store");

describe("CreateTaskContainer", () => {
  it("creates a task successfully", async () => {
    const mockSetList = jest.fn();
    const mockCreateTask = jest.fn().mockResolvedValue({
      id: "1",
      title: "Test Task",
      description: "Task Description",
      status: "PENDING",
    });
    jest.spyOn(clientService, "createTask").mockImplementation(mockCreateTask);
    jest
      .spyOn(useTokenStore, "default")
      .mockReturnValue({ token: "valid-token" });
    jest
      .spyOn(useTasksStore, "default")
      .mockReturnValue({ setList: mockSetList, list: [] });

    let component;
    await act(async () => {
      component = render(<CreateTaskContainer />);
    });

    // Perform further actions such as filling in details and clicking the button
    // Additional assertions for expected outcomes
  });
});
