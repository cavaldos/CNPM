import React from "react";

const CourseCard = () => {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden  border border-gray-200 bg-white">
            {/* Image Section */}
            <div className="">
                <img
                    src="https://plus.unsplash.com/premium_photo-1738105946749-320f638ed0be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" // Replace with actual image URL
                    alt="Course Books"
                    className="w-full h-48 object-cover"
                />
                {/* Free Label */}
                <div className=" top-2 right-2 bg-white text-[#0156d1] text-sm font-medium px-2 py-1 rounded-full">
                    Free
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* University Logo and Name */}
                <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        {/* Replace with actual university logo */}
                        <span className="text-xs font-bold text-gray-700">R</span>
                    </div>
                    <span className="text-sm text-gray-600">Rice University</span>
                </div>

                {/* Course Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    English and Academic Preparation - Pre-Collegiate
                </h3>

                {/* Course Type */}
                <p className="text-sm text-gray-500">Course</p>
            </div>
        </div>
    );
};

export default CourseCard;