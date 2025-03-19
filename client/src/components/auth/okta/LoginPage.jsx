import React, { useEffect, useState } from "react";

const OktaLoginPage = () => {


    return (
        <>

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