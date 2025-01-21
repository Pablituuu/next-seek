/**
 * Represents a task with an ID, title, description, and status.
 * 
 * @typedef {Object} ITask
 * @property {number} id - The unique identifier of the task.
 * @property {string} title - The title of the task.
 * @property {string} description - The description of the task.
 * @property {string} status - The current status of the task.
 */
export type ITask = {
    id: number;
    title: string;
    description: string;
    status: string;
};

/**
 * Represents the fields of a task that can be edited.
 * 
 * @typedef {"title"|"description"|"status"} IField
 */
export type IField = "title" | "description" | "status";

/**
 * Represents the possible statuses a task can have.
 * 
 * @typedef {"PENDING"|"COMPLETED"|"CANCELLED"} ITaskStatus
 */
export type ITaskStatus = "PENDING" | "COMPLETED" | "CANCELLED";