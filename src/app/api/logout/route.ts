import { cookies } from "next/headers";

/**
 * Logs out the authenticated user by clearing the authentication token.
 *
 * @async
 * @function GET
 * @returns {Promise<Response>} The response confirming the user is logged out.
 *
 * @description This function deletes the authentication token from the cookies.
 */
export async function GET() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return new Response(null, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}