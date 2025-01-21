import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Store {
    token: string;
    setToken: (token: string) => void;
}

const useTokenStore = create<Store>()(
    devtools(
        persist(
            (set) => ({
                token: "",
                setToken: (token: string) => set({ token }),
            }),
            {
                name: "next-seek-store",
            },
        )
    ),

);

export default useTokenStore;