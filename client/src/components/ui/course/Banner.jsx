import React from 'react';

const Banner = () => {

    const url = "https://media.istockphoto.com/id/1500285927/vi/anh/c%C3%B4-g%C3%A1i-tr%E1%BA%BB-m%E1%BB%99t-sinh-vi%C3%AAn-%C4%91%E1%BA%A1i-h%E1%BB%8Dc-h%E1%BB%8Dc-tr%E1%BB%B1c-tuy%E1%BA%BFn.jpg?s=2048x2048&w=is&k=20&c=RudMbVZ_Uq1jz86Pzp_P8MUhjPxb8zOVepSRXl7YEqA="
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-4">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 ">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-500"></div>
            </div>

            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
                {/* Left Section: Text and Buttons */}
                <div className="md:max-w-xl mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        Learn without limits
                    </h1>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        Start, switch, or advance your career with more than 10,000 courses,
                        Professional Certificates, and degrees from world-class universities and companies.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                            Join for Free
                        </button>
                        <button className="border-2 border-blue-600 text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-300">
                            Try Courses for Business
                        </button>
                    </div>
                </div>

                {/* Right Section: Image */}
                <div className="w-full md:w-1/2 lg:w-5/12 flex justify-center items-center">
                    <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
                        <img
                            src={url}
                            alt="Online learning"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                            <span className="inline-block bg-blue-600 text-white px-3 py-1 text-sm font-semibold rounded-full mb-2 self-start">Featured</span>
                            <h3 className="text-white text-lg font-bold text-center">Transform your future</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;