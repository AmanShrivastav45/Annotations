import React, { useEffect, useState } from "react";
import "../fonts/stylesheet.css";
import logoWhite from "../assets/logoWhite.png";
import Astronaut from "../style/Astronaut.jsx";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/login",
        {
          email: email,
          password: password,
        })
        
        if(response.data && response.data.accessToken){
          localStorage.setItem("token", response.data.accessToken)
          navigate('/dashboard')
        }     
        alert("Login successful");
    } catch (error) {
      console.error(error);
      alert("Error logging in");
    }
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      handleLogin(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen h-screen w-full flex items-center justify-center">
      <div className="h-full w-full rounded-[7px] flex flex-row">
        <div className="w-full lg:w-[50%] h-full bg-[#09090B]">
          <Link
            to="/signup"
            className="absolute Geist top-10 right-10 text-gray-200"
          >
            Signin
          </Link>
          <form
            onSubmit={handleLogin}
            className="py-2 w-full h-full flex items-center justify-center flex-col"
          >
            <h1 className="mb-6 text-4xl Geist-semibold text-white">
              Welcome back!
            </h1>
            <div className=" px-1 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="Geist border w-[360px] md:w-[420px] border-[#2A2A2A] caret-white placeholder:text-[#68686F] bg-[#09090b] focus:border-gray-300 px-4 outline-none h-12 text-base text-white rounded-[7px] flex items-center justify-center"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div>
              <div className="relative">
                <input
                  maxLength={32}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="Geist border w-[360px] md:w-[420px] border-[#2A2A2A] caret-white placeholder:text-[#68686F] bg-[#09090B] focus:border-gray-300 px-4 outline-none h-12 text-base text-white rounded-[7px] flex items-center justify-center"
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
                <div className="relative mt-2 flex items-center justify-end">
                  <button className="text-[#68686f] text-sm text-start Geist mr-2">
                    Forgot password?
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="h-12 mt-4 w-[360px] md:w-[420px] text-base Geist-semibold bg-gray-100 text-[#1e1e1e] rounded-[7px] flex items-center justify-center"
            >
              Log In
            </button>
            <h3 className="Geist text-base my-4 text-[#68686F]">
              Don't have an account?{" "}
              <Link to="/signup" className="Geist-Semibold text-gray-300">
                &nbsp;Sign In
              </Link>
            </h3>
          </form>
        </div>
        {/* Div-2 */}
        <div className="h-full lg:w-[50%]  bg-[#18181B] flex items-center justify-center">
          <div className="relative lg:h-[340px] lg:w-[540px] mb-24 flex items-center justify-center">
            <Astronaut />
          </div>
          <div className="absolute top-10 left-10">
            <img src={logoWhite} height={30} width={30} />
          </div>
          <div className="Geist text-gray-300 absolute bottom-16 ">
            <h1 className="hidden text-left lg:block mx-16 lg:text-base xl:text-xl">
              "The beautiful thing about learning is that no one can take it
              away from you. It's a lifelong journey that empowers us to grow,
              adapt, and shape our own destinies."
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
