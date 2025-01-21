import { TaskStatus } from "@prisma/client";

const API_URL = "http://localhost:3000/api";

export const createTask = async (token: string, title: string, description: string, status: string) => {
    const response = await fetch(`${API_URL}/task`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title,
            description,
            status,
        }),
    });
    const data = await response.json();
    return data;
};

export const logout = () => {
    fetch(`${API_URL}/logout`, {
        method: "GET",
    });
};

export const updateTask = async (token: string, id: number, title: string, description: string, status: string) => {
    const response = await fetch("api/task", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            id,
            title,
            description,
            status,
        }),
    });
    const data = await response.json();
    return data;
};

export const deleteTask = async (token: string, id: number) => {
    const response = await fetch("api/task", {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
    });
    const data = await response.json();
    return data;
};