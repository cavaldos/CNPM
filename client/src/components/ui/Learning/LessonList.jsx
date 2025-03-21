import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate, useLocation } from 'react-router-dom';
import StudentService from "../../../services/student.service";

const LessonList = () => {
    const [isOpen, setIsOpen] = useState(() => {
        const savedState = localStorage.getItem('courseMaterialIsOpen');
        return savedState ? JSON.parse(savedState) : false;
    });
    const [activeLesson, setActiveLesson] = useState(null);
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Set active lesson based on URL path when component mounts
    useEffect(() => {
        const path = location.pathname;
        const lessonMatch = path.match(/\/learning\/lesson\/(\d+)/);
        if (lessonMatch && lessonMatch[1]) {
            setActiveLesson(parseInt(lessonMatch[1]));
        }
    }, [location.pathname]);

    useEffect(() => {
        localStorage.setItem('courseMaterialIsOpen', JSON.stringify(isOpen));
    }, [isOpen]);

    useEffect(() => {
        const fetchLessons = async () => {
            const courseId = 1; // Replace with actual course ID
            const response = await StudentService.lesson.getAllLessons(courseId);
            if (response.success) {
                setLessons(response.data);
            } else {
                console.error(response.message);
            }
        };
        fetchLessons();
    }, []);

    const handleLessonClick = (lessonId) => {
        setActiveLesson(lessonId);
        navigate(`/learning/${lessonId}`);
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
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                    <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                        {lessons.map((lesson) => (
                            <li
                                key={lesson.LessonID}
                                className={`flex items-center cursor-pointer p-2 rounded ${activeLesson === lesson.LessonID ? "bg-blue-200 text-blue-800" : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                onClick={() => handleLessonClick(lesson.LessonID)}
                            >
                                <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                                <div>
                                    <div className="text-sm">{lesson.Title}</div>
                                    <div className="text-xs text-gray-500">
                                        {lesson.Duration} mins • {lesson.LessonType} • {lesson.ComplexityLevel}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LessonList;