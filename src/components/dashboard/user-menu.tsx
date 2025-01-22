// UserMenuContainer.tsx

"use client";
import useTokenStore from "@/app/store/use-token-store";
import { logout } from "@/service/client";
import { redirect } from "next/navigation";
import UserMenuComponent from "./user-menu-component";

/**
 * Container component for handling user menu logic.
 *
 * @component
 * @returns {JSX.Element} The component rendering UserMenuComponent with props.
 */
export default function UserMenuContainer() {
  const { setToken } = useTokenStore();

  /**
   * Handles the user logout process.
   * Clears the authentication token, calls the logout service,
   * and redirects the user to the sign-in page.
   *
   * @function handleLogout
   */
  const handleLogout = () => {
    setToken("");
    logout();
    redirect("/auth/signin");
  };

  return <UserMenuComponent onLogout={handleLogout} />;
}
