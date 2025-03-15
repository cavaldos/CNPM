import React from "react";
import { Avatar, Button } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ForumIcon from '@mui/icons-material/Forum';
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CourseDetail = () => {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const menuRef = useRef(null);

  // Mock course ID for demonstration
  const courseId = "1";

  useEffect(() => {
    const handleScroll = () => {
      if (menuRef.current) {
        const menuTop = menuRef.current.offsetTop;
        const scrollPosition = window.scrollY;

        // Khi scroll vượt qua vị trí ban đầu của menu
        if (scrollPosition >= menuTop) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGoToDiscussion = () => {
    navigate(`/discussion-forum/${courseId}`);
  };

  return (
    <div className=" max-w-6xl mx-auto py-6 px-4 bg-gray-50 min-h-screen relative">
      {/* Header Section */}
      <div className="block items-center mb-6 max-w-4xl">
        <img
          src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/c0/87a10033a311e892619b85c6fd62bb/IBM-200x48.png?auto=format%2Ccompress&dpr=2&h=45" // Replace with actual Rice University logo URL
          alt="IBM Logo"
          className="max-w-30 h-12 mb-8"
        />
        <div>
          <h1 className="text-5xl font-semibold text-gray-900 font-inter">
            IBM Back-End Development Professional Certificate
          </h1>
          <p className="fontsize-base text-gray-800">
            Prepare for a career as a back-end developer. Gain the in-demand
            skills and hands-on experience to get job-ready in less than 6
            months.
          </p>
          <div className="flex items-center space-x-2 mt-4 relative">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/7e/d0e9466807417d88aceb43a91c9774/John-Rofrano.jpg?auto=format%2Ccompress&dpr=2&w=75&h=75&fit=crop"
              alt=""
              className="w-8 h-8 rounded-full border-2 border-white z-0"
            />
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/37/77670911ef45c38688f2987b943f78/SN_200x200_V3.jpg?auto=format%2Ccompress&dpr=2&w=75&h=75&fit=crop"
              alt=""
              className="w-8 h-8 rounded-full absolute left-3 border-2 border-white"
            />
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/b2/0806f53b554dba90cb0ce4e6efa9d7/Abhishek-G.jpg?auto=format%2Ccompress&dpr=2&w=75&h=75&fit=crop"
              alt=""
              className="w-8 h-8 rounded-full relative z-10 border-2 border-white"
            />
            <p className="text-base ">
              Instructors:{" "}
              <a className="underline cursor-pointer hover:no-underline">
                {" "}
                John Rofrano
              </a>
              <span className="ml-2 font-semibold cursor-pointer hover:underline">
                +12 more
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {isEnrolled ? (
        <div className="flex space-x-4 mb-6">
          <button
            variant="contained"
            color="primary"
            className="normal-case bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4"
            onClick={() => setIsEnrolled(false)}
          >
            Go To Course
          </button>
          <Button
            variant="outlined"
            startIcon={<ForumIcon />}
            onClick={handleGoToDiscussion}
          >
            Diễn đàn thảo luận
          </Button>
          <span className="text-sm text-gray-600 self-center">Financial aid available</span>
        </div>
      ) : (
        <div className="flex space-x-4 mb-6 ">
          <button
            className="normal-case w-60 bg-blue-600 hover:bg-blue-700 font-semibold text-white rounded-md py-2 px-4"
            onClick={() => setIsEnrolled(true)}
          >
            Enroll for Free
            <p className="font-semibold text-sm">Starts Mar 5</p>
          </button>
          <span className="text-sm self-center text-gray-600">
            Financial aid available
          </span>
        </div>
      )}

      {/* Stats Section */}
      <div className=" mb-6 text-sm text-gray-600">
        <span>
          <span className="font-bold">23,846</span> already enrolled
        </span>
        <div className="flex space-x-2 mt-2">
          <span className="">Included with </span>
          <img
            src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/coursera_plus/landing_page/coursera-plus-blue.png?auto=format%2Ccompress&dpr=2&h=10"
            alt=""
            className=" w-100 h-3 self-center"
          />
          <a href="#" className="text-blue-600 underline">
            Learn more
          </a>
        </div>
      </div>

      {/* Info Cards */}
      <div
        id="about"
        className="flex bg-white space-x-15 py-5 mb-6 px-2 items-center justify-around rounded-xl shadow-lg border border-gray-200"
      >
        <div className="flex-[1.5] px-10 border-gray-100 border-r-2 ">
          <p className="text-black font-bold underline text-xl">
            11 course series
          </p>
          <p className="text-sm text-gray-500">
            Earn a career credential that demonstrates your expertise
          </p>
        </div>
        <div className="flex-[0.7]  px-10 border-gray-100 border-r-2 ">
          <p className="text-black font-semibold text-xl">
            4.7 <span className="text-blue-600">★</span>
          </p>
          <p className="text-sm text-gray-500">(487 reviews)</p>
        </div>
        <div className="flex-[1.3] px-10 border-gray-100 border-r-2 ">
          <p className="text-black font-semibold text-xl">Beginner level</p>
          <p className="text-sm text-gray-500">Recommended experience</p>
        </div>
        <div className=" flex-1 px-10 border-gray-100 border-r-2 ">
          <p className="text-black font-semibold text-xl">6 months </p>
          <p className="text-sm text-gray-500">at 10 hours a week</p>
        </div>
        <div className=" flex-1  px-10  ">
          <p className="text-black font-semibold text-xl">Flexible schedule</p>
          <p className="text-sm text-gray-500">Learn at your own pace</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div ref={menuRef} className="mb-6">
        <nav
          className={`w-full p-4 text-gray-800 bg-gray-100  font-semibold border-b-2 border-gray-200 space-x-10 transition-all duration-300 ${isSticky
              ? "fixed top-[120px] z-40 left-0 w-full shadow-lg"
              : "bg-inherit"
            }`}
        >
          <div className="flex justify-left ml-10 gap-6">
            <a className="" href="#about">
              About
            </a>
            <a className="" href="#outcomes">
              Outcomes
            </a>
            <a className="" href="#courses">
              Courses
            </a>
            <a className="" href="#testimonials">
              Testimonials
            </a>
          </div>
        </nav>
      </div>

      {/* What You'll Learn Section */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <li className="">
            <div className="flex space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"
                ></path>
              </svg>
              <p>
                Master the most up-to-date practical skills and knowledge that
                back-end developers use in their daily roles academic English
                language skills to communicate effectively in spoken and written
                contexts
              </p>
            </div>
          </li>
          <li className="">
            <div className="flex  space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"
                ></path>
              </svg>
              <p>
                Learn to deploy and scale applications using methodologies and
                tools, Docker, Kubernetes, microservices, and serverless
                functions
              </p>
            </div>
          </li>
          <li>
            <div className="flex  space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"
                ></path>
              </svg>
              <p>
                Write back-end applications with object-oriented programming
                languages including server-side Python while using version
                control and package managers
              </p>
            </div>
          </li>
          <li>
            <div className="flex  space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"
                ></path>
              </svg>
              <p>
                Master the most up-to-date practical skills and knowledge that
                back-end developers use in their daily roles academic English
                language skills to communicate effectively in spoken and written
                contexts
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Skill You Gain Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Skills you gain</h2>
        <div className="flex space-x-4 max-w-[70%]">span</div>
      </div>
      {/* Details to Know Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Details to know</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <LinkedInIcon style={{ color: "#0156d1", marginRight: 4 }} />
            <span className="text-blue-600">Shareable certificate</span>
            <span className="text-gray-600 ml-1">
              Add to your LinkedIn profile
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">Assessments</span>
            <span className="text-gray-600 ml-1">21 assignments</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">Taught in English</span>
            <span className="text-gray-600 ml-1">24 languages available</span>
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow border border-gray-200">
        <p className="text-gray-700 mb-2">
          See how employees at top companies are mastering in-demand skills
        </p>
        <a href="#" className="text-blue-600 underline">
          Learn more about Coursera for Business
        </a>
        <div className="flex space-x-4 mt-2">
          <img
            src="https://via.placeholder.com/50x30?text=Petrobras"
            alt="Petrobras"
            className="h-6"
          />
          <img
            src="https://via.placeholder.com/50x30?text=TATA"
            alt="TATA"
            className="h-6"
          />
          <img
            src="https://via.placeholder.com/50x30?text=Danone"
            alt="Danone"
            className="h-6"
          />
          <img
            src="https://via.placeholder.com/50x30?text=Capgemini"
            alt="Capgemini"
            className="h-6"
          />
          <img
            src="https://via.placeholder.com/50x30?text=P&G"
            alt="P&G"
            className="h-6"
          />
          <img
            src="https://via.placeholder.com/50x30?text=L'Oréal"
            alt="L'Oréal"
            className="h-6"
          />
        </div>
      </div>

      {/* Earn a Certificate Section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow border border-gray-200">
        <h2 className="text-lg font-semibold mb-2">
          Earn a career certificate
        </h2>
        <p className="text-gray-600 mb-2">
          Add this credential to your LinkedIn profile, resume, or CV
        </p>
        <p className="text-gray-600">
          Share it on social media and in your performance review
        </p>
      </div>

      {/* Course Modules and Instructors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">
            There are 4 modules in this course
          </h3>
          <p className="text-gray-600 mb-2">
            The English and Academic Preparation - Pre-Collegiate non-credit
            course is for students with a (minimum) high-intermediate level of
            English. This certificate course is designed to help domestic and
            international students develop the academic skills necessary for
            success in undergraduate studies at an American university while
            strengthening their English proficiency.
          </p>
          <a href="#" className="text-blue-600 underline">
            Read more
          </a>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center">
              <span className="text-gray-600">
                Listening, Speaking and Critical Thinking
              </span>
              <span className="text-gray-500 ml-2">
                Module 1 - 6 hours to complete
              </span>
              <ExpandMoreIcon style={{ color: "#0156d1", marginLeft: 4 }} />
            </li>
            <li className="flex items-center">
              <span className="text-gray-600">Writer's Workshop</span>
              <span className="text-gray-500 ml-2">
                Module 2 - 6 hours to complete
              </span>
              <ExpandMoreIcon style={{ color: "#0156d1", marginLeft: 4 }} />
            </li>
            <li className="flex items-center">
              <span className="text-gray-600">Reading and Note Taking</span>
              <span className="text-gray-500 ml-2">
                Module 3 - 8 hours to complete
              </span>
              <ExpandMoreIcon style={{ color: "#0156d1", marginLeft: 4 }} />
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Instructors</h3>
          <div className="flex items-center mb-2">
            <Avatar alt="Alice Ilano" src="https://via.placeholder.com/40" />
            <div className="ml-2">
              <p className="text-gray-600">Alice Ilano</p>
              <p className="text-sm text-gray-500">Rice University</p>
              <p className="text-sm text-gray-500">
                5 Courses • 167,272 learners
              </p>
            </div>
          </div>
          <a href="#" className="text-blue-600 underline">
            View all 2 instructors
          </a>
          <div className="mt-4">
            <p className="text-gray-600">Offered by</p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Rice_University_Shield.png"
              alt="Rice University"
              className="w-16 h-16 mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
