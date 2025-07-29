import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";

type UserStore = {
  session: Session | null;
  user: User | null;
  isLogin: boolean;
  setUserInfo: (user: User | null, session: Session | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  session: null,
  user: null,
  isLogin: false,
  setUserInfo: (user: User | null, session: Session | null) => set({ user, session, isLogin: true }),
  clearUser: () => set({ session: null, user: null, isLogin: false }),
}));