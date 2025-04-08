import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../redux/features/settingSlice";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";

const PickLanguage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const { language } = useSelector((state) => state.setting);
    const dropdownRef = useRef(null);

    const languages = [
        { code: "en", name: "English" },
        { code: "vi", name: "Tiếng Việt" }
    ];

    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLanguageChange = (languageCode) => {
        dispatch(setLanguage(languageCode));
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="flex items-center text-sm font-medium text-gray-700 hover:text-[#0156d1] p-2 rounded-md"
                onClick={toggleDropdown}
            >
                <Globe className="w-5 h-5 mr-1" />
                {currentLanguage.name}
                {isDropdownOpen ? (
                    <ChevronUp className="w-4 h-4 ml-1" />
                ) : (
                    <ChevronDown className="w-4 h-4 ml-1" />
                )}
            </button>

            {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-solid border-blue-600 rounded-[4px] shadow-lg z-10">
                    <div className="py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                className={`block w-full text-left px-4 py-2 text-sm ${lang.code === language
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PickLanguage;