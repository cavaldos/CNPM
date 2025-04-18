import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../../ui/course/SearchBar';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoginComponent from '../../auth/firebase/LoginModal';
import PickLanguage from '../PickLanguage';
import LanguageSwitcher from '../../../hooks/LanguageSwitcher';

const AccountControll = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center gap-6">
      {/* Navigation Links similar to Coursera's "Online Degrees" and "Careers" */}
      <a href="/online-degrees" className="text-[#4B5EAA] text-base font-medium hover:underline">
        {LanguageSwitcher('Online Degrees')}
      </a>
      <a href="/careers" className="text-[#4B5EAA] text-base font-medium hover:underline">
        {LanguageSwitcher('Careers')}
      </a>

      <PickLanguage />
      <LoginComponent />
      <button
        onClick={handleRegister}
        className="bg-[#0056D2] text-white font-semibold py-1.5 px-4 rounded hover:bg-[#003087] transition-colors"
      >
        {LanguageSwitcher('Join for Free')}
      </button>
    </div>
  );
};

const HeaderGuest = () => {
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
              {LanguageSwitcher('coursera')}
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
    </div>
  );
};

export default HeaderGuest;
