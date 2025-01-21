import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import useStore from "@/app/store/use-store";

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { setToken } = useStore();

  const handleSubmit = async () => {
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.email, password: state.password }),
    });
    if (response.status === 404) {
      alert("User not found");
    }
    // get token from header
    const authorization = response.headers.get("Authorization");

    if (!authorization) return;

    // split token into parts and get the token part
    const token = authorization.split(" ").pop();

    if (!token) return;

    // set the token in local storage
    setToken(token);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                }}
                value={state.email}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Login
            </Button>
          </div>
          <Link href={"/auth/signup"}>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <div className="underline underline-offset-4">Sign up</div>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
