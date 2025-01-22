import SignInFormContainer from "@/components/signin-form/signin-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Sign-in page component.
 *
 * @function Page
 * @returns {JSX.Element} A JSX element rendering the sign-in form.
 *
 * @description This page checks if the user is already authenticated by looking for a token
 * in the cookies. If a token is found, the user is redirected to the dashboard. If not, the sign-in form is displayed.
 */
export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) redirect("/dashboard");
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInFormContainer />
      </div>
    </div>
  );
}
