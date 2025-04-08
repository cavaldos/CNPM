import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useNavigate, useLocation } from "react-router-dom";
import AdminRouter from "../../../routes/Admin";
import Bread from "../../ui/utilize/Breadcrum";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../redux/features/authSlice";

const NavbarItem = ({ name, togglemenu, icon, path }) => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <button
      onClick={() => handleClick(path)}
      className="p-2 rounded hover:bg-gray-200 w-full text-left flex gap-2 transition-all"
    >
      {icon}
      {togglemenu ? (
        <h3 className="truncate overflow-hidden whitespace-nowrap text-ellipsis">
          {name}
        </h3>
      ) : (
        <h3></h3>
      )}
    </button>
  );
};

const Sidebar = ({ togglemenu }) => {
  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-300 bg-white  ${togglemenu ? "w-64" : "w-20"
        }`}
    >
      <nav className="p-5 overflow-y-auto h-full">
        {AdminRouter.map((item, index) => (
          <NavbarItem
            name={item.name}
            togglemenu={togglemenu}
            key={index}
            path={item.path}
            icon={item.icon}
          />
        ))}
      </nav>
    </div>
  );
};

const AdminAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        <a href="#" className="text-gray-600">
          English
        </a>
        <a href="#" className="text-gray-600">
          Admin
        </a>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const Header = ({ togglemenu, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white shadow z-50 h-16">
      <div className="flex items-center">
        <button className="text-gray-700 mr-4" onClick={toggleSidebar}>
          {togglemenu ? (
            <MenuIcon className="text-2xl" />
          ) : (
            <MenuOpenIcon className="text-2xl" />
          )}
        </button>
        <div className="flex">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Bread className="pt-1" />
        </div>
      </div>
      <div className="flex items-center space-x-4 mr-4">
        <AdminAccount />
      </div>
    </div>
  );
};

const AdminLayout = ({ children }) => {
  const [togglemenu, setTogglemenu] = useState(true);
  const toggleSidebar = () => setTogglemenu(!togglemenu);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header togglemenu={togglemenu} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16">
        <Sidebar togglemenu={togglemenu} />
        <main
          className={`flex-1 p-6 transition-all duration-300 ${togglemenu ? "ml-64" : "ml-20"
            }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;