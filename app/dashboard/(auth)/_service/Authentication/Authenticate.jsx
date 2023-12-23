'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthenticationService from './AuthenticationService';
import Loader from '@dashboard/_components/Loader';

export default function Authenticate(props) {
  var [isAuthenticatedResult, setIsAuthenticatedResult] = useState();
  const authenticationService = new AuthenticationService();
  const router = useRouter();
  useEffect(() => {
    const authenticationCheck = async () => {
      let authenticate = await authenticationService.isAuthenticated();
      setIsAuthenticatedResult(authenticate);
    };
    authenticationCheck();
  }, []);

  // useEffect(() => {
  // }, []);

  if (isAuthenticatedResult === true) {
    return <>{props.children}</>;
  } else if (isAuthenticatedResult === false) {
    return router.push('/login');
  } else {
    return (
      <>
        <Loader />
      </>
    );
  }
}
