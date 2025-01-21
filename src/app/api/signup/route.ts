import { generateToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

/**
 * Registers a new user and generates an authentication token.
 *
 * @async
 * @function POST
 * @param {Request} request - The request object containing user registration details.
 * @returns {Promise<Response>} The response with user details and authentication token or an error message.
 *
 * @description This function creates a new user in the database if the email doesn't exist,
 * generates a token, and sets it in a cookie.
 */
export async function POST(request: Request) {
    const { email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        return new Response("User already exists", { status: 404 });
    }

    const user = await prisma.user.create({
        data: {
            email,
            password,
            name: "",
        },
    });

    if (!user) {
        return new Response("User not created", { status: 404 });
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