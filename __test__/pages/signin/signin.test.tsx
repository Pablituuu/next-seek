import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignInForm } from "@/components/signin-form/signin-form";
import useStore from "@/app/store/use-token-store";

// Mock useStore hook
jest.mock("@/app/store/use-token-store", () => ({
  __esModule: true,
  default: () => ({
    setToken: jest.fn(),
  }),
}));

const setToken = useStore().setToken;

// Mock next/navigation
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("SignInForm Component", () => {
  // Mock fetch response
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        headers: {
          get: (name: any) =>
            name === "Authorization"
              ? "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NDQ1ODk4ZS00Mjc5LTRmY2UtOGMzZi0yYmMyMzM3ZTI3YTkiLCJpYXQiOjE3Mzc1MDMyMjF9.poD9MYjPyNWZLj6l3GJ_OpX4H_OrdvXiWV_DjKffMFE"
              : null,
        },
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form and allows user login with correct credentials", async () => {
    const { setToken } = useStore();

    render(<SignInForm />);

    // Act
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "pablito.silvainca@gmail.pe" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456789" },
    });

    // Usa getByRole para seleccionar el botón de login
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Assert
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/signin",
        expect.any(Object)
      );
      expect(setToken).toHaveBeenCalledWith(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NDQ1ODk4ZS00Mjc5LTRmY2UtOGMzZi0yYmMyMzM3ZTI3YTkiLCJpYXQiOjE3Mzc1MDMyMjF9.poD9MYjPyNWZLj6l3GJ_OpX4H_OrdvXiWV_DjKffMFE"
      );
      // Asegúrate también de verificar si `redirect` se llama
      expect(require("next/navigation").redirect).toHaveBeenCalledWith(
        "/dashboard"
      );
    });
  });

  test("shows alert on user not found", async () => {
    global.fetch = jest.fn(() => Promise.resolve({ status: 404 })) as jest.Mock;

    jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<SignInForm />);

    // Act
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "pablito.silvainca@gmail.pe" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Assert
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("User not found");
    });
  });
});
