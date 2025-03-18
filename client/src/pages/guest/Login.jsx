import { useEffect, useState } from 'react';
import FireBaseLoginPage from '../../components/auth/firebase/LoginPage';
import OktaLoginPage from '../../components/auth/okta/LoginPage';
const LoginPage = () => {


  return (
    <div className="container mx-auto flex flex-row items-center justify-center h-screen">
      <FireBaseLoginPage />
      <OktaLoginPage />
    </div>
  );
};

export default LoginPage;
