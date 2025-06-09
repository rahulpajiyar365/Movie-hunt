/* "use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          
          <Link href="/" className="flex items-center">
            <div className="w-28 h-12 overflow-hidden flex items-center justify-center">
              <span className="sr-only">Netflix Logo</span>
              <img
                src="/images/logo.png"
                alt="Netflix Logo"
                className="w-30 h-auto align-baseline"
              />
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; */

"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <nav className=" sticky top-0 bg-black px-8 py-4 flex justify-between items-center shadow-md md:px-4">
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

      <div className="flex gap-8 md:gap-4">
        <Link
          href="/"
          className="text-white text-base px-4 py-2 rounded hover:bg-white/10 md:px-2"
        >
          Home
        </Link>
        <Link
          href="/profile"
          className="text-white text-base px-4 py-2 rounded hover:bg-white/10 md:px-2"
        >
          Profile
        </Link>
        <Link
          href="/favorites"
          className="text-white text-base px-4 py-2 rounded hover:bg-white/10 md:px-2"
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
