"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await axios.post(
        "http://192.168.1.212:8000/api/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error("Logout failed", err);
    }

    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.replace("/");
  };

  return (
    <nav className="sticky top-0 bg-black px-8 py-4 flex justify-between items-center shadow-md md:px-4 z-10">
      <div className="text-white text-2xl font-bold md:text-xl">
        <Link href="/">
          <div className="w-28 h-12 overflow-hidden flex items-center justify-center">
            <span className="sr-only">Movie hunt</span>
            <img
              src="/images/logo.png"
              alt="Movie hunt Logo"
              className="w-15 h-auto align-baseline"
            />
          </div>
        </Link>
      </div>

      <div className="gap-3 flex items-center justify-center">
        <div className="flex gap-10 md:gap-4 ">
          <Link
            href="/"
            className="text-white text-base px-4 py-2 rounded hover:bg-red-500 md:px-2"
          >
            Home
          </Link>
        </div>
        {!isLoggedIn ? (
          <>
            <Link
              href="/login"
              className="text-white text-base px-4 py-2 rounded hover:bg-red-500 md:px-2"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-white text-base px-4 py-2 rounded hover:bg-red-500 md:px-2"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/profile"
              className="text-white text-base px-4 py-2 rounded hover:bg-red-500 md:px-2"
            >
              Profile
            </Link>
            <Link
              href="/api/favorite"
              className="text-white text-base px-4 py-2 rounded hover:bg-red-500 md:px-2"
            >
              Favorites
            </Link>
            <button
              className="text-white text-base px-4 py-2 rounded hover:bg-red-500 md:px-2"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
