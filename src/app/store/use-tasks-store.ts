import { ITask } from "@/interfaces";
import { create } from "zustand";

interface Store {
    list: ITask[];
    setList: (list: ITask[]) => void;
}

const useTasksStore = create<Store>(
    (set) => ({
        list: [],
        setList: (list: ITask[]) => set({ list }),
    }),
)

export default useTasksStore;