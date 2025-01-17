import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import AuthorizationService from './AuthorizationService';

interface AuthorizationContextType {
  permissions: string[] | null;
  loading: boolean;
}

export const AuthorizationContext = createContext<AuthorizationContextType | null>(null);

interface AuthorizationProviderProps {
  children: ReactNode;
}

export default function AuthorizationProvider({ children }: AuthorizationProviderProps) {
  const { data: session } = useSession();
  const jwt = (session as Session)?.user?.accessToken;
  const service = new AuthorizationService(jwt);
  const [permissions, setPermissions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jwt) {
      service.getUserPermissions().then((permissions: any) => {
        debugger
        setPermissions(permissions);
        setLoading(false);
      })
        .catch((error: any) => {
          console.error(error);
          setPermissions([]);
          setLoading(false);
        });
    }
  }, [jwt]);

  return (
    <AuthorizationContext.Provider value={{ permissions, loading }}>
      {children}
    </AuthorizationContext.Provider>
  );
}