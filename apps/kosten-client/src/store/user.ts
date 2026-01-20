import { User } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Custom sessionStorage adapter with proper typing
// const sessionStorageAdapter: PersistStorage<UserState> = {
//   getItem: (name) => {
//     const value = sessionStorage.getItem(name);
//     return value ? JSON.parse(value) : null;
//   },
//   setItem: (name, value) => {
//     sessionStorage.setItem(name, JSON.stringify(value));
//   },
//   removeItem: (name) => {
//     sessionStorage.removeItem(name);
//   },
// };

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      login: (user: User) => set({ user: user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      // storage: sessionStorageAdapter,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export { useUserStore };
