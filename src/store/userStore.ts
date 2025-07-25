// lib/userStore.ts
import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";

type UserStore = {
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  clear: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  session: null,
  user: null,
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  clear: () => set({ session: null, user: null }),
}));