"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const base_url =process.env.NEXT_PUBLIC_API_BASE_URL
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router=useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    };

    try {
      console.log("Form submitted:", formData);
      const res = await axios.post(
        `${base_url}/register`,
        formData
      );
      console.log("API response:", res.data);
      alert("Registration successful!");
      setError(""); 
      
      router.push('/login')
    } catch {
      setError(
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-screen relative flex flex-col justify-center items-center">
        <div className="min-h-screen flex items-center justify-center bg-black p-4 w-full">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-white mb-2 text-shadow-neon">
                REGISTER
              </h2>
              <p className="text-pink-400">
                Join us and explore endless content without ads
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl shadow-pink-500/10 overflow-hidden">
              <div className="p-8 space-y-6">
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Full-Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="Dwork lab"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="dwork@gmail.com"
                  />
                </div>

                <div>
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="*********"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    placeholder="*********"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                >
                  Register
                </button>

                <p className="mt-8 text-center text-sm text-gray-400">
                  Already have an account?
                  <a
                    href="/login"
                    className="font-medium text-pink-400 hover:text-pink-300 transition-colors duration-300 ml-1"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
