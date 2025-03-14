import React, { useState } from 'react';
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';

const InstructorProfile = () => {
    const [profileImage, setProfileImage] = useState('/placeholder-profile.jpg');
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        country: 'United States',
        timeZone: 'Eastern Time (ET)',
        receiveWeeklyRecommendations: false,
        getNotificationsAboutCourses: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Saving profile data:', formData);
        // Show success message or handle errors
        alert('Profile updated successfully!');
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

                <form onSubmit={handleSaveChanges}>
                    {/* Profile Information Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

                        <div className="flex items-center mb-6">
                            <div className="relative">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/80';
                                    }}
                                />
                                <input
                                    type="file"
                                    id="photo-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                />
                            </div>
                            <label
                                htmlFor="photo-upload"
                                className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer transition duration-200"
                            >
                                Change Photo
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Location</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                    Country
                                </label>
                                <div className="relative">
                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                    >
                                        <option value="United States">United States</option>
                                        <option value="Canada">Canada</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Germany">Germany</option>
                                        <option value="France">France</option>
                                        <option value="Japan">Japan</option>
                                        <option value="China">China</option>
                                        <option value="India">India</option>
                                        <option value="Brazil">Brazil</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <KeyboardArrowDownIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Time Zone
                                </label>
                                <div className="relative">
                                    <select
                                        id="timeZone"
                                        name="timeZone"
                                        value={formData.timeZone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                    >
                                        <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                                        <option value="Central Time (CT)">Central Time (CT)</option>
                                        <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                                        <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                                        <option value="Alaska Time (AKT)">Alaska Time (AKT)</option>
                                        <option value="Hawaii-Aleutian Time (HAT)">Hawaii-Aleutian Time (HAT)</option>
                                        <option value="Greenwich Mean Time (GMT)">Greenwich Mean Time (GMT)</option>
                                        <option value="Central European Time (CET)">Central European Time (CET)</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <KeyboardArrowDownIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Learning Preferences Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Learning Preferences</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="receiveWeeklyRecommendations"
                                    name="receiveWeeklyRecommendations"
                                    checked={formData.receiveWeeklyRecommendations}
                                    onChange={handleCheckboxChange}
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="receiveWeeklyRecommendations" className="ml-2 block text-sm text-gray-700">
                                    Receive weekly learning recommendations
                                </label>
                            </div>
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="getNotificationsAboutCourses"
                                    name="getNotificationsAboutCourses"
                                    checked={formData.getNotificationsAboutCourses}
                                    onChange={handleCheckboxChange}
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="getNotificationsAboutCourses" className="ml-2 block text-sm text-gray-700">
                                    Get notifications about new courses in my interests
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-medium transition duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InstructorProfile;