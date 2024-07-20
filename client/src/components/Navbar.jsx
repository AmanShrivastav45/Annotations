import React, { useState } from "react";
import { FiCircle, FiMenu, FiPlusSquare } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { IoHomeOutline, IoTodayOutline } from "react-icons/io5";
import { PiGraduationCap } from "react-icons/pi";
import { CgCircleci, CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import "../fonts/stylesheet.css";
import { MdOutlineKeyboardCommandKey } from "react-icons/md";
import Logout from "../modals/logout";

const Navbar = ({
  onLogout,
  toggleProfileButton,
  isProfileButtonOpen,
  onProfileClick,
  value,
  userInfo,
  onSearchNote,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const handleOnSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    onSearchNote("");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  return (
    <div style={{ zIndex: 1000 }} className="Geist z-100 w-full flex justify-start items-center flex-col">
      <div className="absolute top-0 w-full border-b border-[#1A1A1A] bg-[#000000]  flex flex-col items-center justify-center">
        <div className="w-full pt-1 h-20 px-4 2xl:w-[1440px] flex justify-between items-center">
          <div className="text-white Geist font-bold text-2xl flex items-center">
            <MdOutlineKeyboardCommandKey className="mr-2" />
            <h1>Annotations.</h1>
          </div>
          <div className="hidden sm:block w-0 h-8 sm:w-72 p-2 rounded-[5px] bg-[#0A0A0A] border border-[#1e1e1e]">
            <div className="h-full w-[full] flex items-center justify-between">
              <input
                type="text"
                placeholder="Search for notes"
                className="caret-white text-white text-sm bg-[#0A0A0A] w-[80%] focus:none outline-none "
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <div className="text-white text-base flex items-center">
                {
                  <button onClick={onClearSearch}>
                    <IoClose className="mr-2 text-gray-700  hover:text-white" />
                  </button>
                }
                <button onClick={handleOnSearch}>
                  <IoMdSearch className="text-gray-600 hover:text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-center relative">
            <button onClick={toggleProfileButton}>
              <div className="h-7 w-7 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[50%]"></div>
            </button>
            {isProfileButtonOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0a] border border-[#1e1e1e] rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                style={{ right: "10px", top: "25px" }}
              >
                <div
                  className="text-[#68686f]"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div
                    className="block px-4 py-3 text-sm hover:bg-[#1e1e1e] w-full text-left"
                    role="menuitem"
                  >
                    <span>User: </span>
                    <span className="Geist text-gray-300">
                      {userInfo.userName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="block px-4 py-3 text-sm  hover:bg-[#1e1e1e] hover:text-gray-400 w-full text-left"
                    role="menuitem"
                  >
                    Logout annotations
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[95%] p-2 rounded-[5px] bg-[#0A0A0A] border border-[#1e1e1e] sm:w-0 h-10 mb-4 sm:h-0  sm:hidden">
          <div className="h-full w-full flex items-center justify-between">
            <input
              type="text"
              placeholder="Search for notes"
              className="caret-white text-white bg-[#0A0A0A] w-[80%] text-sm focus:none outline-none h-full"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <div className="text-white text-base flex items-center">
              <button onClick={onClearSearch}>
                <IoClose className="mr-2 text-gray-700  hover:text-white" />
              </button>
              <button onClick={handleOnSearch}>
                <IoMdSearch className="text-gray-600 hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <Logout
          onLogout={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />
      )}
    </div>
  );
};

export default React.memo(Navbar);
