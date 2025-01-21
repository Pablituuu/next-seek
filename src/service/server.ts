import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTasks = async () => {
    const header = new Headers(await headers())
    const response = await fetch(`${API_URL}/task`, {
        method: "GET",
        headers: header,
    });
    const data = await response.json();
    return data;
};