import { render, waitFor } from "@testing-library/react";
import * as serverService from "@/service/server";
import { cookies } from "next/headers";
import { act } from "react-dom/test-utils";
import Page from "@/app/dashboard/page";

jest.mock("@/service/server");
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("Dashboard Page", () => {
  it("redirects if no token is present", async () => {
    const cookieMock = jest.fn().mockReturnValue(new Map());
    (cookies as jest.Mock).mockReturnValue(cookieMock);

    let component;
    await act(async () => {
      component = render(<Page />);
    });

    // Assert redirect logic or the absence of elements caused by redirect
  });

  it("fetches tasks successfully", async () => {
    const mockTasks = [{ id: 1, title: "Test Task", description: "Task Desc" }];
    jest.spyOn(serverService, "getTasks").mockResolvedValue(mockTasks);
    (cookies as jest.Mock).mockReturnValue(new Map([["token", "valid.token"]]));

    let component;
    await act(async () => {
      component = render(<Page />);
    });

    await waitFor(() => {
      // Assert the tasks are displayed
      // Example: expect(screen.getByText("Test Task")).toBeInTheDocument();
    });
  });
});
