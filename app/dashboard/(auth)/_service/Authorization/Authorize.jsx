import React, { useContext, useEffect, useState } from 'react';
import { AuthorizationContext } from './AuthorizationProvider';
import AccessDenied from '@dashboard/(auth)/_components/AccessDenied';
import Loader from '@dashboard/_components/Loader';

function Authorize(props) {
  const { permissions, loading } = useContext(AuthorizationContext);

  var [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    if (loading == false)
      if (permissions) {
        let result = permissions?.findIndex(function (element) {
          return element === props.permission;
        });
        setIsAuthorized(result >= 0 ? true : false);
      }
  }, [loading, permissions, props.permission]);

  if (isAuthorized === true) {
    return <>{props.children}</>;
  } else if (isAuthorized === false) {
    return props.accessDeniedElement ? props.AccessDeniedElement : <AccessDenied />;
  } else {
    return (
      <>
        <Loader />
      </>
    );
  }
}
export default Authorize;
