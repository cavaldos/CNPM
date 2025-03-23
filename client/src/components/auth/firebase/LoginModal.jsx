import React, { useState } from 'react';
import { Modal } from 'antd';
import LoginService from '../LoginService';
const LoginComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { signInWithGoogle } = LoginService();

    // Hàm để hiển thị modal
    const showModal = () => {
        setIsModalOpen(true);
    };

    // Hàm xử lý khi nhấn OK
    const handleOk = () => {
        setIsModalOpen(false);
    };

    // Hàm xử lý khi nhấn Cancel
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleLoginWithGoogle = async () => {
        handleOk();
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    }

    return (
        <>
            <button
                onClick={showModal}
                className="border border-[#0056D2] text-[#0056D2] font-semibold py-1.5 px-4 rounded  hover:bg-[#0056D2] hover:text-white transition-colors"
            >
                Log In
            </button>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className=''
            >
                <div className="w-[350px] h-[500px] bg-white rounded-lg p-6 mx-auto">
                    <p className="text-center text-2xl font-bold mb-8">Welcome back</p>

                    <form className="flex flex-col gap-4 mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="rounded-full border border-gray-300 px-4 py-3 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="rounded-full border border-gray-300 px-4 py-3 focus:outline-none"
                        />
                        {/* <p className="text-right text-sm text-gray-500 underline cursor-pointer hover:text-black">
                            Forgot Password?
                        </p> */}
                        <button

                            className="rounded-full bg-blue-500 text-white px-4 py-2 shadow-md hover:bg-blue-600 active:shadow-none transition duration-200"
                        >
                            Log in
                        </button>
                    </form>

                    <p className="text-xs text-gray-500 text-center">
                        Don't have an account?
                        <span className="ml-1 text-blue-500 underline font-bold cursor-pointer hover:text-blue-600">
                            Sign up
                        </span>
                    </p>

                    <div className="flex flex-col gap-4 mt-20">
                        <div
                            onClick={handleLoginWithGoogle}
                            className="flex items-center justify-center gap-2 rounded-full border border-gray-400 px-4 py-2 shadow-md cursor-pointer"
                        >
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                viewBox="0 0 48 48"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            <span>Log in with Google</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default LoginComponent;