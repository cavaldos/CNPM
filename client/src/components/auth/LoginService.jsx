import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from "../../config/firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { setUser } from "../../redux/features/authSlice";
import AuthService from "../../services/auth.service";
import useCookie from '../../hooks/useCookie';
import { useNavigate } from 'react-router-dom';
const LoginService = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const [userFirebase, setUserFirebase] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [cookieValue, setCookie, removeCookie] = useCookie('token', null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUserFirebase(currentUser);
        });
        return () => unsubscribe();
    }, []);
    const checkUser = async (email) => {
        try {
            const response = await AuthService.checkUser(email);
            if (response.data) {
                navigate('/');
                await loginServer();
                return;
            }
            else {
                navigate('/set-role');
            }
        } catch (err) {
            console.error('Lỗi khi lấy thông tin người dùng:', err);
        }
    }

    useEffect(() => {
        if (userFirebase) {
            checkUser(userFirebase.email);
        }
    }, [userFirebase]);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUserFirebase(result.user);
            setCookie(result.user.accessToken);
            setEmail(result.user.email);
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };
    const signOutGoogle = async () => {
        try {
            await signOut(auth);
            setUserFirebase(null);
        } catch (error) {
            console.error("Error signing out with Google", error);
        }
    };
    const loginServer = async () => {
        try {

            const response = await AuthService.signin(selectedRole);
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
        loginServer,
        selectedRole,
        setSelectedRole,
    }
}

export default LoginService;