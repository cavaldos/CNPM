import React, { useEffect, useState } from "react";
import { Auth0Provider } from '@auth0/auth0-react';

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
            >
                <button>
                    Sign In with Auth0
                </button>
            </Auth0Provider>

            <div className="container mx-auto flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Okta Login Page</h1>
                <p className="mb-4">Welcome to the Okta login page!</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Sign In with Okta
                </button>
            </div>
        </>
    );
}
export default OktaLoginPage;