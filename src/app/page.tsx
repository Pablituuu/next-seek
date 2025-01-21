import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Home page component that manages redirection based on user authentication.
 *
 * @function
 * @returns {Promise<void>}
 *
 * @description This function checks if the user is authenticated by verifying the presence
 * of a token in the cookies. If authenticated, the user is redirected to the dashboard.
 * Otherwise, they are redirected to the sign-in page.
 */
export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/auth/signin");
  } else {
    redirect("/dashboard");
  }
}
