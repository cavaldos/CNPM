import React from 'react';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';

const InstructorProfile = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Trang đang trong quá trình phát triển
        </h1>

        <div className="flex flex-col items-center justify-center py-10">
          <div className="text-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="mt-4 text-xl text-gray-700">Chúng tôi đang hoàn thiện trang này</p>
            <p className="mt-2 text-gray-500">Vui lòng quay lại sau</p>
          </div>

          <div className="w-full max-w-md p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-center">Thông tin liên hệ</h2>
            <p className="text-gray-700 text-center">
              Email: support@example.com
              <br />
              Điện thoại: -------
              <br />
              Giờ làm việc: 9:00 - 17:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
