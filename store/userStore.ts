import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";

type UserStore = {
  session: Session | null;
  isLogin: boolean;
  setSession: (session: Session | null) => void;
  clearSession: () => void;
  getUser: () => User | null;
};

export const useUserStore = create<UserStore>((set, get) => ({
  session: null,
  isLogin: false,
  setSession: (session: Session | null) => set({ session, isLogin: true }),
  clearSession: () => set({ session: null, isLogin: false }),
  getUser: () => {
    const { session } = get();
    if (!session) {
      return null;
    }
    return session.user;
  },
}));
