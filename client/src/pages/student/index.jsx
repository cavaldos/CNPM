import React, { useState, useEffect } from "react";
import CourseCard from "../../components/ui/course/CourseCard";
import PublicService from "../../services/public.service";

const StudentPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(0);

    const fetchCourses = async (page = currentPage) => {
        setLoading(true);
        setError(null);
        try {
            const response = await PublicService.course.getAllCourses(page, pageSize);
            const data = response.data;
            if (data && data.result) {
                setCourses(data.result);
                setTotalPages(data.totalPage || 0);
                setCurrentPage(data.page || page);
            } else {
                throw new Error("Dữ liệu trả về không hợp lệ");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Lỗi không xác định";
            setError(`Lỗi khi tải khóa học: ${errorMsg}`);
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const categories = ["Tất cả", "Lập trình", "Data Science", "Quản lý", "Thiết kế", "Ngoại ngữ"];
    const handleCategoryClick = (category) => {
        if (category === "Tất cả") {
            setCurrentPage(0);
        } else {
            console.log("Filter by category:", category);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Categories */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className="px-4 py-2 rounded-full bg-white border border-gray-300 hover:bg-blue-50 hover:border-blue-500 transition-colors duration-200 text-gray-700"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Course List */}
                <div className="flex flex-col min-h-[calc(100vh-200px)]">
                    <h2 className="text-2xl font-bold mb-6">Khóa học đề xuất cho bạn</h2>
                    {loading ? (
                        <div className="flex-1 flex justify-center items-center py-10">
                            <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                            <p className="mt-2 ml-2">Đang tải khóa học...</p>
                        </div>
                    ) : error ? (
                        <div className="flex-1 flex flex-col justify-center items-center py-10 text-red-600">
                            <p>{error}</p>
                            <button
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md border border-blue-700 hover:bg-blue-700 transition-colors duration-200"
                                onClick={() => fetchCourses(currentPage)}
                            >
                                Thử lại
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
                            {/* Pagination */}
                            <div className="mt-8">
                                <div className="flex justify-center space-x-1">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 0}
                                        className={`px-4 py-2 rounded border border-gray-300 ${currentPage === 0
                                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                            } transition-colors duration-200`}
                                    >
                                        Previous
                                    </button>

                                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                        const pageNum = i + Math.max(0, currentPage - 2);
                                        if (pageNum >= totalPages) return null;

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`px-4 py-2 rounded border border-gray-300 ${currentPage === pageNum
                                                        ? "bg-blue-600 text-white border-blue-600"
                                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                                    } transition-colors duration-200`}
                                            >
                                                {pageNum + 1}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= totalPages - 1}
                                        className={`px-4 py-2 rounded border border-gray-300 ${currentPage >= totalPages - 1
                                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                            } transition-colors duration-200`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex justify-center items-center py-10">
                            <p className="text-gray-600">Không tìm thấy khóa học nào</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentPage;