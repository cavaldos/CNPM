import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Globe, Bell } from "lucide-react";
import { useSelector } from "react-redux";
import LoginService from "../../auth/LoginService";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../redux/features/authSlice";
const AccountControll = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth);
    const { signOutGoogle } = LoginService();
    const dispatch = useDispatch();
    const menuItems = [
        { name: "Profile", path: "/profile" },
        { name: "My Purchases", path: "/purchases" },
        { name: "Settings", path: "/settings" },
        { name: "Updates", path: "/updates" },
        { name: "Accomplishments", path: "/accomplishments" },
        { name: "Help Center", path: "/help-center" },
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleClickOutside = (e) => {
        if (isDropdownOpen && !e.target.closest(".account-dropdown")) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleMenuItemClick = (path) => {
        navigate(path);
        setIsDropdownOpen(false); // Close dropdown after click
    };
    const Logout = async () => {
        try {
            await signOutGoogle();
            dispatch(clearUser());
            navigate("/");
        } catch (error) {
            console.error("Error signing out", error);
        }
    }



    return (
        <div className="flex items-center space-x-4 relative account-dropdown">
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-[#0156d1]">
                <Globe className="w-5 h-5 mr-1" />
                English
                <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            <button className="relative p-1 text-gray-700 hover:text-[#0156d1]">
                <Bell className="w-6 h-6" />
            </button>
            <div className="hover:bg-blue-50 p-1 px-2 rounded-sm flex" >
                <button
                    className="bg-[#0a2540]  rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold"
                    onClick={toggleDropdown}
                >
                    {user?.UserName?.charAt(0).toUpperCase()}
                </button>
                {
                    isDropdownOpen && (
                        <ChevronUp className="ml-1 mt-1 text-gray-700" />
                    ) || (
                        <ChevronDown className="ml-1 mt-1 text-gray-700" />
                    )
                }
            </div>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-solid border-blue-600 rounded-[4px] shadow-lg z-10 p-2 account-dropdown">
                    {/* Menu Items */}
                    <div className="space-y-1">
                        {menuItems.map((item) => (
                            <div
                                key={item.name}
                                className="px-4 py-2 text-sm text--700 hover:bg-gray-100 rounded cursor-pointer"
                                onClick={() => handleMenuItemClick(item.path)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                    <div
                        key={"Log Out"}
                        className="px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={Logout}
                    >
                        Log Out
                    </div>

                    {/* Coursera PLUS Section */}
                    <div className="mt-2 p-2 bg-gray-50 border-t rounded-b-lg">
                        <div className="text-blue-600 font-semibold text-sm">Get Coursera PLUS</div>
                        <div className="text-xs text-gray-600">Access 10,000+ courses</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountControll;