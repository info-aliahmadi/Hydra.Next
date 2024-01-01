import React, { createContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import AuthorizationService from './AuthorizationService';

export const AuthorizationContext = createContext(null);

export default function AuthorizationProvider({ children }) {

  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;
  const service = new AuthorizationService(jwt);
  var [permissions, sePermissions] = useState(null);
  var [loading, seLoading] = useState(true);

  useEffect(() => {
    if (jwt) {
      service.getUserPermissions().then(async (result) => {
        sePermissions(result);
        seLoading(false);
      })
        .catch((error) => {
          console.error(error);
          sePermissions([]);
          seLoading(false);
        });
    }

  }, [jwt]);

  return <AuthorizationContext.Provider value={{ permissions, loading }}>{children}</AuthorizationContext.Provider>
}
