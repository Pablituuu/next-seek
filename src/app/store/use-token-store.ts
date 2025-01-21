import { ITask } from "@/interfaces";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Store {
    token: string | null;
    setToken: (token: string | null) => void;
}

const useTokenStore = create<Store>()(
    devtools(
        persist(
            (set) => ({
                token: null,
                setToken: (token: string | null) => set({ token }),
            }),
            {
                name: "next-seek-store",
            },
        )
    ),

);

export default useTokenStore;