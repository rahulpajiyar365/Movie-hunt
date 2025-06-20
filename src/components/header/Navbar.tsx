/* "use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setCheckingAuth(false);
        return;
      }

      try {
        const res = await axios.get(`${base_url}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (err) {
        console.warn("Invalid or expired token.");
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage")); 
        setIsLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await axios.post(
        `${base_url}/logout`,
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
    window.dispatchEvent(new Event("storage"));
    setIsLoggedIn(false);
    router.replace("/");
  };

  return (
    <nav className="sticky top-0 bg-black px-8 py-4 flex justify-between items-center shadow-md md:px-4 z-10">
      <div className="text-white text-2xl font-bold md:text-xl">
        <Link href="/">
          <div className="w-28 h-12 overflow-hidden flex items-center justify-center">
            <span className="sr-only">Movie Hunt</span>
            <Image
              src="/images/logo.png"
              alt="Movie Hunt Logo"
              className="w-15 h-auto align-baseline"
              width={60}
              height={60}
            />
          </div>
        </Link>
      </div>

      {!checkingAuth && (
        <div className="gap-3 flex items-center justify-center">
          <div className="flex gap-10 md:gap-4">
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
                href="/favorite"
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
      )}
    </nav>
  );
};

export default NavBar;
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const NavBar = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn} = useAuth();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await axios.post(`${base_url}/logout`, {}, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Logout failed", err);
    }

    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    router.replace("/");
  };

  return (
    <nav className="sticky top-0 bg-black px-8 py-4 flex justify-between items-center shadow-md md:px-4 z-10">
      <div className="text-white text-2xl font-bold md:text-xl">
        <Link href="/">
          <div className="w-28 h-12 overflow-hidden flex items-center justify-center">
            <span className="sr-only">Movie Hunt</span>
            <Image
              src="/images/logo.png"
              alt="Movie Hunt Logo"
              width={60}
              height={60}
              className="w-15 h-auto align-baseline"
            />
          </div>
        </Link>
      </div>

      <div className="gap-3 flex items-center justify-center">
        <Link
          href="/"
          className="text-white text-base px-4 py-2 rounded hover:bg-red-500 md:px-2"
        >
          Home
        </Link>

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
              href="/favorite"
              className="text-white text-base px-4 py-2 rounded hover:bg-red-500 md:px-2"
            >
              Favorites
            </Link>
            <button
              onClick={handleLogout}
              className="text-white text-base px-4 py-2 rounded hover:bg-red-500 md:px-2"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
