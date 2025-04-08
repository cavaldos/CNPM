import React from 'react'
import { MenuIcon, BellIcon, SearchIcon, UserIcon } from 'lucide-react'
import { useSelector } from 'react-redux'

const Header = ({ onMenuClick }) => {
    const user = useSelector((state) => state.auth)

    const handleLogout = () => {
    }

    return (
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Menu button (mobile) */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={onMenuClick}
                        >
                            <MenuIcon className="h-6 w-6" />
                        </button>
                    </div>
                    {/* Center: Search */}
                    <div className="flex-1 max-w-md mx-4 lg:mx-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg bg-gray-100/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Tìm kiếm khóa học..."
                            />
                        </div>
                    </div>
                    {/* Right: Actions */}
                    <div className="flex items-center">
                        <button className="p-2 text-gray-500 rounded-full hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
                            <BellIcon className="h-6 w-6" />
                        </button>
                        <div className="ml-3 relative">
                            <button
                                onClick={handleLogout}
                                className="flex items-center hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                            >
                                {user.ImageURL ? (
                                    <img
                                        src={user.ImageURL}
                                        alt={user.FullName}
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                        <UserIcon className="h-5 w-5" />
                                    </div>
                                )}
                                <div className="ml-2 hidden md:block">
                                    <div className="text-sm font-medium text-gray-900">{user.FullName}</div>
                                    <div className="text-xs text-gray-500">{user.Email}</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header
