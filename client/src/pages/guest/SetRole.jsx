import React, { useState } from 'react';
import { BookOpenIcon, GraduationCapIcon, CheckCircleIcon, ChevronRightIcon } from 'lucide-react';
import LoginService from '../../components/auth/LoginService';
import { useNavigate } from 'react-router-dom';
function SetRole() {
  const { selectedRole, setSelectedRole, loginServer } = LoginService();

  const navigate = useNavigate();
  const handleRoleSelect = role => {
    setSelectedRole(role);
  };
  const handleContinue = async () => {
    await loginServer();
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${selectedRole === 'Student' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => handleRoleSelect('Student')}
            >
              <div className="flex items-center justify-between">
                <div className="bg-blue-100 p-3 rounded-full">
                  <GraduationCapIcon size={32} className="text-blue-600" />
                </div>
                {selectedRole === 'student' && (
                  <CheckCircleIcon className="text-blue-500" size={24} />
                )}
              </div>
              <h2 className="text-xl font-semibold mt-4">Student</h2>
              <p className="text-gray-600 mt-2">
                Register for courses, track your progress and participate in online lessons.
              </p>
            </div>
            <div
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${selectedRole === 'Instructor' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => handleRoleSelect('Instructor')}
            >
              <div className="flex items-center justify-between">
                <div className="bg-blue-100 p-3 rounded-full">
                  <BookOpenIcon size={32} className="text-blue-600" />
                </div>
                {selectedRole === 'instructor' && (
                  <CheckCircleIcon className="text-blue-500" size={24} />
                )}
              </div>
              <h2 className="text-xl font-semibold mt-4">Instructor</h2>
              <p className="text-gray-600 mt-2">
                Create and manage courses, track student progress and interact with them.
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`flex items-center px-6 py-2 rounded-md font-medium ${selectedRole ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Continue
              <ChevronRightIcon size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetRole;
