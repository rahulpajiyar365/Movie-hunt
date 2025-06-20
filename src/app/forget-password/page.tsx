
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const base_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_URL}/forget-password`, {
        email,
      });
      console.log(response);

      if (response) {
        router.push("/forget-password/reset-password");
        toast.success(
          response.data.message || "OTP has been sent to your email."
        );
        localStorage.setItem("email", email);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <form onSubmit={onSubmit}>
        <div className="bg-white dark:bg-gray-800 flex items-center justify-center w-screen h-screen p-4">
          <div className="flex flex-col w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-black p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl shadow-pink-500/10">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Enter Your E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="w-fit py-3 px-4 my-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg shadow-pink-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-gray-900 transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
