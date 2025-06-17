"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = { email, password };

    try {
      const res = await axios.post(
        "http://192.168.1.212:8000/api/login",
        formData
      );

      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setError("");
        router.push("/");
      } else {
        setError("Token not received. Login failed.");
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white dark:bg-gray-800 flex items-center justify-center w-screen h-screen p-4">
        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-black p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl shadow-pink-500/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Login to Movies Hunt
            </h2>
            <p className="text-pink-400 text-sm sm:text-base">
              Millions of movies for free & without ads
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300"
              placeholder="example@mail.com"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300"
              placeholder="*********"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 px-4 my-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg shadow-pink-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-gray-900 transition-all duration-300"
          >
            Login
          </button>

          <p className="mt-8 text-center text-sm text-gray-400">
            Do not have an account?
            <a
              href="/register"
              className="font-medium text-pink-400 hover:text-pink-300 transition-colors duration-300"
            >
              {" "}
              Register
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
