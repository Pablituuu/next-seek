import { cookies } from "next/headers";

export async function GET(_: Request) {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return new Response(null, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}