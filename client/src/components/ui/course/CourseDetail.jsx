import React from "react";
import { Avatar, Button, CircularProgress } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ForumIcon from '@mui/icons-material/Forum';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PublicService from "../../../services/public.service";
import StudentService from "../../../services/student.service";
import { useSelector } from "react-redux";
import { message } from "antd";
import useLanguageSwitcher from "../../../hooks/LanguageSwitcher";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);
  const [courseInfo, setCourseInfo] = useState(null);
  const [lessonsList, setLessonsList] = useState([]);
  const user = useSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();

  // Language translations
  const instructorText = useLanguageSwitcher("Instructor");
  const goToCourseText = useLanguageSwitcher("Go To Course");
  const enrollText = useLanguageSwitcher("Enroll");
  const startLearningText = useLanguageSwitcher("Start Learning Today");
  const loginStudentText = useLanguageSwitcher("Login as Student to Enroll");
  const alreadyEnrolledText = useLanguageSwitcher("already enrolled");
  const lessonsText = useLanguageSwitcher("lessons");
  const completeCurriculumText = useLanguageSwitcher("Complete curriculum");
  const reviewsText = useLanguageSwitcher("reviews");
  const beginnerLevelText = useLanguageSwitcher("Beginner level");
  const recommendedExperienceText = useLanguageSwitcher("Recommended experience");
  const courseTopicText = useLanguageSwitcher("Course topic");
  const courseContentText = useLanguageSwitcher("Course Content");
  const minutesTotalLengthText = useLanguageSwitcher("minutes total length");
  const minutesText = useLanguageSwitcher("minutes");
  const complexityText = useLanguageSwitcher("Complexity");
  const lessonText = useLanguageSwitcher("Lesson");
  const noLessonsText = useLanguageSwitcher("No lessons available");
  const skillsYouGainText = useLanguageSwitcher("Skills you gain");
  const expertInstructorText = useLanguageSwitcher("Expert Instructor");
  const detailsToKnowText = useLanguageSwitcher("Details to know");
  const shareableCertificateText = useLanguageSwitcher("Shareable certificate");
  const addLinkedinText = useLanguageSwitcher("Add to your LinkedIn profile");
  const assessmentsText = useLanguageSwitcher("Assessments");
  const lessonsAvailableText = useLanguageSwitcher("lessons available");
  const enrollSuccessText = useLanguageSwitcher("Enrollment successful");
  const enrollFailedText = useLanguageSwitcher("Enrollment failed");
  const errorText = useLanguageSwitcher("Error");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await PublicService.course.getCourseDetail(courseId || "1");
        if (response.success) {
          setCourseInfo(response.data.CourseInfo);
          setLessonsList(response.data.lessons);
        } else {
          setError("Failed to load course data");
        }
      } catch (err) {
        setError("Error fetching course data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    const checkEnrollmentStatus = async () => {
      if (user.UserID && courseId) {
        try {
          const response = await StudentService.course.checkCourseEnrollment(courseId, user.UserID);
          console.log("Enrollment status response:", response);
          if (response.success) {
            setIsEnrolled(response.data.isEnrolled);
          }
        } catch (err) {
          console.error("Error checking enrollment status:", err);
          // Optionally set an error state here
        }
      }
    };

    fetchCourseData();
    checkEnrollmentStatus(); // Call the check enrollment function
  }, [courseId, user.UserID]); // Add user.UserID as a dependency


  const handleEnrollCourse = async () => {
    try {
      const response = await StudentService.enrollment.create(user.UserID, courseId);
      if (response.success === true) {
        setIsEnrolled(true);
        messageApi.info(`${enrollSuccessText}! You can now access the course.`);
      } else {
        messageApi.error(`${enrollFailedText}. Please try again.`);
      }
    } catch (error) {
      console.error("Enrollment error:", error); // Log the error for debugging
    }
  };

  const handleGoToCourse = () => {
    navigate(`/my-learning-progress`);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-6 px-4">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          <h2 className="text-lg font-semibold">{errorText}</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }


  return (<>
    {contextHolder}
    <div className="max-w-6xl mx-auto py-6 px-4 bg-gray-50 min-h-screen relative">

      <div className="block items-center mb-6 max-w-4xl">
        <img
          src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/c0/87a10033a311e892619b85c6fd62bb/IBM-200x48.png?auto=format%2Ccompress&dpr=2&h=45"
          alt="Course Provider Logo"
          className="max-w-30 h-12 mb-8"
        />
        <div>
          <h1 className="text-5xl font-semibold text-gray-900 font-inter">
            {courseInfo.Title}
          </h1>
          <p className="fontsize-base text-gray-800 mt-2">
            {courseInfo.Description}
          </p>
          <div className="flex items-center space-x-2 mt-4 relative">
            <Avatar alt={courseInfo.InstructorName} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/7e/d0e9466807417d88aceb43a91c9774/John-Rofrano.jpg?auto=format%2Ccompress&dpr=2&w=75&h=75&fit=crop" />
            <p className="text-base">
              {instructorText}:{" "}
              <a className="underline cursor-pointer hover:no-underline">
                {courseInfo.InstructorName}
              </a>
            </p>
          </div>
        </div>
      </div>

      {isEnrolled ? (
        <div className="flex space-x-4 mb-6">
          <button
            className="normal-case bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4"
            onClick={handleGoToCourse}
          >
            {goToCourseText}
          </button>
        </div>
      ) : (
        <div className="flex space-x-4 mb-6">
          <button
            className={`normal-case w-60 font-semibold rounded-md py-2 px-4 ${user.Role === "Student"
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            onClick={handleEnrollCourse}
          >
            {enrollText}
            <p className="font-semibold text-sm">
              {user.Role === "Student" ? startLearningText : loginStudentText}
            </p>
          </button>
        </div>
      )}

      {/* Stats Section */}
      <div className="mb-6 text-sm text-gray-600">
        <span>
          <span className="font-bold">1,000+</span> {alreadyEnrolledText}
        </span>
      </div>

      {/* Info Cards */}
      <div
        id="about"
        ref={menuRef}
        className="flex bg-white space-x-15 py-5 mb-6 px-2 items-center justify-around rounded-xl shadow-lg border border-gray-200"
      >
        <div className="flex-[1.5] px-10 border-gray-100 border-r-2">
          <p className="text-black font-bold underline text-xl">
            {courseInfo.LessonCount} {lessonsText}
          </p>
          <p className="text-sm text-gray-500">
            {completeCurriculumText}
          </p>
        </div>
        <div className="flex-[0.7] px-10 border-gray-100 border-r-2">
          <p className="text-black font-semibold text-xl">
            4.7 <span className="text-blue-600">★</span>
          </p>
          <p className="text-sm text-gray-500">({courseInfo.ReviewCount} {reviewsText})</p>
        </div>
        <div className="flex-[1.3] px-10 border-gray-100 border-r-2">
          <p className="text-black font-semibold text-xl">{beginnerLevelText}</p>
          <p className="text-sm text-gray-500">{recommendedExperienceText}</p>
        </div>
        <div className="flex-1 px-10">
          <p className="text-black font-semibold text-xl">{courseInfo.Topic}</p>
          <p className="text-sm text-gray-500">{courseTopicText}</p>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">{courseContentText}</h2>

        {lessonsList.length > 0 ? (
          <div>
            <p className="text-gray-600 mb-4">
              {lessonsList.length} {lessonsText} • {lessonsList.reduce((acc, lesson) => acc + (lesson.Duration || 0), 0)} {minutesTotalLengthText}
            </p>
            <ul className="divide-y divide-gray-200">
              {lessonsList.map((lesson) => (
                <li key={lesson.LessonID} className="py-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      {lesson.LessonType === "Video" ? (
                        <VideoLibraryIcon color="primary" />
                      ) : (
                        <ArticleIcon color="secondary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{lesson.Title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <AccessTimeIcon fontSize="small" className="mr-1" />
                        <span>{lesson.Duration} {minutesText}</span>
                        <span className="mx-2">•</span>
                        <span>{complexityText}: {lesson.ComplexityLevel}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-sm text-gray-500">{lessonText} {lesson.Ordinal}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 italic">{noLessonsText} for this course yet.</p>
        )}
      </div>



      {/* Skills You Gain Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{skillsYouGainText}</h2>
        <div className="flex flex-wrap gap-2 max-w-[70%]">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {courseInfo.Topic}
          </span>
        </div>
      </div>


      {/* Instructor Section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">{instructorText}</h3>
        <div className="flex items-center mb-2">
          <Avatar alt={courseInfo.InstructorName} src="https://via.placeholder.com/40" />
          <div className="ml-2">
            <p className="text-gray-600">{courseInfo.InstructorName}</p>
            <p className="text-sm text-gray-500">{expertInstructorText}</p>
          </div>
        </div>
      </div>
      {/* Details to Know Section */}


      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{detailsToKnowText}</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <LinkedInIcon style={{ color: "#0156d1", marginRight: 4 }} />
            <span className="text-blue-600">{shareableCertificateText}</span>
            <span className="text-gray-600 ml-1">
              {addLinkedinText}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">{assessmentsText}</span>
            <span className="text-gray-600 ml-1">
              {lessonsList.length} {lessonsAvailableText}
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default CourseDetail;
