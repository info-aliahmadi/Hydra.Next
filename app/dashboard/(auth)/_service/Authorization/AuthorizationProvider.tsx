import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import AuthorizationService from './AuthorizationService';



export const AuthorizationContext = createContext<AuthorizationContextType | null>(null);

export default function AuthorizationProvider({ children }: { readonly children: ReactNode }) {
  const { data: session } = useSession();
  const jwt = (session as Session)?.accessToken;
  const service = new AuthorizationService(jwt);
  const [permissions, setPermissions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jwt) {
      service.getUserPermissions().then((permissions: any) => {
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

  const value = React.useMemo(() => ({ permissions, loading }), [permissions, loading]);

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
}