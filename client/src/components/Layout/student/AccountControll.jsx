import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const AccountControll = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    // Array of menu items with name and path
    const menuItems = [
        { name: "Profile", path: "/profile" },
        { name: "My Purchases", path: "/purchases" },
        { name: "Settings", path: "/settings" },
        { name: "Updates", path: "/updates" },
        { name: "Accomplishments", path: "/accomplishments" },
        { name: "Help Center", path: "/help-center" },
        { name: "Log Out", path: "/logout" }
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleClickOutside = (e) => {
        if (isDropdownOpen && !e.target.closest(".account-dropdown")) {
            setIsDropdownOpen(false);
        }
    };

    // Add event listener to detect clicks outside the dropdown
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Handle navigation when menu item is clicked
    const handleMenuItemClick = (path) => {
        navigate(path);
        setIsDropdownOpen(false); // Close dropdown after click
    };

    return (
        <div className="flex items-center space-x-4 relative account-dropdown">
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-[#0156d1]">
                <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                English
                <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            <button className="relative p-1 text-gray-700 hover:text-[#0156d1]">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                </svg>
            </button>
            <div className="hover:bg-blue-50 p-1 px-2 rounded-sm flex" >
                <button
                    className="bg-[#0a2540]  rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold"
                    onClick={toggleDropdown}
                >
                    K
                </button>
                {
                    isDropdownOpen && (
                        <KeyboardArrowUpIcon className=" ml-1 mt-1 text-gray-700" />
                    ) || (
                        <KeyboardArrowDownIcon className="ml-1 mt-1 text-gray-700" />
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
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                                onClick={() => handleMenuItemClick(item.path)}
                            >
                                {item.name}
                            </div>
                        ))}
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