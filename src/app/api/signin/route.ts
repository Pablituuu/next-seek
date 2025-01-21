import { generateToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

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
        },
    });
}