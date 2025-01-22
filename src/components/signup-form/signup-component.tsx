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

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
}

/**
 * Presentational component for rendering a sign-up form.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.email - The email input value.
 * @param {Function} props.setEmail - Function to set the email value.
 * @param {string} props.password - The password input value.
 * @param {Function} props.setPassword - Function to set the password value.
 * @param {Function} props.handleSubmit - Function to handle form submission.
 */
function SignUpFormComponent({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}: SignUpFormProps) {
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="me@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
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

export default SignUpFormComponent;
