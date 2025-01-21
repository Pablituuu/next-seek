"use client";
import useTokenStore from "@/app/store/use-token-store";
import { Button } from "../ui/button";
import { logout } from "@/service/client";
import { redirect } from "next/navigation";

/**
 * A component that renders a logout button for the user menu.
 *
 * @component
 *
 * @description When the logout button is clicked, the user's token is cleared,
 * the user is logged out from the client service, and they are redirected to the sign-in page.
 *
 * @example
 * return (
 *   <UserMenu />
 * )
 */
export default function UserMenu() {
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

  return (
    <Button onClick={handleLogout} variant="outline" className="mt-4 w-min">
      Logout
    </Button>
  );
}
