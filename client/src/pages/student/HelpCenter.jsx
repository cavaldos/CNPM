import React from 'react';
import { Icon } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PolicyIcon from '@mui/icons-material/Policy';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import StarIcon from '@mui/icons-material/Star';
import BookIcon from '@mui/icons-material/Book';
import { Input } from '@mui/material'; // For the search input

const HelpCenterPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      {/* <div className="bg-[#0156d1] h-[420px] text-white p-4 flex f items-center justify-between">
    
                <div className="text-xl font-semibold">coursera</div>

     
                <div className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-semibold">
                    Learner Help Center
                </div>

                <div className="flex items-center space-x-4">
                    <Input
                        placeholder="Search for help"
                        className="bg-white rounded px-2 py-1 w-64 text-black"
                        disableUnderline
                        inputProps={{ style: { padding: 8 } }}
                    />
                    <div className="text-sm text-gray-300">User1740755...</div>
                    <div className="text-gray-300">🔔</div>
                </div>
            </div> */}
      <div className="bg-blue-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Learner Help Center</h1>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for help"
              className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>
      {/* Category Cards Section */}
      <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Account & Notifications */}
        <div className="bg-white border border-gray-200 rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
          <Icon component={AccountCircleIcon} style={{ fontSize: 40, color: '#0156d1' }} />
          <h3 className="text-lg font-medium mt-2">Account & notifications</h3>
          <p className="text-sm text-gray-600 mt-1">
            Account settings, login issues, and notification preferences
          </p>
        </div>

        {/* Payments & Subscriptions */}
        <div className="bg-white border border-gray-200 rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
          <Icon component={PaymentIcon} style={{ fontSize: 40, color: '#0156d1' }} />
          <h3 className="text-lg font-medium mt-2">Payments & subscriptions</h3>
          <p className="text-sm text-gray-600 mt-1">
            Help with payments, subscription options, and Financial Aid
          </p>
        </div>

        {/* Enrollment */}
        <div className="bg-white border border-gray-200 rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
          <Icon component={SchoolIcon} style={{ fontSize: 40, color: '#0156d1' }} />
          <h3 className="text-lg font-medium mt-2">Enrollment</h3>
          <p className="text-sm text-gray-600 mt-1">
            Find courses to take and learn about enrollment options
          </p>
        </div>

        {/* Grades & Assignments */}
        <div className="bg-white border border-gray-200 rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
          <Icon component={AssignmentIcon} style={{ fontSize: 40, color: '#0156d1' }} />
          <h3 className="text-lg font-medium mt-2">Grades & assignments</h3>
          <p className="text-sm text-gray-600 mt-1">Grades, peer reviews, assignments, and Labs</p>
        </div>

        {/* Certificates & Verification */}
        <div className="bg-white border border-gray-200 rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
          <Icon component={VerifiedUserIcon} style={{ fontSize: 40, color: '#0156d1' }} />
          <h3 className="text-lg font-medium mt-2">Certificates & verification</h3>
          <p className="text-sm text-gray-600 mt-1">How to get and share a Course Certificate</p>
        </div>

        {/* Coursera Policies */}
        <div className="bg-white border border-gray-200 rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
          <Icon component={PolicyIcon} style={{ fontSize: 40, color: '#0156d1' }} />
          <h3 className="text-lg font-medium mt-2">Coursera policies</h3>
          <p className="text-sm text-gray-600 mt-1">Learn about our policies and program terms</p>
        </div>

        {/* Course Content */}
        <div className="bg-white border border-gray-200 rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
          <Icon component={VideoLibraryIcon} style={{ fontSize: 40, color: '#0156d1' }} />
          <h3 className="text-lg font-medium mt-2">Course content</h3>
          <p className="text-sm text-gray-600 mt-1">
            Videos, discussion forums, and common course issues
          </p>
        </div>

        {/* Specializations */}
        <div className="bg-white border border-gray-200 rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
          <Icon component={StarIcon} style={{ fontSize: 40, color: '#0156d1' }} />
          <h3 className="text-lg font-medium mt-2">Specializations</h3>
          <p className="text-sm text-gray-600 mt-1">
            Help with Specializations and Capstone Projects
          </p>
        </div>
      </div>

      {/* Popular Articles Section */}
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium flex items-center">
              <StarIcon style={{ fontSize: 24, color: '#0156d1', marginRight: 8 }} />
              Popular articles
            </h3>
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              <li>Verify your ID</li>
              <li>Apply for financial aid</li>
              <li>Coursera Honor Code</li>
            </ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium flex items-center">
              <BookIcon style={{ fontSize: 24, color: '#0156d1', marginRight: 8 }} />
              More help
            </h3>
            <ul className="mt-2 text-sm text-blue-600 list-disc list-inside">
              <li>Get a Course Certificate</li>
              <li>Cancel a subscription</li>
              <li>Payments on Coursera</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
