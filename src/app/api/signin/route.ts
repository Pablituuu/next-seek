import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    return new Response(null, {
        status: 200,
        headers: {
            // "Set-Cookie": `next-auth.session-token=${user.id}; Path=/; HttpOnly; SameSite=Lax`,
        },
    });
}