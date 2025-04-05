import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";
import Search from "./Search";
import AuthModal from './AuthModal';

const Navbar = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const handleSearchClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Search icon clicked");
    setIsSearchOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <>
      <div className="flex justify-between z-20 items-center max-sm:pt-5 sm:pt-8 absolute w-full   sm:px-[50px]  max-sm:px-[20px]">
        <div className="flex items-center gap-2">
          <img
            className="sm:w-[90px] max-sm:w-[50px]"
            src="/static/images/logo.svg"
            alt="main-logo"
          />
          <img
            className="sm:w-[100px] max-sm:w-[70px]"
            src="/static/images/StreamVibe.svg"
            alt="logo"
          />
        </div>
        <nav
          className={clsx({
            "border-[#363636] ": location.pathname === "/moviesXshows",
            "flex bg-[#0F0F0F] px-[50px] mr-[120px] max-lg:hidden gap-3 border-[4px] border-[#1F1F1F]  py-[10px] rounded-xl items-center": true,
          })}
        >
          <Link
            to="/"
            className={clsx({
              "py-4 px-5 bg-[#1A1A1A] rounded-lg": location.pathname === "/",
            })}
          >
            Home
          </Link>
          <Link
            to="/moviesXshows"
            className={clsx({
              "py-4 px-5 bg-[#1A1A1A] rounded-lg":
                location.pathname === "/moviesXshows",
            })}
          >
            MoviesXShows
          </Link>
          <Link
            to="/support"
            className={clsx({
              "py-4 px-5 bg-[#1A1A1A] rounded-lg":
                location.pathname === "/support",
            })}
          >
            Support
          </Link>
          <Link
            to="/subscriptions"
            className={clsx({
              "py-4 px-5 bg-[#1A1A1A] rounded-lg":
                location.pathname === "/subscriptions",
            })}
          >
            Subscriptions
          </Link>
        </nav>

        <div className="max-lg:hidden flex items-center gap-3">
          <button
            onClick={handleSearchClick}
            className="p-2 hover:bg-[#e43838] rounded-lg transition-colors"
            aria-label="Search"
          >
            <img
              src="/static/images/search.svg"
              alt="search icon"
              className="w-6 h-6"
            />
          </button>
          <span>
            <img
              src="/static/images/notification.svg"
              alt="notification icon"
              className="p-2 hover:bg-[#e43838] rounded-lg transition-colors"
            />
          </span>
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 hover:text-gray-300">
                <img
                  src="/default-avatar.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block">
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
        <div className="lg:hidden  max-sm:px-[10px] max-sm:py-[20px] max-lg:px-[20px] max-lg:py-[25px] rounded-xl">
          <span className="">
            <img
              src="/static/images/menu.svg"
              alt="menu icon"
              className="p-2 hover:bg-[#e43838] rounded-lg transition-colors"
            />
          </span>
        </div>
      </div>
      <Search
        isOpen={isSearchOpen}
        onClose={() => {
          console.log("Closing search modal");
          setIsSearchOpen(false);
        }}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar;
