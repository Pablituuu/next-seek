"use client";
import useTokenStore from "@/app/store/use-token-store";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { logout } from "@/service/client";

export default function UserMenu() {
  const { setToken } = useTokenStore();
  const router = useRouter();

  const handleLogout = () => {
    setToken("");
    logout();
    router.push("/auth/signin");
  };

  return (
    <Button onClick={handleLogout} variant="outline" className="mt-4 w-min">
      Logout
    </Button>
  );
}
