import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Store {
    token: string | null;
    setToken: (token: string) => void;
}

const useStore = create<Store>()(
    devtools(
        persist(
            (set) => ({
                token: null,
                setToken: (token: string) => set({ token }),
            }),
            {
                name: "next-seek-store",
            },
        )
    )
);

export default useStore;