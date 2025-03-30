import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useNavigate, useLocation, useParams } from 'react-router-dom';

import LessonList from "./LessonList";

const LearningPage = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { enrollmentId, courseId } = useParams();
    const [activeTab, setActiveTab] = useState(null);

    const tabs = [
        { name: "Discussion Forums", path: "discussion-forums" },
        { name: "Messages", path: "messages" },
        // { name: "Course Info", path: "/learning/info" },
    ];

    useEffect(() => {
        const currentPath = location.pathname;

        // Kiểm tra xem đường dẫn hiện tại có khớp với một trong các tab không
        const currentTab = tabs.find(tab => currentPath.includes(tab.path))?.name;

        // Nếu đường dẫn khớp với một tab, đặt tab đó thành active
        // Nếu không (ví dụ: đang xem module), đặt activeTab thành null
        setActiveTab(currentTab || null);
    }, [location.pathname]);

    const handleTabClick = (tab) => {
        setActiveTab(tab.name);
        // Append the tab path to the enrollmentId and courseId path
        navigate(`/learning/${enrollmentId}/${courseId}/${tab.path}`);
    };

    return (
        <div className="flex gap-[20px] h-[82vh] text-black ml-10">

            <div className="w-[25%] p-3 overflow-y-auto max-h-[82vh]">
                <LessonList />
                {tabs.map(tab => (
                    <div
                        key={tab.name}
                        className={`cursor-pointer py-2 px-4 rounded-md pl-5 relative transition-colors ${activeTab === tab.name ? "bg-blue-100 text-black font-semibold before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>
            <div className="grow overflow-y-auto max-h-[82vh]">
                {children}
            </div>
            <div className="w-[20%] overflow-y-auto max-h-[calc(100vh-100px)]">
                {/* Future content can be added here */}
            </div>
        </div>
    );
};

export default LearningPage;