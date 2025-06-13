"use client";

import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-red-500 text-gray-400 px-6 py-10 text-sm">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
        <div className="col-span-2 md:col-span-1">
          <img src="/images/logo.png" alt="Movie Hunt" className="w-15 h-auto"/>
          <h3 className="text-white font-semibold mb-4">Movie Hunt</h3>
          <p className="text-xs">
            Watch your favorite movies and shows — all in one place.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-2">Browse</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/favorites" className="hover:underline">
                Favorites
              </Link>
            </li>
            <li>
              <Link href="/movies" className="hover:underline">
                Movies
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-2">Help</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:underline">
                Support Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-2">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:underline">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Cookies
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden lg:block">
          <h4 className="text-white font-medium mb-2">Follow Us</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:underline">
                Instagram
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Twitter
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Facebook
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        © {year} Movie Hunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
