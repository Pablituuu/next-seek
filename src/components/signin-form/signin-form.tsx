"use client";
import { useState } from "react";
import useStore from "@/app/store/use-token-store";
import { redirect } from "next/navigation";
import SignInFormComponent from "./signin-component";

/**
 * Container component for managing user sign-in logic.
 *
 * @component
 * @returns {React.ReactNode} The container rendering the SignInFormComponent with props.
 */
export default function SignInFormContainer(): React.ReactNode {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { setToken } = useStore();

  /**
   * Handles the sign-in form submission.
   * Stores the authentication token and redirects upon successful login.
   *
   * @async
   * @function handleSubmit
   */
  const handleSubmit = async () => {
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.email, password: state.password }),
    });
    if (response.status === 404) {
      alert("User not found");
    }
    const authorization = response.headers.get("Authorization");

    if (!authorization) return;

    const token = authorization.split(" ").pop();

    if (!token) return;

    setToken(token);
    redirect("/dashboard");
  };

  return (
    <SignInFormComponent
      email={state.email}
      setEmail={(email: string) => setState({ ...state, email })}
      password={state.password}
      setPassword={(password: string) => setState({ ...state, password })}
      handleSubmit={handleSubmit}
    />
  );
}
