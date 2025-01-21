import { generateToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

/**
 * Authenticates a user and generates an authentication token.
 *
 * @async
 * @function POST
 * @param {Request} request - The request object containing user login credentials (email and password).
 * @returns {Promise<Response>} The response with user details and an authentication token, or an error message.
 *
 * @description This function checks the user's credentials against the database.
 * If the credentials are valid, it generates a token, sets it in a cookie, and returns the user details.
 * If the credentials are invalid, it returns a 404 status indicating the user is not found.
 */
export async function POST(request: Request) {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
        where: {
            email,
            password
        },
    });

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    const token = generateToken(user.id);

    const cookieStore = await cookies();
    cookieStore.set("token", token);

    return new Response(JSON.stringify({ user }), {
        status: 200,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
}