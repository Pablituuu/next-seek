import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

/**
 * Fetches the authenticated user's tasks.
 *
 * @async
 * @function GET
 * @returns {Promise<Response>} The response with the list of tasks or an error message.
 *
 * @description This function checks the authentication token, verifies it,
 * and retrieves tasks for the authenticated user. Returns a 401 status code if unauthorized.
 */
export async function GET() {
    try {
        const cookieStore = await cookies();

        const token = cookieStore.get("token")?.value;
        if (!token) return new Response('Unauthorized', { status: 401 });
        const isValid = verifyToken(token);

        if (!isValid || typeof isValid !== 'object') return new Response('Unauthorized', { status: 401 });

        const dataList = await prisma.tasks.findMany({
            where: {
                authorId: isValid.userId,
            },
        });

        return new Response(JSON.stringify(dataList), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

/**
 * Creates a new task for the authenticated user.
 *
 * @async
 * @function POST
 * @param {Request} request - The request object containing task details in its body.
 * @returns {Promise<Response>} The response with the newly created task or an error message.
 */
export async function POST(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) return new Response('Unauthorized', { status: 401 });
    const isValid = verifyToken(token);

    if (!isValid || typeof isValid !== 'object') return new Response('Unauthorized', { status: 401 });

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

/**
 * Deletes a task for the authenticated user.
 *
 * @async
 * @function DELETE
 * @param {Request} request - The request object containing the ID of the task to be deleted.
 * @returns {Promise<Response>} The response with the deleted task or an error message.
 */
export async function DELETE(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) return new Response('Unauthorized', { status: 401 });
    const isValid = verifyToken(token);

    if (!isValid || typeof isValid !== 'object') return new Response('Unauthorized', { status: 401 });

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

/**
 * Updates an existing task for the authenticated user.
 *
 * @async
 * @function PUT
 * @param {Request} request - The request object containing task details to be updated.
 * @returns {Promise<Response>} The response with the updated task or an error message.
 */
export async function PUT(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) return new Response('Unauthorized', { status: 401 });
    const isValid = verifyToken(token);

    if (!isValid || typeof isValid !== 'object') return new Response('Unauthorized', { status: 401 });

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