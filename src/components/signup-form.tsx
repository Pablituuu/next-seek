"use client";
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

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const response = await fetch("/api/signup", {
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
    localStorage.setItem("token", token);
    console.log(localStorage.getItem("token"));
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-3xl">Register</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={(e) => setState({ ...state, email: e.target.value })}
            id="email"
            type="email"
            placeholder="me@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setState({ ...state, password: e.target.value })}
            id="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Register
        </Button>
        <Link href={"/auth/signin"}>
          <Button variant="outline" className="w-full mt-4">
            Login
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
