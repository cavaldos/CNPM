import React from "react";
import { Link } from "react-router-dom";
import CourseCard from "../../components/course/CourseCard";
const GuestPage = () => {
  return (
    <div className="min-h-screen bg-white">


      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Learn without limits
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Start, switch, or advance your career with more than 10,000 courses,
            Professional Certificates, and degrees from world-class universities
            and companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="#"
              className="bg-[#2a5bd7] text-white px-8 py-3 rounded-full text-center hover:bg-blue-700 transition-colors"
            >
              Join for Free
            </Link>
            <Link
              to="#"
              className="border-2 border-[#2a5bd7] text-[#2a5bd7] px-8 py-3 rounded-full text-center hover:bg-blue-50 transition-colors"
            >
              Try Coursera for Business
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://via.placeholder.com/550x400"
            alt="Learning illustration"
            className="rounded-lg shadow-xl"
          />
        </div>
        dsf
      </section>
      <CourseCard />
    </div>
  );
};

export default GuestPage;