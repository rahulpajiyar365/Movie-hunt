"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const base_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      toast.error("Email not found. Please restart password reset.");
      router.push("/forget-password");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${base_URL}/reset-password`, {
        email,
        token: otp,
        password,
        password_confirmation
      });

      toast.success("Password reset successfully!");
      localStorage.removeItem("email");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to reset password. Try again.");
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-900"
      >
        <div className="w-full max-w-sm bg-black p-6 rounded-xl shadow-2xl shadow-pink-500/10">
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300"
              placeholder="Enter OTP"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Enter New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300"
              placeholder="*********"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Confirm New-Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={password_confirmation}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300"
              placeholder="*********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 my-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg shadow-pink-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-gray-900 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
