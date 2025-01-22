import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignUpForm } from "@/components/signup-form/signup-form";
import useStore from "@/app/store/use-token-store";

// Mock useStore hook
jest.mock("@/app/store/use-token-store", () => ({
  __esModule: true,
  default: () => ({
    setToken: jest.fn(),
  }),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
}));

const setToken = useStore().setToken;
const router = useRouter();

describe("SignUpForm Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        headers: {
          get: jest
            .fn()
            .mockImplementation((name) =>
              name === "Authorization" ? "Bearer fake-token" : null
            ),
        },
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("allows user to register with valid credentials", async () => {
    render(<SignUpForm />);

    const randomEmail = `test${Math.floor(Math.random() * 1000)}@example.com`;
    const password = "testpassword";

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: randomEmail },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: password },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/signup",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: randomEmail, password }),
        })
      );
      expect(setToken).toHaveBeenCalledWith("fake-token");
      expect(router.push).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("shows alert on user not found", async () => {
    global.fetch = jest.fn(() => Promise.resolve({ status: 404 })) as jest.Mock;

    jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<SignUpForm />);

    const randomEmail = `test${Math.floor(Math.random() * 1000)}@example.com`;
    const password = "testpassword";

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: randomEmail },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: password },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("User not found");
    });
  });
});
