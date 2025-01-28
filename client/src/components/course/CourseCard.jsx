import React from "react";

const CourseCard = () => {
    return (
        <div className="max-w-md bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
                <span className="text-sm text-gray-500 font-medium">Microsoft</span>
                <h3 className="text-xl font-bold text-gray-800 mt-1">
                    Microsoft Project Management
                </h3>
            </div>

            <div className="mb-4">
                <span className="text-sm font-semibold text-gray-700">
                    Skills you'll gain:
                </span>
                <div className="flex flex-wrap mt-2">
                    {[
                        "Risk Management",
                        "Budgeting",
                        "Stakeholder Management",
                        "Planning...",
                    ].map((skill, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center mb-4">
                <div className="flex items-center">
                    <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-600 ml-1 text-sm">4.7</span>
                    <span className="text-gray-500 text-sm ml-2">(274 reviews)</span>
                </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 space-x-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    Beginner
                </span>
                <span>•</span>
                <span className="font-medium">Professional Certificate</span>
                <span>•</span>
                <span>4 months</span>
            </div>
        </div>
    );
};

export default CourseCard;