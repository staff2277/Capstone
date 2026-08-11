import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useState, useEffect } from "react";
import Search from "./Search";
import AuthModal from "./AuthModal";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSearchClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Search icon clicked");
    setIsMobileMenuOpen(false);
    setIsSearchOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      setIsMobileMenuOpen(false);
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/moviesXshows", label: "MoviesXShows" },
    { to: "/support", label: "Support" },
    { to: "/subscriptions", label: "Subscriptions" },
  ];

  return (
    <>
      <div className="flex justify-between z-20 items-center max-sm:pt-5 sm:pt-8 absolute w-full sm:px-[50px] max-sm:px-[20px]">
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
            "flex bg-[#0F0F0F] px-[50px] mr-[120px] max-lg:hidden gap-3 border-[4px] border-[#1F1F1F] py-[10px] rounded-xl items-center": true,
          })}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={clsx({
                "py-4 px-5 bg-[#1A1A1A] rounded-lg":
                  location.pathname === link.to,
              })}
            >
              {link.label}
            </Link>
          ))}
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
            <div className="relative group py-5">
              <button className="flex items-center rounded-lg space-x-2 hover:text-gray-300">
                <img
                  src="/static/images/profile.svg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              <div className="absolute right-[0] top-[-5] mt-2 w-48 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block">
                <div className="">
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-lg text-left px-6 py-4 text-sm text-white hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-red-400"
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger menu button — visible on smaller screens */}
        <button
          className="lg:hidden max-sm:px-[10px] max-sm:py-[20px] max-lg:px-[20px] max-lg:py-[25px] rounded-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <img
            src={isMobileMenuOpen ? "/static/images/menu.svg" : "/static/images/menu.svg"}
            alt="menu icon"
            className="p-2 hover:bg-[#e43838] rounded-lg transition-colors"
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={clsx(
            "absolute top-0 right-0 h-full w-[280px] max-w-[85vw] bg-[#0F0F0F] border-l border-[#1F1F1F] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#1F1F1F]">
            <div className="flex items-center gap-2">
              <img
                className="w-[36px]"
                src="/static/images/logo.svg"
                alt="logo"
              />
              <img
                className="w-[60px]"
                src="/static/images/StreamVibe.svg"
                alt="StreamVibe"
              />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col p-4 gap-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  "px-4 py-3 rounded-lg text-[15px] font-medium transition-colors",
                  location.pathname === link.to
                    ? "bg-[#1A1A1A] text-white border-l-[3px] border-[#e43838]"
                    : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[#1F1F1F] flex flex-col gap-3">
            {/* Search & Notification Row */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSearchClick}
                className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#1A1A1A] hover:bg-[#252525] rounded-lg transition-colors text-sm text-gray-300"
              >
                <img
                  src="/static/images/search.svg"
                  alt="search"
                  className="w-5 h-5"
                />
                Search
              </button>
              <button className="p-3 bg-[#1A1A1A] hover:bg-[#252525] rounded-lg transition-colors">
                <img
                  src="/static/images/notification.svg"
                  alt="notifications"
                  className="w-5 h-5"
                />
              </button>
            </div>

            {/* Auth Button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 bg-[#1A1A1A] hover:bg-[#252525] text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <img
                  src="/static/images/profile.svg"
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-3 px-4 bg-[#e43838] hover:bg-red-500 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>
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
