import React from "react";
import { useLocation } from "react-router-dom";
import HeaderStudent from "./HeaderStudent";
import FooterStudent from "../../ui/utilize/Footer";
import ChatAI from "./ChatAI";

const StudentLayout = ({ children }) => {
  const location = useLocation();
  const isLearningPage =
    location.pathname.includes("/learning") ||
    location.pathname.includes("/careers");
 
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed w-full h-[120px] z-50">
        <HeaderStudent />
      </header>
      <main className="flex-1 mt-[120px] pt-2 pb-4">{children}</main>
      {!isLearningPage && (
        <footer className="w-full">
          <FooterStudent />
        </footer>
      )}
      
      {/* ChatAI component that appears in the bottom right corner */}
    
      <ChatAI />
    </div>
  );
};

export default StudentLayout;
