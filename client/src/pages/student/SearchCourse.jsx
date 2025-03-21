import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchCoursePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập tại đây
    console.log("Login with:", { email, password });
  };

  const handleGoogleLogin = () => {
    // Xử lý đăng nhập bằng Google
    console.log("Login with Google");
  };

  const handleFacebookLogin = () => {
    // Xử lý đăng nhập bằng Facebook
    console.log("Login with Facebook");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      sdfsdafsdafsdafsadf
    </div>
  );
};

export default SearchCoursePage;