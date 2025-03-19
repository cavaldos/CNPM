import React, { useEffect, useState } from "react";

import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth } from "../../../config/firebase";

const FireBaseLoginPage = () => {
    const [user, setUser] = useState(null); // Changed < any > to null

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        console.log(provider)
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            console.log(result.user);
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    const signOutGoogle = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error signing out with Google", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
            {user ? (
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome to Dashboard</h1>
                    <div className="flex items-center space-x-4 mb-6">
                        <img 
                            src={user.photoURL} 
                            alt="Profile" 
                            className="w-16 h-16 rounded-full border-4 border-blue-500"
                        />
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-800">{user.displayName}</h2>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                    <button 
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                        onClick={signOutGoogle}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome</h1>
                    <p className="text-center text-gray-600 mb-8">Please sign in to continue</p>
                    <button 
                        className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 border border-gray-300 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                        onClick={signInWithGoogle}
                    >
                        <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>Sign in with Google</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default FireBaseLoginPage;