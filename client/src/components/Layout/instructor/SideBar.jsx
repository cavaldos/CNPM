import React from 'react'
import { Link } from 'react-router-dom'
import {
    HelpCircleIcon,
    LogOutIcon,
    XIcon,
} from 'lucide-react'
import InstructorRouter from '../../../routes/Instructor'

const Sidebar = ({ isOpen, setIsOpen }) => {
    // Filter routes that should appear in the sidebar
    const sidebarRoutes = InstructorRouter.filter(route => route.key === "sidebar");



    const navItems = [...sidebarRoutes];

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
            {/* Sidebar */}
            <div
                className={`
        fixed inset-y-0 left-0 z-30 w-64 transform bg-gradient-to-b from-gray-800 to-gray-900
        text-white transition duration-300 lg:translate-x-0 lg:static lg:inset-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
            >
                <div className="flex h-full flex-col overflow-y-auto">
                    {/* Header */}
                    <div className="flex h-16 items-center justify-between px-6 backdrop-blur-sm bg-gray-800/90 sticky top-0">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                           I
                            </div>
                            <span className="ml-3 text-xl font-bold">CourseAdmin</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="lg:hidden">
                            <XIcon className="h-6 w-6" />
                        </button>
                    </div>
                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-4">
                        <ul className="space-y-1">
                            {navItems.map((item, index) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className={`
                      flex items-center px-3 py-2 rounded-lg text-sm font-medium
                      ${index === 0 ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-600/50'}
                    `}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}

       
                        </ul>
                    </nav>
                    {/* Footer */}
                    <div className="px-3 py-4 border-t border-blue-600/50">
                        <ul className="space-y-1">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-600/50"
                                >
                                    <HelpCircleIcon className="mr-3 h-5 w-5" />
                                    <span>Trợ giúp</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-600/50"
                                >
                                    <LogOutIcon className="mr-3 h-5 w-5" />
                                    <span>Đăng xuất</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Sidebar
