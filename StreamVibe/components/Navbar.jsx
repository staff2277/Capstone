import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";
import Search from "./Search";

const Navbar = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Search icon clicked");
    setIsSearchOpen(true);
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
            className="p-2 hover:bg-[#e43838] z-50 border-5 rounded-lg transition-colors"
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
            />
          </span>
        </div>
        <div className="lg:hidden  max-sm:px-[10px] max-sm:py-[20px] max-lg:px-[20px] max-lg:py-[25px] rounded-xl">
          <span className="">
            <img src="/static/images/menu.svg" alt="" />
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
    </>
  );
};

export default Navbar;
