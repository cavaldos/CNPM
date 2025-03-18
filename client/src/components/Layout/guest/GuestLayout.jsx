import React from "react";
import { useLocation } from "react-router-dom";
import HeaderGuest from "./HeaderGuest";
import Footer from "../../ui/utilize/Footer";
// import ChatAI from "./ChatAI";

const GuestLayout = ({ children }) => {
  const location = useLocation();
  const isLearningPage =
    location.pathname.includes("/learning") ||
    location.pathname.includes("/careers");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed w-full h-[120px] z-50">
        <HeaderGuest />
      </header>
      <main className="flex-1 mt-[60px] pt-2 pb-4">
        {children}
      </main>
      {!isLearningPage && (
        <footer className="w-full">
          <Footer />
        </footer>
      )}

      {/* ChatAI component that appears in the bottom right corner */}
      {/* <ChatAI /> */}
    </div>
  );
};
export default GuestLayout;