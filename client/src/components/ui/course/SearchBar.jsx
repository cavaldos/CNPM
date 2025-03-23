import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublicService from "../../../services/public.service";

// Mock data for recently viewed and popular items (replace with API data if needed)
const recentlyViewed = [
    {
        title: "MBA in Business Analytics",
        university: "O.P. Jindal Global University",
        image: "https://via.placeholder.com/40", // Placeholder image URL
    },
    {
        title: "English and Academic Preparation - Pre-Collegiate",
        university: "Rice University",
        image: "https://via.placeholder.com/40",
    },
    {
        title: "Amazon DevOps Guru Getting Started",
        university: "Amazon Web Services",
        image: "https://via.placeholder.com/40",
    },
];

const popularItems = ["machine learning", "project management", "cybersecurity"];

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [recent, setRecent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchAutoComplete = async (searchTerm) => {
        setLoading(true);
        setError(null);
        try {
            const response = await PublicService.course.autoComplete(searchTerm);

            setResults(response.data.results || []);
            setRecent(response.data.recent || []);
            if (response.data && response.data.result) {
                setResults(response.data.result);
                setRecent(response.data.recent);
            } else {
                throw new Error("Dữ liệu trả về không hợp lệ");
            }
        }
        catch (error) {
            console.error("Error fetching courses:", error);
        }
    }
    useEffect(() => {
        fetchAutoComplete(searchTerm);
    }, [searchTerm]);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsDropdownOpen(value.length > 0); // Show dropdown when input has text
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search/${encodeURIComponent(searchTerm)}`);
            setIsDropdownOpen(false); // Hide dropdown after search
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // Handle selecting an item from autocomplete
    const handleSelectItem = (text) => {
        setSearchTerm(text);
        setIsDropdownOpen(false);
    };

    return (
        <div className="flex items-center space-x-2 mr-auto ml-4 relative">
            <div className="relative">
                <input
                    type="text"
                    placeholder="What do you want to learn?"
                    className="border-gray-300 border-b border-[1px] rounded-full px-4 py-2 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsDropdownOpen(true)} // Show dropdown on focus
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Hide after losing focus with delay
                />
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 rounded-full p-2 text-white"
                    onClick={handleSearch}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>

            {/* Dropdown for search results */}
            {isDropdownOpen && (
                <div className="absolute top-full left-0 w-[480px] mt-2 bg-white border rounded-lg shadow-lg z-40 p-4">
                    {/* Recently Viewed Section */}
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">
                            Recently viewed
                        </h3>
                        {recentlyViewed.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                                onClick={() => handleSelectItem(item.title)}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-10 h-10 rounded"
                                />
                                <div>
                                    <p className="text-sm font-medium">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.university}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Popular Right Now Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">
                            Popular right now
                        </h3>
                        {popularItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                                onClick={() => handleSelectItem(item)}
                            >
                                <span className="text-blue-600">🔍</span>
                                <p className="text-sm">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;