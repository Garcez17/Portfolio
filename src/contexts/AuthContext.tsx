import { createContext, ReactNode, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from '../services/firebase';

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  isAuthenticated: boolean | 'idle';
  signIn: (data: SignInCredentials) => Promise<void>;
  signOutUser: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthContextProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | 'idle'>('idle');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);

        return;
      }

      setIsAuthenticated(false);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function signOutUser() {
    try {
      await signOut(auth);

      setIsAuthenticated(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOutUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}