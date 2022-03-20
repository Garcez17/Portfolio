import { ReactNode } from 'react';

import { AuthProvider } from './AuthContext';

type AppProvider = {
  children: ReactNode;
}

export function AppProvider({ children }: AppProvider) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}