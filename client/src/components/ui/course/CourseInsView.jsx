import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseInstructorView = ({ course, onMenuOpen, onToggleVisibility, showControls = true }) => {
  const navigate = useNavigate();

  const handleImageError = e => {
    e.target.src =
      'https://plus.unsplash.com/premium_photo-1672329278706-35c6005ffb0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8';
    e.target.onerror = null;
  };

  const handleGoToDiscussion = courseId => {
    navigate(`/discussion-forum/${courseId}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative">
        <img
          src={course.Image?.startsWith('http') ? course.Image : `/images/courses/${course.Image}`}
          alt={course.Title}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={handleImageError}
        />
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              course.IsHidden ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
            }`}
          >
            {course.IsHidden ? (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
                Đang ẩn
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Công khai
              </>
            )}
          </span>
        </div>
        {showControls && (
          <button
            onClick={e => onMenuOpen(e, course)}
            className="absolute top-3 right-3 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.Title}</h3>
        <p className="text-sm text-gray-600 mb-3">{course.Topic}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            Cập nhật:{' '}
            <span className="text-gray-800">
              {new Date(course.CreateTime).toLocaleDateString('vi-VN')}
            </span>
          </div>
          {showControls && (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!course.IsHidden}
                onChange={() => onToggleVisibility(course.CourseID, course.IsHidden)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
            </label>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Bài học</p>
            <p className="text-lg font-semibold text-gray-900">{course.LessonCount || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Học viên</p>
            <p className="text-lg font-semibold text-gray-900 flex items-center">
              <svg
                className="w-5 h-5 mr-1 text-gray-600"
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
              {course.EnrollmentCount || 0}
            </p>
          </div>
          {!course.IsHidden && course.AvgRating > 0 && (
            <div>
              <p className="text-sm text-gray-600">Đánh giá ({course.ReviewCount})</p>
              <p className="text-lg font-semibold text-gray-900">{course.AvgRating.toFixed(1)} ★</p>
            </div>
          )}
        </div>

        <button
          onClick={() => handleGoToDiscussion(course.CourseID)}
          className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Diễn đàn thảo luận
        </button>
      </div>

      {/* Footer Section
      <div className="bg-gray-50 p-5 border-t border-gray-200 rounded-b-lg">
        <p className="text-sm font-semibold text-gray-900">
          Giá: {course.Price ? `$${course.Price.toFixed(2)}` : "Miễn phí"}
        </p>
        <p className="text-xs text-green-700">
          {course.Price > 0
            ? `Khóa học có phí: $${course.Price.toFixed(2)}`
            : "Khóa học này hoàn toàn miễn phí cho tất cả học viên"}
        </p>
      </div> */}
    </div>
  );
};

export default CourseInstructorView;
