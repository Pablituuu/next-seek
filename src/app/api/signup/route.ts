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
    console.log({ user })

    if (!user) {
        return new Response("User not created", { status: 404 });
    }

    return new Response(null, {
        status: 200,
        headers: {
            // "Set-Cookie": `next-auth.session-token=${user.id}; Path=/; HttpOnly; SameSite=Lax`,
        },
    });
}