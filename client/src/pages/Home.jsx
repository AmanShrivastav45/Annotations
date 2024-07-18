import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import AddEditNotes from "../components/AddEditNotes";
import EmptyCard from "../components/EmptyCard";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isProfileButtonOpen, setIsProfileButtonOpen] = useState(false);
  var isPinned;
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ data: noteDetails, type: "edit" });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/getuser");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/getnotes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again later!");
    }
  };

  const handleToggle = () => {
    setIsProfileButtonOpen(!isProfileButtonOpen);
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <div className="flex items-center flex-col bg-black min-h-screen pb-24">
      <Navbar
        userInfo={userInfo}
        toggleProfileButton={handleToggle}
        isProfileButtonOpen={isProfileButtonOpen}
        onLogout={() => {
          localStorage.clear();
          navigate("/login");
        }}
      />
      <div className="mt-32 sm:mt-20 p-4 sm:p-4 h-full w-full pt-1 px-4 2xl:w-[1440px] flex justify-between items-center">
        {allNotes.length > 0 ? (
          <div className="mx-auto w-full">
            <div className="grid grid-cols-1 place-items-center md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mt-6">
              {allNotes.map((item) => (
                <NoteCard
                  key={item._id}
                  title={item.title}
                  date={item.createdOn}
                  content={item.content}
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => {}}
                  onPinNote={() => {}}
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyCard />
        )}
      </div>
      <button onClick={() => setOpenAddEditModal(true)}>
        <FaCirclePlus
          className={`text-yellow-600  hover:text-yellow-500 text-5xl absolute bottom-10 md:bottom-16 right-10 md:right-16 transition-all`}
        />
      </button>
      {openAddEditModal && (
        <AddEditNotes
          type={"add"}
          onClose={() => setOpenAddEditModal(false)}
          getAllNotes={getAllNotes}
        />
      )}
    </div>
  );
};

export default Home;
