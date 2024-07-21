import React, { useEffect, useRef, useState } from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axios";

const OtpInput = ({ length = 6, onOtpSubmit, sendemail, userId }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      verifyOTP(userId, combinedOtp);
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].focus();

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = async () => {
    try {
      setTimer(300);
      setOtp(new Array(length).fill(""));
      setResendDisabled(true);
      await axiosInstance.post(`/resendotp`, { email: sendemail });
      toast.success("OTP has been resent to your email");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Error resending OTP");
      setResendDisabled(false);
    }
  };

  const verifyOTP = async (userId, otp) => {
    try {
      const response = await axiosInstance.post("/api/verifyotp", { userId, otp });
      // Check for success property or status code
      if (response.data.status === "VERIFIED") {
        console.log("OTP verified successfully:", response.data);
        toast.success(response.data.message);
        if (onOtpSubmit) {
          onOtpSubmit(otp);
        }
      } else {
        console.error("OTP verification failed:", response.data);
        toast.error(response.data.message || "Error verifying OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
      toast.error("Error verifying OTP");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none text-center">
      <div className="border-0 rounded-lg relative flex flex-col items-center justify-center h-[320px] w-[480px] bg-white shadow-lg outline-none focus:outline-none">
        <Link className="text-2xl absolute top-4 right-4" to="/">
          <IoClose />
        </Link>
        <h1 className="text-5xl">
          <MdOutlineMarkEmailRead />
        </h1>
        <h3 className="Geist text-base mt-2">
          Please check your mail! We've sent an OTP to{" "}
          <span className="Geist-semibold">&nbsp;{sendemail}</span>
        </h3>
        <div className="Geist-semibold flex items-center justify-center mt-4 gap-2 p-4 rounded-t">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1} // Ensure each input accepts only one character
              className="w-14 h-14 text-center text-2xl border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={timer === 0}
            />
          ))}
        </div>
        <div className="text-base mt-2">
          {timer > 0 ? (
            <span>Time remaining: {formatTime(timer)}</span>
          ) : (
            <span>OTP has expired</span>
          )}
        </div>
        <div className="mt-2">
          <h3 className="text-base">
            Didn't receive the OTP?{" "}
            <button
              className="Geist-semibold"
              onClick={handleResend}
              disabled={resendDisabled}
            >
              Resend
            </button>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
