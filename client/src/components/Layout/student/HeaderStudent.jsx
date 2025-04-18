import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../../ui/course/SearchBar';
import AccountControll from './AccountControll';
import StudentRouter from '../../../routes/Student';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageSwitcher from '../../../hooks/LanguageSwitcher';

// Navigation button component
const NavButton = ({ name, path }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  const isActive = location.pathname === path;
  if (name === null) {
    return <></>;
  }
  return (
    <button
      onClick={handleClick}
      className={`py-1 px-1 ease-in-out ${
        isActive
          ? 'text-[#0156d1] border-b-4 border-[#0156d1] font-semibold '
          : 'text-gray-600 font-medium hover:text-[#3e78c9]'
      }`}
    >
      {LanguageSwitcher(name)}
    </button>
  );
};

const HeaderStudent = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full px-[65px] bg-white border-gray-200 border-b border-[1px]">
      <div className=" px-[48px]">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center ">
          <div className="flex items-center gap-5">
            <h1
              className="text-3xl font-semibold text-[#0156d1] hover:cursor-pointer"
              onClick={() => navigate('/')}
            >
              coursera
            </h1>
            <Button className="" variant="outlined">
              {LanguageSwitcher('Explore')}
              <KeyboardArrowDownIcon className="ml-2" />
            </Button>
          </div>
          <SearchBar />
          <AccountControll />
        </div>
      </div>

      <div className="bg-white px-[48px] ">
        <div className="container mx-auto px-6 py-2 flex space-x-6">
          {StudentRouter.filter(item => item.key === 'header').map((item, index) => (
            <NavButton key={index} name={item.name} path={item.path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderStudent;
