import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTasks = async () => {
    const response = await fetch(`${API_URL}/task`, {
        method: "GET",
        headers: await headers(),
    });
    const data = await response.json();
    return data;
};