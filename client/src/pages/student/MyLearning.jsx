import React, { useState } from "react";
import { BookOpen, CheckCircle, Clock, MoreVertical } from "lucide-react";

/**
 * @typedef {Object} Course
 * @property {number} id
 * @property {string} university
 * @property {string} title
 * @property {number} progress
 * @property {string} status - "Not started", "In Progress", or "Completed"
 * @property {string} imageUrl
 */

const sampleCourses = [
    {
        id: 1,
        university: "Rice University",
        title: "English and Academic Preparation - Pre-Collegiate",
        progress: 0,
        status: "Not started",
        imageUrl:
            "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/70/de505d47be7d3a063b51b6f856a6e2/New-Rice-Logo-Blue-Square.png",
    },
    {
        id: 2,
        university: "Stanford University",
        title: "Understanding Einstein: The Special Theory of Relativity",
        progress: 0,
        status: "Not started",
        imageUrl:
            "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/e8/7cc3d09d3f11e698dfff46d35f2da1/Stanford_Coursera_Logo.png",
    },
    {
        id: 3,
        university: "Google",
        title: "Google Data Analytics",
        progress: 75,
        status: "In Progress",
        imageUrl:
            "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7ecc11d/Google-G_360x360.png",
    },
    {
        id: 4,
        university: "Meta",
        title: "Meta Front-End Developer",
        progress: 100,
        status: "Completed",
        imageUrl:
            "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/73/e03b13a8e44df9b19eb279e5506396/360-x-360.png",
    },
];

const MyLearning = () => {
    const [activeTab, setActiveTab] = useState("progress");
    const filteredCourses = sampleCourses.filter((course) =>
        activeTab === "progress"
            ? course.status !== "Completed"
            : course.status === "Completed",
    );
    return (
        <div className="min-h-screen w-full px-[120px] bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">My Learning</h1>
                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        className={`px-4 py-2 rounded-full ${activeTab === "progress" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
                        onClick={() => setActiveTab("progress")}
                    >
                        <Clock className="w-4 h-4 inline-block mr-2" />
                        In Progress
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full ${activeTab === "completed" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
                        onClick={() => setActiveTab("completed")}
                    >
                        <CheckCircle className="w-4 h-4 inline-block mr-2" />
                        Completed
                    </button>
                </div>
                {/* Course Cards */}
                <div className="grid gap-4">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <img
                                        src={course.imageUrl}
                                        alt={`${course.university} logo`}
                                        className="w-16 h-16 rounded-lg"
                                    />
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            {course.university}
                                        </p>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {course.title}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                Course · {course.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                    <MoreVertical className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            {course.status === "In Progress" && (
                                <div className="mt-4">
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full"
                                            style={{
                                                width: `${course.progress}%`,
                                            }}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {course.progress}% complete
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyLearning;