import React, { useState, useEffect, useRef } from 'react';
import CourseCard from './CourseCard';
import PublicService from '../../../services/public.service';
import useLanguageSwitcher from '../../../hooks/LanguageSwitcher';

const RelatedCourses = ({ currentCourseId }) => {
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const retryTimerRef = useRef(null);

  // Language translations
  const relatedCoursesText = useLanguageSwitcher('Related Courses');
  const moreCoursesText = useLanguageSwitcher('More courses you might like');
  const noRelatedCoursesText = useLanguageSwitcher('No related courses found');
  const retryText = useLanguageSwitcher('Retry');

  const fetchRelatedCourses = async () => {
    if (!currentCourseId) return;

    setLoading(true);
    setError(null);
    try {
      // Use the getAllCourses API to get all courses
      const response = await PublicService.course.getAllCourses(0, 5);
      if (response.success && response.data && response.data.result) {
        // Filter out the current course and limit to 4 related courses
        const filtered = response.data.result
          .filter(course => course.CourseID !== currentCourseId)
          .slice(0, 4);
        setRelatedCourses(filtered);
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      setError(errorMsg);
      console.error('Error fetching related courses:', error);

      // Auto-retry after 50ms like in HomeCourse
      retryTimerRef.current = setTimeout(() => {
        fetchRelatedCourses();
      }, 50);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedCourses();

    // Clean up any retry timers when unmounting
    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, [currentCourseId]);

  const handleManualRetry = () => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
    }
    fetchRelatedCourses();
  };

  // Don't render anything if there's no current course ID
  if (!currentCourseId) return null;

  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow ">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold">{relatedCoursesText}</h2>
          <p className="text-gray-600">{moreCoursesText}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center py-6 text-red-600">
          <p className="mb-2">{error}</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md border border-blue-700 hover:bg-blue-700 transition-colors duration-200"
            onClick={handleManualRetry}
          >
            {retryText}
          </button>
        </div>
      ) : relatedCourses.length > 0 ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6 min-w-max">
            {relatedCourses.map(course => (
              <div key={course.CourseID} className="w-72 flex-shrink-0">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic py-4">{noRelatedCoursesText}</p>
      )}
    </div>
  );
};

export default RelatedCourses;
