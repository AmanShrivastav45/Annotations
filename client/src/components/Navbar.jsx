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
          <div className="text-white Geist font-bold text-xl sm:text-2xl flex items-center md:w-[35%]">
            <MdOutlineKeyboardCommandKey className="mr-2" />
            <h1 className="Apercu-Bold ">ANNOTATIONS</h1>
          </div>
         
          <div className="flex items-start w-[35%] justify-end relative">
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
