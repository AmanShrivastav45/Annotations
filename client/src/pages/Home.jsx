import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import AddEditNotes from "../components/AddEditNotes";
import EmptyCard from "../components/EmptyCard";
import ViewNote from "../components/ViewNotes";
import NotFound from "../components/NotFound";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isProfileButtonOpen, setIsProfileButtonOpen] = useState(false);
  const [openViewNoteModal, setOpenViewNoteModal] = useState(null);
  const [search, setSearch] = useState(false);
  const [currUser, setCurrUser] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleViewNote = (note) => {
    setOpenViewNoteModal(note);
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ type: "edit", data: noteDetails });
  };

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/getuser");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        setCurrUser(response.data.user._id);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }finally {
      setLoading(false);
    }
  };

  const getAllNotes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/getnotes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again later!");
    }finally {
      setLoading(false);
    }
  };

  const onSearchNote = async (query) => {
    console.log("Searching for query:", query);
    console.log("Current User ID:", currUser);
    try {
      let response;
      if (query === "") {
        response = await axiosInstance.get("/api/getnotes");
      } else {
        response = await axiosInstance.get("/api/search", {
          params: { query },
          headers: { userid: currUser ? currUser : "" }, // Pass currUser in headers
        });
      }
      if (response.data && response.data.notes) {
        setSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    setIsProfileButtonOpen(!isProfileButtonOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getAllNotes();
    getUserInfo();
  }, []);

  const onDeleteNote = async (noteId) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/deletenote/${noteId}`);
      toast.success("Note deleted successfully");
      getAllNotes();
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.log("An unexpected error occurred. Please try again later!");
    }finally {
      setLoading(false);
    }
  };

  const updateIsPin = async (noteId, isPinned) => {
    setLoading(true);
    const abc = !isPinned;
    try {
      await axiosInstance.put("/api/updatepin/" + noteId, { isPinned: abc });
      if (abc === true) {
        toast.success("Note Pinned");
      } else {
        toast.success("Note Unpinned");
      }
      getAllNotes();
    } catch (error) {
      toast.success("An unexpected error occurred.");
      console.log("An unexpected error occurred. Please try again later!");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col bg-black min-h-screen pb-24">
      <Navbar
        userInfo={userInfo}
        toggleProfileButton={handleToggle}
        isProfileButtonOpen={isProfileButtonOpen}
        onLogout={() => {
          localStorage.clear();
          toast.success("Logged out successfully")
          navigate("/login");
        }}
        onSearchNote={onSearchNote}
      />
      <div className="mt-20 p-4 sm:p-4 h-full w-full pt-1 px-4 2xl:w-[1440px] flex justify-between items-center">
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
                  onDelete={() => onDeleteNote(item._id)}
                  onPinNote={(isPinned) => updateIsPin(item._id, item.isPinned)}
                  onViewNote={handleViewNote}
                />
              ))}
            </div>
          </div>
        ) : (
          <>{search ? <NotFound /> : <EmptyCard />}</>
        )}
      </div>
      <button style={{ zIndex: 1000 }} onClick={() => setOpenAddEditModal({ type: "add" })}>
        <FaCirclePlus
          className={`text-yellow-500  hover:text-yellow-500 text-5xl fixed bottom-10 md:bottom-16 right-10 md:right-16 transition-all`}
        />
      </button>
      {openAddEditModal && (
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal(null)}
          getAllNotes={getAllNotes}
        />
      )}
      {openViewNoteModal && (
        <ViewNote
          title={openViewNoteModal.title}
          noteContent={openViewNoteModal.content}
          onClose={() => setOpenViewNoteModal(null)}
        />
      )}
      {loading && <Loader />}
    </div>
  );
};

export default Home;
