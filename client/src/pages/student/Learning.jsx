import React, { useState } from "react";
import { Button, Avatar } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useNavigate } from 'react-router-dom';
const CollapsibleCourseMaterial = () => {
    const [isOpen, setIsOpen] = useState(false);

    const modules = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5", "Module 6", "Module 7"];

    const handleModuleClick = (module) => {
        console.log(`Clicked on ${module}`);
        alert(`Clicked on ${module}`);
        // Add your click handler logic here
    };

    return (
        <div className="w-full border border-transparent hover:border-blue-600 rounded-[4px] mb-6">
            {/* Toggle Button */}
            <button
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-200 flex items-center justify-between rounded-[4px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <KeyboardArrowDownIcon className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                <span className="ml-4 mr-auto">Course Material</span>
            </button>

            {/* Collapsible Content */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                    <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {modules.map((module, index) => (
                            <li
                                key={index}
                                className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:bg-gray-100 p-1 rounded"
                                onClick={() => handleModuleClick(module)}
                            >
                                <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                                <span>{module}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const LearningPage = ({children}) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Discussion Forums");

    const tabs = [
        { name: "Discussion Forums", path: "/learning/discussion-forums" },
        { name: "Messages", path: "/learning/messages" },
        { name: "Course Info", path: "/learning/info" },
    ];

    const handleTabClick = (tab) => {
        setActiveTab(tab.name);
        navigate(tab.path);
    };

    return (
        <div className="flex gap-[20px] h-[82vh] text-black ml-10">

            <div className="w-[20%] p-3 overflow-y-auto max-h-[calc(100vh-100px)]">
                <CollapsibleCourseMaterial />

                {tabs.map((tab) => (
                    <div
                        key={tab.name}
                        className={`p-4 cursor-pointer font-bold text-gray-800 pl-12 rounded-md ${activeTab === tab.name ? "bg-[#e4ebf5] " : ""
                            }`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>
            <div className="grow overflow-y-auto max-h-[calc(100vh-100px)]">
                {children}
            </div>
            <div className="w-[22%] overflow-y-auto max-h-[calc(100vh-100px)]">3</div>
        </div>
    );
};

export default LearningPage;