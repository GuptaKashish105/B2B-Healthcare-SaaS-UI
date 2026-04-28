import { create } from "zustand";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password) => {
    // Demo login for the prototype
    if (email && password) {
      set({ user: { email }, isAuthenticated: true });
    } else {
      throw new Error("Invalid credentials");
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
