import React, { useEffect, useState } from "react";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

// Create a login button component that will handle the Auth0 login
const LoginButton = () => {
  const { loginWithPopup, user, isAuthenticated, isLoading } = useAuth0();

  // Log the user object when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User authenticated:", user);
      // You can handle the user object here
    }
  }, [isAuthenticated, user]);

  return (
    <button 
      onClick={() => loginWithPopup()}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Sign In with Auth0
    </button>
  );
};

const OktaLoginPage = () => {
    const domain = import.meta.env.VITE_OKTA_DOMAIN;
    const clientId = import.meta.env.VITE_OKTA_CLIENT_ID;

    return (
        <>
            <Auth0Provider
                domain={domain}
                clientId={clientId}
                authorizationParams={{
                    redirect_uri: window.location.origin
                }}
                useRefreshTokens={true}
                cacheLocation="localstorage"
            >
                <div className="container mx-auto flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold mb-4">Okta Login Page</h1>
                    <p className="mb-4">Welcome to the Okta login page!</p>
                    <LoginButton />
                </div>
            </Auth0Provider>
        </>
    );
}
export default OktaLoginPage;