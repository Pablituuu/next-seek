import { ITask } from "@/interfaces";
import { create } from "zustand";

interface Store {
    list: ITask[];
    setList: (list: ITask[]) => void;
}

/**
 * A Zustand store for managing the tasks list.
 *
 * @function useTasksStore
 *
 * @description This store provides state management for a list of tasks.
 * It includes functionality to set the initial list of tasks and update it.
 *
 * @example
 * const { list, setList } = useTasksStore();
 * setList([{ id: 1, title: "Example Task", description: "", status: "PENDING" }]);
 */
const useTasksStore = create<Store>(
    (set) => ({
        list: [],
        setList: (list: ITask[]) => set({ list }),
    }),
);

export default useTasksStore;