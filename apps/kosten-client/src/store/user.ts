import { User } from "@/types/user";
import { create } from "zustand";

interface UserState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()((set) => ({
  user: null,
  login: (user: User) => set(() => ({ user: user })),
  logout: () => set(() => ({ user: null })),
}));

export { useUserStore };
