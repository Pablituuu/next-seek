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
import Link from "next/link";

interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
}

/**
 * Presentational component for rendering a sign-in form.
 *
 * @function SignInFormComponent
 * @param {Object} props - The component props.
 * @param {string} props.email - The email input value.
 * @param {Function} props.setEmail - Function to set the email value.
 * @param {string} props.password - The password input value.
 * @param {Function} props.setPassword - Function to set the password value.
 * @param {Function} props.handleSubmit - Function to handle form submission.
 */
export default function SignInFormComponent({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}: SignInFormProps) {
  return (
    <div className={cn("flex flex-col gap-6")}>
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
                  setEmail(e.target.value);
                }}
                value={email}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>{" "}
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
