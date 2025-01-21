import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(_: Request) {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    if (!token) return new Response('Unauthorized', { status: 401 })
    const isValid = verifyToken(token)

    if (!isValid || typeof isValid !== 'object') return new Response('Unauthorized', { status: 401 })

    const dataList = await prisma.tasks.findMany({
        where: {
            authorId: isValid.userId,
        },
    });

    return new Response(JSON.stringify(dataList), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1]
    if (!token) return new Response('Unauthorized', { status: 401 })
    const isValid = verifyToken(token)

    if (!isValid || typeof isValid !== 'object') return new Response('Unauthorized', { status: 401 })

    const { title, description, status } = await request.json();

    const task = await prisma.tasks.create({
        data: {
            title,
            description,
            status,
            authorId: isValid.userId,
        },
    });

    return new Response(JSON.stringify(task), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function DELETE(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1]
    if (!token) return new Response('Unauthorized', { status: 401 })
    const isValid = verifyToken(token)

    if (!isValid || typeof isValid !== 'object') return new Response('Unauthorized', { status: 401 })

    const { id } = await request.json();

    const task = await prisma.tasks.delete({
        where: {
            id,
            authorId: isValid.userId,
        },
    });

    return new Response(JSON.stringify(task), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PUT(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1]
    if (!token) return new Response('Unauthorized', { status: 401 })
    const isValid = verifyToken(token)

    if (!isValid || typeof isValid !== 'object') return new Response('Unauthorized', { status: 401 })

    const { id, title, description, status } = await request.json();
    const task = await prisma.tasks.update({
        where: {
            id,
            authorId: isValid.userId,
        },
        data: {
            title,
            description,
            status,
        },
    });

    return new Response(JSON.stringify(task), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}