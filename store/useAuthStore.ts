// store/useAuthStore.ts
import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';

type LoginMethod = 'email' | 'ethereum' | 'solana' | null;

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  loginMethod: LoginMethod;
  setAuth: (session: Session | null, method?: LoginMethod) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoggedIn: false,
  loginMethod: null,

  setAuth: (session, method = null) => {
    set({
      session,
      user: session?.user ?? null,
      isLoggedIn: !!session?.user,
      loginMethod: method,
    });
  },

  logout: () => {
    set({
      user: null,
      session: null,
      isLoggedIn: false,
      loginMethod: null,
    });
  },
}));

export default useAuthStore;