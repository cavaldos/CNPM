import React, { useState, useEffect } from "react";
import { BookOpen, CheckCircle, Clock, MoreVertical, Loader2 } from "lucide-react";
import StudentService from "../../services/student.service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
/**
 * @typedef {Object} Course
 * @property {number} id
 * @property {string} university
 * @property {string} title
 * @property {number} progress
 * @property {string} status - "Enrolled" or "Completed"
 * @property {string} imageUrl
 */

const defaultImage = "https://placehold.co/100x100?text=Course";

const MyLearning = () => {
    const [activeTab, setActiveTab] = useState("enrolled");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCourseProgress = async () => {
            try {
                setLoading(true);
                const response = await StudentService.progress.getAllCourseProgress(user.UserID);
                if (response.success) {
                    // Map API data to course format
                    const formattedCourses = response.data.map(course => ({
                        id: course.CourseID,
                        topic: course.Topic || "Unknown Topic",
                        title: course.CourseTitle,
                        EnrollmentID: course.EnrollmentID,
                        progress: course.EnrollmentStatus === "Completed" ? 100 : 50, // Assuming 50% for enrolled courses
                        status: course.EnrollmentStatus,
                        imageUrl: course.imageUrl || defaultImage, // Using a placeholder image
                        enrollDate: new Date(course.EnrollDate).toLocaleDateString()
                    }));
                    setCourses(formattedCourses);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError("Failed to load course data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseProgress();
    }, []);

    const filteredCourses = courses.filter((course) =>
        activeTab === "enrolled"
            ? course.status === "Enrolled"
            : course.status === "Completed"
    );
    return (
        <div className="min-h-screen w-full px-[120px] bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">My Learning</h1>
                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        className={`px-4 py-2 rounded-full ${activeTab === "enrolled" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
                        onClick={() => setActiveTab("enrolled")}
                    >
                        <Clock className="w-4 h-4 inline-block mr-2" />
                        Enrolled
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full ${activeTab === "completed" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
                        onClick={() => setActiveTab("completed")}
                    >
                        <CheckCircle className="w-4 h-4 inline-block mr-2" />
                        Completed
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        <p className="ml-2 text-gray-600">Loading your courses...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-sm underline mt-2"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* No Courses State */}
                {!loading && !error && filteredCourses.length === 0 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                        <p className="text-gray-600">
                            {activeTab === "enrolled"
                                ? "You don't have any enrolled courses yet."
                                : "You haven't completed any courses yet."}
                        </p>
                    </div>
                )}

                {/* Course Cards */}
                {!loading && !error && filteredCourses.length > 0 && (
                    <div className="grid gap-4">
                        {filteredCourses.map((course) => (
                            <div
                                key={course.EnrollmentID}
                                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                                onClick={() => navigate(`/learning/${course.EnrollmentID}/${course.id}`)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <img
                                            src={course.imageUrl}
                                            alt={`${course.title} thumbnail`}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                {course.topic}
                                            </p>
                                            <h3 className="text-xl font-semibold mb-2">
                                                {course.title}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">
                                                    Course · {course.status} · Enrolled on {course.enrollDate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <MoreVertical className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                                {course.status === "Enrolled" && (
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
                )}
            </div>
        </div>
    );
};

export default MyLearning;