import { createContext, ReactNode, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from '../services/firebase';

type User = {
  id: string;
  email: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  user: User | undefined;
  isAuthenticated: boolean | 'idle';
  signIn: (data: SignInCredentials) => Promise<void>;
  signOutUser: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthContextProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | 'idle'>('idle');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { email, uid } = user;
        setIsAuthenticated(true);

        setUser({
          id: uid,
          email: email!,
        });
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = user;

      setUser({
        id: uid,
        email,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function signOutUser() {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(undefined);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOutUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}