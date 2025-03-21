import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from "../../config/firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "firebase/auth";


const LoginService = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
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
    const getInfo = async () => {
        try {

            const response = await AuthService.getInfo(email);
            console.log('Response from server:', response.data.UserID);
            dispatch(setUser({
                UserID: response.data.UserID,
                UserName: response.data.UserName,
                Email: response.data.Email,
                FullName: response.data.FullName,
                Role: response.data.Role,
                CreatedTime: response.data.CreatedTime,
                UpdateTime: response.data.UpdateTime,
            }))

        } catch (err) {
            console.error('Lỗi khi lấy thông tin người dùng:', err);
        }
    };

    return {
        email,
        setEmail,
        signInWithGoogle,
        signOutGoogle,
        getInfo,
    }
}

export default LoginService;