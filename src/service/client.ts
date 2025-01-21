const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Creates a new task through the API.
 * 
 * @param {string} token - The authorization token.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} status - The status of the task.
 * @returns {Promise<any>} The response data from the API.
 */
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

/**
 * Logs out the user by calling the API endpoint.
 */
export const logout = () => {
    fetch(`${API_URL}/logout`, {
        method: "GET",
    });
};

/**
 * Updates an existing task through the API.
 * 
 * @param {string} token - The authorization token.
 * @param {number} id - The ID of the task to update.
 * @param {string} title - The new title of the task.
 * @param {string} description - The new description of the task.
 * @param {string} status - The new status of the task.
 * @returns {Promise<any>} The response data from the API.
 */
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

/**
 * Deletes a task through the API.
 * 
 * @param {string} token - The authorization token.
 * @param {number} id - The ID of the task to delete.
 * @returns {Promise<any>} The response data from the API.
 */
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