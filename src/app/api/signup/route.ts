import { generateToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";

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

    return new Response(JSON.stringify({ user }), {
        status: 200,
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
}