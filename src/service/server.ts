import { headers } from "next/headers";

const API_URL = "http://localhost:3000/api";

export const getTasks = async () => {
    const response = await fetch(`${API_URL}/task`, {
        method: "GET",
        headers: await headers(),
    });
    const data = await response.json();
    return data;
};