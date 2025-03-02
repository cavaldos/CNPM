import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import CourseCard from "../../components/course/CourseCard";

const StudentPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Mock data - trong thực tế sẽ được lấy từ API
    const courses = [
        {
            id: 1,
            title: "Lập trình Web Frontend với React",
            instructor: "Nguyễn Văn A",
            rating: 4.7,
            reviewCount: 1234,
            thumbnail: "https://via.placeholder.com/300x200?text=React+Course",
            price: "1.200.000 VND",
            category: "Lập trình",
        },
        {
            id: 2,
            title: "Machine Learning cơ bản",
            instructor: "Trần Thị B",
            rating: 4.9,
            reviewCount: 823,
            thumbnail: "https://via.placeholder.com/300x200?text=Machine+Learning",
            price: "1.500.000 VND",
            category: "Data Science",
        },
        {
            id: 3,
            title: "Quản lý dự án phần mềm",
            instructor: "Lê Văn C",
            rating: 4.5,
            reviewCount: 567,
            thumbnail: "https://via.placeholder.com/300x200?text=Project+Management",
            price: "900.000 VND",
            category: "Quản lý",
        },
        {
            id: 4,
            title: "Thiết kế UI/UX chuyên nghiệp",
            instructor: "Phạm Thị D",
            rating: 4.8,
            reviewCount: 932,
            thumbnail: "https://via.placeholder.com/300x200?text=UI+UX+Design",
            price: "1.100.000 VND",
            category: "Thiết kế",
        },
    ];

    const categories = ["Tất cả", "Lập trình", "Data Science", "Quản lý", "Thiết kế", "Ngoại ngữ"];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}


            {/* Categories */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className="px-4 py-2 rounded-full bg-white border border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Course List */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Khóa học đề xuất cho bạn</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>

                {/* More sections */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Khóa học phổ biến</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.slice(0, 4).reverse().map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPage;
