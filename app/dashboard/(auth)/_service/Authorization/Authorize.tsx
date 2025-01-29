import React, { useContext, useEffect, useState } from 'react';
import { AuthorizationContext } from './AuthorizationProvider';
import AccessDenied from '@dashboard/(auth)/_components/AccessDenied';
import Loader from '@dashboard/_components/Loader';

function Authorize({ permission, children, accessDeniedElement }: Readonly<{ permission: string, children: any, accessDeniedElement?: any}>) {
  const context = useContext(AuthorizationContext);
  const permissions = context?.permissions;
  const loading = context?.loading;

  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!loading)
      if (permissions) {
        let result = permissions?.findIndex(function (p: string) {
          return p === permission;
        });
        setIsAuthorized(result >= 0);
      }
  }, [loading, permissions, permission]);

  if (isAuthorized === true) {
    return <>{children}</>;
  } else if (isAuthorized === false) {
    return accessDeniedElement || <AccessDenied />;
  } else {
    return (
      <Loader/>
    );
  }
}
export default Authorize;
