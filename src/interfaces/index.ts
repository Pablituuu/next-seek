export type ITask = {
    id: number;
    title: string;
    description: string;
    status: string;
};

export type IField = "title" | "description" | "status";

export type ITaskStatus = "PENDING" | "COMPLETED" | "CANCELLED";