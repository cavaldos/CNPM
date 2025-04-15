import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-4 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Coursera Column */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Coursera</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                What We Offer
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Leadership
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Catalog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Coursera Plus
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Professional Certificates
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                MasterTrack® Certificates
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Degrees
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                For Enterprise
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                For Government
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                For Campus
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Become a Partner
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Social Impact
              </a>
            </li>
          </ul>
        </div>

        {/* Community Column */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Community</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Learners
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Partners
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Beta Testers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                The Coursera Podcast
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Tech Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Teaching Center
              </a>
            </li>
          </ul>
        </div>

        {/* More Column */}
        <div>
          <h3 className="text-lg font-semibold mb-2">More</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Investors
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Help
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Accessibility
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Articles
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Directory
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Affiliates
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Modern Slavery Statement
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0156d1]">
                Manage Cookie Preferences
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile App Column */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Mobile App</h3>
          <div className="space-y-2">
            <a href="#" className="block">
              <img
                src="https://via.placeholder.com/120x40?text=App+Store" // Replace with actual App Store badge URL
                alt="Download on the App Store"
                className="w-28 h-auto"
              />
            </a>
            <a href="#" className="block">
              <img
                src="https://via.placeholder.com/120x40?text=Google+Play" // Replace with actual Google Play badge URL
                alt="Get it on Google Play"
                className="w-28 h-auto"
              />
            </a>
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-sm text-gray-600">Certified</span>
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">B</span>
              </div>
              <span className="text-sm text-gray-600">Corporation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto mt-6 flex justify-between items-center text-sm text-gray-500 border-t border-gray-200 pt-4">
        <span>© 2025 Coursera, Inc. All rights reserved.</span>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-[#0156d1]">
            <span>🇫🇧</span>
          </a>
          <a href="#" className="hover:text-[#0156d1]">
            <span>🇮🇳</span>
          </a>
          <a href="#" className="hover:text-[#0156d1]">
            <span>🇹🇼</span>
          </a>
          <a href="#" className="hover:text-[#0156d1]">
            <span>🇮🇩</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
