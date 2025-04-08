import React, { useState, useEffect, useRef } from "react";
import CourseCard from "./CourseCard";
import PublicService from "../../../services/public.service";
import { useParams } from "react-router-dom";
import { Pagination } from 'antd';
import useLanguageSwitcher from "../../../hooks/LanguageSwitcher";

const HomeCourse = () => {
    const { searchTerm } = useParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1); // Đổi thành 1 thay vì 0
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    // Ref for retry timer
    const retryTimerRef = useRef(null);

    // Language translations
    const suggestedCoursesText = useLanguageSwitcher("Suggested courses for you");
    const searchResultsForText = useLanguageSwitcher("Search results for");
    const noCoursesFoundText = useLanguageSwitcher("No courses found");
    const noCoursesForKeywordText = useLanguageSwitcher("No courses found for keyword");
    const retryText = useLanguageSwitcher("Retry");

    const fetchCourses = async (page = currentPage) => {
        setLoading(true);
        setError(null);
        try {
            const response = await PublicService.course.searchCourse(searchTerm || '', page - 1, pageSize); // Trừ 1 khi gọi API
            const data = response.data;

            if (data) {
                setCourses(data.result || []);
                setTotalPages(data.totalPage || 0);
                setCurrentPage(page);
            } else {
                throw new Error("Dữ liệu trả về không hợp lệ");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Lỗi không xác định";
            setError(`${errorMsg}`);
            console.error("Error fetching courses:", error);

            // Tự động retry sau 1 giây
            retryTimerRef.current = setTimeout(() => {
                fetchCourses(page);
            }, 50);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(currentPage);

        // Clear any existing retry timer when component unmounts or dependencies change
        return () => {
            if (retryTimerRef.current) {
                clearTimeout(retryTimerRef.current);
            }
        };
    }, [currentPage, searchTerm]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleManualRetry = () => {
        // Clear any existing timer before manual retry
        if (retryTimerRef.current) {
            clearTimeout(retryTimerRef.current);
        }
        fetchCourses(currentPage);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Categories */}
            <div className="container mx-auto px-4 py-8">
                {/* Course List */}
                <div className="flex flex-col min-h-[calc(100vh-200px)]">
                    <h2 className="text-2xl font-bold mb-6">
                        {searchTerm ? `${searchResultsForText} "${searchTerm}"` : suggestedCoursesText}
                    </h2>
                    {loading ? (
                        <div className="flex-1 flex justify-center items-center py-10">
                            <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="flex-1 flex flex-col justify-center items-center py-10 text-red-600">
                            <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>

                            <button
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md border border-blue-700 hover:bg-blue-700 transition-colors duration-200"
                                onClick={handleManualRetry}
                            >
                                {retryText}
                            </button>
                        </div>
                    ) : courses.length > 0 ? (
                        <div className="flex-1 flex flex-col">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {courses.map((course, index) => (
                                    <CourseCard key={course.id || index} course={course} />
                                ))}
                            </div>
                            {/* Spacer to push pagination to the bottom */}
                            <div className="flex-1"></div>
                            {/* Thay thế phần pagination cũ bằng Ant Design Pagination */}
                            <div className="mt-8 flex justify-center">
                                <Pagination
                                    current={currentPage}
                                    total={totalPages * pageSize}
                                    pageSize={pageSize}
                                    onChange={handlePageChange}
                                    showSizeChanger={false}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex justify-center items-center py-10 flex-col">
                            <p className="text-gray-500 mb-4">{noCoursesFoundText}</p>
                            {searchTerm && (
                                <p className="text-gray-400">
                                    {noCoursesForKeywordText} "{searchTerm}"
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeCourse;