"use client";
import { useState } from "react";
import useStore from "@/app/store/use-token-store";
import { useRouter } from "next/navigation";
import SignUpFormComponent from "./signup-component";

/**
 * Container component for managing user sign-up logic.
 *
 * @component
 * @returns {JSX.Element} The component rendering SignUpFormComponent with props.
 */
export function SignUpFormContainer() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { setToken } = useStore();
  const router = useRouter();

  /**
   * Handles the sign-up form submission.
   * Sends user credentials to the server and stores the authentication token.
   *
   * @async
   * @function handleSubmit
   */
  const handleSubmit = async () => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.email, password: state.password }),
    });
    if (response.status === 404) {
      alert("User not found");
      return;
    }

    const authorization = response.headers.get("Authorization");
    if (!authorization) return;

    const token = authorization.split(" ").pop();
    if (!token) return;

    setToken(token);
    router.push("/dashboard");
  };

  return (
    <SignUpFormComponent
      email={state.email}
      setEmail={(email: string) => setState({ ...state, email })}
      password={state.password}
      setPassword={(password: string) => setState({ ...state, password })}
      handleSubmit={handleSubmit}
    />
  );
}
