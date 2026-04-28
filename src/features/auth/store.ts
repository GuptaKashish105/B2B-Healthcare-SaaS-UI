import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  login: async (email, password) => {
    try {
      set({ loading: true });
      let userCredential;

      try {
        // Try to sign in existing user
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
      } catch (signInError: any) {
        // If user not found, create new account with reCAPTCHA
        if (
          signInError.code === "auth/user-not-found" ||
          signInError.code === "auth/invalid-login-credentials"
        ) {
          try {
            // Create reCAPTCHA verifier
            const verifier = new RecaptchaVerifier(
              auth,
              "recaptcha-container",
              {
                size: "invisible",
              },
            );

            userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password,
            );

            // Clean up verifier
            verifier.clear();
          } catch (createError: any) {
            console.error("Account creation error:", createError);
            throw createError;
          }
        } else {
          throw signInError;
        }
      }

      set({
        user: userCredential.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error: any) {
      set({ loading: false });
      throw new Error(error.message || "Login failed");
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  initializeAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({
        user,
        isAuthenticated: !!user,
        loading: false,
      });
    });
  },
}));
