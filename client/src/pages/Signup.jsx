import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "../components/OtpInput";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { BiHide, BiShow } from "react-icons/bi";
import { IoCheckmarkCircleSharp, IoCloseCircle } from "react-icons/io5";
import { MdOutlineKeyboardCommandKey } from "react-icons/md";
import "../fonts/stylesheet.css";
import logoWhite from "../assets/logoWhite.png";
import Astronaut from "../style/Astronaut.jsx";
import axiosInstance from "../utils/axios.js";
import Loader from "../components/Loader";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Errors
  const [nameErrorColor, setNameErrorColor] = useState("text-[#303030]");
  const [nameLengthErrorColor, setNameLengthErrorColor] =
    useState("text-[#303030]");
  const [passwordLengthErrorColor, setPasswordLengthErrorColor] =
    useState("text-[#303030]");
  const [passwordLowercaseErrorColor, setPasswordLowercaseErrorColor] =
    useState("text-[#303030]");
  const [passwordUppercaseErrorColor, setPasswordUppercaseErrorColor] =
    useState("text-[#303030]");
  const [passwordNumberErrorColor, setPasswordNumberErrorColor] =
    useState("text-[#303030]");
  const [passwordSpecialCharErrorColor, setPasswordSpecialCharErrorColor] =
    useState("text-[#303030]");
  const [passwordMatchErrorColor, setPasswordMatchErrorColor] =
    useState("text-[#303030]");
  const [nameRingColor, setNameRingColor] = useState("border-[#2A2A2A]");
  const [passwordRingColor, setPasswordRingColor] =
    useState("border-[#2A2A2A]");
  const [confirmPasswordRingColor, setConfirmPasswordRingColor] =
    useState("border-[#2A2A2A]");

  // Checking if the username has atleast 6 characters
  useEffect(() => {
    if (name.length > 0 && name.length >= 6) {
      setNameLengthErrorColor("text-green-600");
    } else {
      setNameLengthErrorColor("text-[#303030]");
    }
  }, [name]);

  // Checking if the username has only lowercase characters
  useEffect(() => {
    if (name.length > 0 && name === name.toLowerCase()) {
      setNameErrorColor("text-green-600");
    } else {
      setNameErrorColor("text-[#303030]");
    }
  }, [name]);

  // Checking if password has atleast 8 characters
  useEffect(() => {
    if (password.length > 0 && password.length >= 8) {
      setPasswordLengthErrorColor("text-green-600");
    } else {
      setPasswordLengthErrorColor("text-[#303030]");
    }
  }, [password]);

  // Checking if the password has atleast one lowercase character
  useEffect(() => {
    if (password.length > 0 && /[a-z]/.test(password)) {
      setPasswordLowercaseErrorColor("text-green-600");
    } else {
      setPasswordLowercaseErrorColor("text-[#303030]");
    }
  }, [password]);

  // Checking if the password has atleast one uppercase character
  useEffect(() => {
    if (password.length > 0 && /[A-Z]/.test(password)) {
      setPasswordUppercaseErrorColor("text-green-600");
    } else {
      setPasswordUppercaseErrorColor("text-[#303030]");
    }
  }, [password]);

  // Checking if the password has atleast one number
  useEffect(() => {
    if (password.length > 0 && /[0-9]/.test(password)) {
      setPasswordNumberErrorColor("text-green-600");
    } else {
      setPasswordNumberErrorColor("text-[#303030]");
    }
  }, [password]);

  // Checking if the password has atleast one special character
  useEffect(() => {
    if (password.length > 0 && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordSpecialCharErrorColor("text-green-600");
    } else {
      setPasswordSpecialCharErrorColor("text-[#303030]");
    }
  }, [password]);

  // Checking if the password and the confirm password matches
  useEffect(() => {
    if (confirmPassword.length > 0 && password === confirmPassword) {
      setPasswordMatchErrorColor("text-green-600");
    } else {
      setPasswordMatchErrorColor("text-[#303030]");
    }
  }, [confirmPassword]);

  const handleSignup = async (e) => {
    e.preventDefault();
    var nameHasError = false;
    var passwordHasError = false;

    if (name.length === 0) {
      setNameLengthErrorColor("text-red-400");
      setNameErrorColor("text-red-400");
      nameHasError = true;
    } else {
      if (name.length < 6) {
        setNameLengthErrorColor("text-red-400");
        nameHasError = true;
      } else {
        setNameLengthErrorColor("text-green-600");
      }

      if (name !== name.toLowerCase()) {
        setNameErrorColor("text-red-400");
        nameHasError = true;
      } else {
        setNameErrorColor("text-green-600");
      }
    }

    if (password.length === 0) {
      setPasswordLengthErrorColor("text-red-400");
      setPasswordLowercaseErrorColor("text-red-400");
      setPasswordUppercaseErrorColor("text-red-400");
      setPasswordNumberErrorColor("text-red-400");
      setPasswordSpecialCharErrorColor("text-red-400");
      passwordHasError = true;
    } else {
      if (password.length < 8) {
        setPasswordLengthErrorColor("text-red-400");
        passwordHasError = true;
      } else {
        setPasswordLengthErrorColor("text-green-600");
      }

      if (!/[a-z]/.test(password)) {
        setPasswordLowercaseErrorColor("text-red-400");
        passwordHasError = true;
      } else {
        setPasswordLowercaseErrorColor("text-green-600");
      }

      if (!/[A-Z]/.test(password)) {
        setPasswordUppercaseErrorColor("text-red-400");
        passwordHasError = true;
      } else {
        setPasswordUppercaseErrorColor("text-green-600");
      }

      if (!/[0-9]/.test(password)) {
        setPasswordNumberErrorColor("text-red-400");
        passwordHasError = true;
      } else {
        setPasswordNumberErrorColor("text-green-600");
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        setPasswordSpecialCharErrorColor("text-red-400");
        passwordHasError = true;
      } else {
        setPasswordSpecialCharErrorColor("text-green-600");
      }
    }

    if (nameHasError) {
      setNameRingColor("border-red-500");
    }

    if (passwordHasError) {
      setPasswordRingColor("border-red-500");
    }

    if (passwordHasError || nameHasError) {
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setPasswordMatchErrorColor("text-red-400");
      setConfirmPasswordRingColor("border-red-500");
      return;
    }

    // If no error, proceed with signup
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/signup", {
        userName: name,
        email: email,
        password: password,
      });
      console.log("Signup API Response:", response); // Log the entire response
      setUserId(response.data.data.userId);
      setShowOtpInput(true);
    } catch (error) {
      console.error(error);
      toast.error("Error signing up");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOtpSubmit = async (otp) => {
    try {
      const response = await axiosInstance.post("/api/verifyotp", {
        userId: userId, // Pass userId to verify OTP
        otp: otp,
      });
      console.log(response);
      toast.success("OTP verified successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen h-screen w-full flex items-center justify-center">
      <div className="h-full w-full rounded-[7px] flex flex-row">
        <div className="h-full lg:w-[50%] bg-[#1e1e1e] flex items-center justify-center">
          <div className="relative lg:h-[340px] lg:w-[540px] mb-24 flex items-center justify-center">
            <Astronaut />
          </div>
          <div className="absolute top-10 left-10">
            <MdOutlineKeyboardCommandKey className="mr-2 text-white text-4xl" />
          </div>
          <div className="Geist text-gray-300 absolute bottom-16 ">
            <h1 className="hidden text-left lg:block mx-16 lg:text-base xl:text-xl">
              "The beautiful thing about learning is that no one can take it
              away from you. It's a lifelong journey that empowers us to grow,
              adapt, and shape our own destinies."
            </h1>
          </div>
        </div>
        <div className="w-full lg:w-[50%] h-full bg-[#09090B]">
          <Link
            to="/login"
            className="absolute Geist top-10 right-10 text-gray-200"
          >
            Login
          </Link>
          {!showOtpInput ? (
            <form
              onSubmit={handleSignup}
              className="py-2 w-full h-full flex items-center justify-center flex-col"
            >
              <h1 className="mb-6 text-4xl Geist-semibold text-white">
                Create an account
              </h1>
              <div className=" px-1 mb-4">
                <input
                  maxLength={16}
                  type="text"
                  placeholder="Enter your username"
                  className={`Geist border w-[360px] md:w-[420px] caret-white placeholder:text-[#68686F] bg-[#09090b] ${nameRingColor} focus:border-gray-300 px-4 outline-none h-12 text-base text-white rounded-[7px] flex items-center justify-center`}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <div
                  className={`${nameLengthErrorColor} mt-3 flex items-center`}
                >
                  <IoCheckmarkCircleSharp />
                  <h3 className="ml-2 Geist text-sm flex">
                    Username must be at least 6 characters long.
                  </h3>
                </div>
                <div className={`${nameErrorColor} flex items-center`}>
                  <IoCheckmarkCircleSharp />
                  <h3 className="ml-2 Geist text-sm flex">
                    Username must contain only lowercase letters.
                  </h3>
                </div>
              </div>
              <div className="px-1 mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="Geist border w-[360px] md:w-[420px] border-[#2A2A2A] caret-white placeholder:text-[#68686F] bg-[#09090B] focus:border-gray-300 px-4 outline-none h-12 text-base text-white rounded-[7px] flex items-center justify-center"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="relative">
                  <input
                    maxLength={32}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`Geist border w-[360px] md:w-[420px] ${passwordRingColor} caret-white placeholder:text-[#68686F] bg-[#09090B] focus:border-gray-300 px-4 outline-none h-12 text-base text-white rounded-[7px] flex items-center justify-center`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-3 text-xl text-gray-400"
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </button>
                </div>
                <div
                  className={`${passwordLengthErrorColor} mt-3 flex items-center`}
                >
                  <IoCheckmarkCircleSharp />
                  <h3 className="ml-2 Geist text-sm flex">
                    Password must be at least 8 characters long.
                  </h3>
                </div>
                <div
                  className={`${passwordLowercaseErrorColor} flex items-center`}
                >
                  <IoCheckmarkCircleSharp />
                  <h3 className="ml-2 Geist text-sm flex">
                    Password must have at least one lowercase letter.
                  </h3>
                </div>
                <div
                  className={`${passwordUppercaseErrorColor} flex items-center`}
                >
                  <IoCheckmarkCircleSharp />
                  <h3 className="ml-2 Geist text-sm flex">
                    Password must have at least one uppercase letter.
                  </h3>
                </div>
                <div
                  className={`${passwordNumberErrorColor} flex items-center`}
                >
                  <IoCheckmarkCircleSharp />
                  <h3 className="ml-2 Geist text-sm flex">
                    Password must have at least one number.
                  </h3>
                </div>
                <div
                  className={`${passwordSpecialCharErrorColor} flex items-center`}
                >
                  <IoCheckmarkCircleSharp />
                  <h3 className="ml-2 Geist text-sm flex">
                    Password must have at least one special character.
                  </h3>
                </div>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className={`Geist border w-[360px] md:w-[420px] mt-3 ${confirmPasswordRingColor} caret-white placeholder:text-[#68686F] bg-[#09090B] focus:border-gray-300 px-4 outline-none h-12 text-base text-white rounded-[7px] flex items-center justify-center`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div
                  className={`${passwordMatchErrorColor} mt-3 flex items-center`}
                >
                  <IoCheckmarkCircleSharp />
                  <h3 className="ml-2 Geist text-left text-sm flex">
                    Passwords must match.
                  </h3>
                </div>
              </div>
              <button
                type="submit"
                className="h-12 mt-4 w-[360px] md:w-[420px] text-base Geist-semibold bg-gray-100 text-[#1e1e1e] rounded-[7px] flex items-center justify-center"
              >
                Sign Up
              </button>
              <h3 className="Geist text-base my-4 text-[#68686F]">
                Already a member?{" "}
                <Link to="/login" className="Geist-Semibold text-gray-300">
                  &nbsp;Log In
                </Link>
              </h3>
            </form>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="text-left text-sm">
                <OtpInput
                  length={6}
                  onOtpSubmit={handleOtpSubmit}
                  sendemail={email}
                  userId={userId}
                />
              </div>
            </form>
          )}
        </div>
      </div>
      {loading && <Loader/>}
    </div>
  );
};

export default Signup;
