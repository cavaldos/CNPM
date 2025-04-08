import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    HelpCircleIcon,
    LogOutIcon,
    XIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from 'lucide-react'
import InstructorRouter from '../../../routes/Instructor'
import LoginService from '../../auth/LoginService'
import { useDispatch } from 'react-redux'
import {clearUser} from '../../../redux/features/authSlice'
import { useNavigate } from 'react-router-dom'
const Sidebar = ({ isOpen, setIsOpen }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const sidebarRoutes = InstructorRouter.filter(route => route.key === "sidebar");
    const navItems = [...sidebarRoutes];
    const { signOutGoogle } = LoginService();
    const dispatch = useDispatch();
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleSignOut = async () => {
        await signOutGoogle();
        dispatch(clearUser());
        setIsOpen(false);
        navigate('/');
    };

    const handleOverlayClick = () => {
        setIsOpen(false);
    }
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}
            {/* Sidebar */}
            <div
                className={`
        fixed inset-y-0 left-0 z-30 transform bg-gradient-to-b from-gray-800 to-gray-900
        text-white transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${collapsed ? 'lg:w-20' : 'w-64'}
      `}
            >
                <div className="flex h-full flex-col overflow-y-auto">
                    {/* Header */}
                    <div className="flex h-16 items-center justify-between px-6 backdrop-blur-sm bg-gray-800/90 sticky top-0 transition-all duration-300">
                        <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''} transition-all duration-300`}>
                            {/* <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center transition-all duration-300">
                                I
                            </div> */}
                            {!collapsed && <span className="ml-3 text-xl font-bold transition-opacity duration-300">Giảng Viên</span>}
                        </div>
                        <div className="flex items-center">
                            {/* Toggle collapse button - visible only on large screens */}
                            <button
                                onClick={toggleCollapsed}
                                className="hidden lg:block text-white hover:bg-blue-600/50 p-1 rounded-md transition-all duration-200"
                            >
                                {collapsed ? <ChevronRightIcon className="h-5 w-5 transition-transform duration-300" /> : <ChevronLeftIcon className="h-5 w-5 transition-transform duration-300" />}
                            </button>
                            {/* Close button - visible only on mobile */}
                            {!collapsed && (
                                <button onClick={() => setIsOpen(false)} className="lg:hidden ml-2 transition-opacity duration-300">
                                    <XIcon className="h-6 w-6" />
                                </button>
                            )}
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className={`flex-1 ${collapsed ? 'px-2' : 'px-3'} py-4 transition-all duration-300`}>
                        <ul className="space-y-1">
                            {navItems.map((item, index) => {
                                // Check if current path matches this item's path
                                const isActive = location.pathname === item.path;

                                return (
                                    <li key={item.name} className="transition-all duration-300">
                                        <Link
                                            to={item.path}
                                            className={`
                          flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-2 rounded-lg text-sm font-medium
                          ${isActive ? 'bg-blue-600 text-white' : 'text-blue-100 hover:bg-blue-600/50'}
                          transition-all duration-300
                        `}
                                            title={collapsed ? item.name : ''}
                                        >
                                            <item.icon className={`${collapsed ? '' : 'mr-3'} h-5 w-5 transition-all duration-300`} />
                                            {!collapsed && <span className="transition-opacity duration-300">{item.name}</span>}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    {/* Footer */}
                    <div className={`${collapsed ? 'px-2' : 'px-3'} py-4 border-t border-blue-600/50 transition-all duration-300`}>
                        <ul className="space-y-1">
                            <li className="transition-all duration-300">
                                <a
                                    href="#"
                                    className={`flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-2 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-600/50 transition-all duration-300`}
                                    title={collapsed ? 'Trợ giúp' : ''}
                                >
                                    <HelpCircleIcon className={`${collapsed ? '' : 'mr-3'} h-5 w-5 transition-all duration-300`} />
                                    {!collapsed && <span className="transition-opacity duration-300">Trợ giúp</span>}
                                </a>
                            </li>
                            <li className="transition-all duration-300">
                                <a
                                    href="#"
                                    className={`flex items-center ${collapsed ? 'justify-center' : ''} px-3 py-2 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-600/50 transition-all duration-300`}
                                    title={collapsed ? 'Đăng xuất' : ''}
                                >
                                    <LogOutIcon className={`${collapsed ? '' : 'mr-3'} h-5 w-5 transition-all duration-300`} />
                                    {!collapsed && <span
                                        onClick={handleSignOut}

                                        className="transition-opacity duration-300">Log Out</span>}
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
