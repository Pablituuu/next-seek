import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Store {
    token: string;
    setToken: (token: string) => void;
}

/**
 * A Zustand store for managing the authentication token.
 *
 * @function useTokenStore
 *
 * @description This store provides state management for the user's authentication token.
 * It includes functionality to set and persist the token across sessions.
 *
 * @example
 * const { token, setToken } = useTokenStore();
 * setToken("new-token-value");
 */
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