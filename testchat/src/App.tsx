import React from "react";

const CourseraClone = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <img
              src="https://www.coursera.org/static/light-logo-9d66d3d7d3a91d8d38c9753a5545c9a2.svg"
              alt="Coursera"
              className="h-8"
            />
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                For Individuals
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                For Businesses
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                For Universities
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                For Governments
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              Log In
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
              Join for Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            What do you want to learn?
          </h1>
          <div className="max-w-2xl mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Search for courses"
              className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
              Browse
            </button>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="bg-blue-50 p-6 rounded-lg text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            New year. Big goals. Bigger savings.
          </h2>
          <p className="text-blue-700">
            Unlock a year of unlimited access to learning with 65% off Coursera
            Plus.
          </p>
        </div>

        {/* Course Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Course Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                  DevOps on AWS Specialization
                </h3>
                <span className="text-gray-500">42,371 already enrolled</span>
              </div>

              <p className="text-gray-600 mb-4">
                Launch your career in DevOps. Master DevOps methodologies and
                AWS services to deliver faster and more reliable updates to your
                customers
              </p>

              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="w-1/3 h-full bg-blue-600 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Beginner Friendly
                </div>
              </div>

              <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full md:w-auto">
                Try for Free: Enroll to start your 7-day full access free trial
              </button>
            </div>

            {/* Course Details */}
            <div className="md:w-64 space-y-4">
              <div className="border-t md:border-t-0 pt-4 md:pt-0">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Rating</div>
                    <div className="text-blue-600 font-bold">4.7+ ★</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Level</div>
                    <div className="text-blue-600 font-bold">Intermediate</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div className="text-blue-600 font-bold">1 month</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Schedule</div>
                    <div className="text-blue-600 font-bold">Flexible</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseraClone;
