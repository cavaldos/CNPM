import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const {
    CourseID,
    Title,
    Description,
    InstructorName,
    Image,
    AvgRating,
    EnrollmentCount,
    Topic,
    CreateTime,
  } = course;

  const navigate = useNavigate();

  // Fallback image nếu không có ảnh
  const fallbackImage =
    "https://plus.unsplash.com/premium_photo-1738105946749-320f638ed0be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8";

  // Format ngày tạo
  const formattedDate = new Date(CreateTime).toLocaleDateString("vi-VN", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      onClick={() => navigate(`/course-detail/${CourseID}`)}
      className="max-w-sm w-full rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={Image || fallbackImage}
          alt={Title}
          className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        {/* Enrollment Badge */}
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          {EnrollmentCount} học viên
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Topic Tag */}
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3">
          {Topic}
        </span>

        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {Title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {Description}
        </p>

        {/* Instructor Info */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
            <span className="text-sm font-semibold text-gray-700">
              {InstructorName.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-gray-700 font-medium">
            {InstructorName}
          </span>
        </div>

        {/* Rating & Date */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {AvgRating && (
              <>
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(AvgRating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {AvgRating.toFixed(1)}
                </span>
              </>
            )}
          </div>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;