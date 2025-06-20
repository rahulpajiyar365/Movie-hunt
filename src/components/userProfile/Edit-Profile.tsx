"use client";
import { useState, useEffect } from "react";

interface User {
  username: string;
  email: string;
  age: number;
  password?: string;
}
interface EditProfilePageProps {
  user: {
    id: number;
    name: string;
    email: string;
    age: number;
    image_url: string;
  };
  onClose: () => void;
}
const base_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function EditProfilePage({
  user,
  onClose,
}: EditProfilePageProps) {
  const [formData, setFormData] = useState<User>({
    username: "",
    email: "",
    age: 0,
    // password: "",
  });

  useEffect(() => {
    setFormData({
      username: user.name,
      email: user.email,
      age: user.age,
      // password: "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === null ? "" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${base_URL}/profile-edit`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: user.id,
          name: formData.username,
          email: formData.email,
          age: Number(formData.age),
          // ...(formData.password ? { password: formData.password } : {}),
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        throw new Error("Update failed");
      }
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className=" bg-slate-200 py-8 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Edit Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded-2xl p-6"
        >
          <div className="gap-6 flex flex-col items-center justify-center">
            <div className="w-full">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username ?? ""}
                onChange={handleChange}
                className="p-2  mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email ?? ""}
                onChange={handleChange}
                className=" p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                value={formData.age ?? ""}
                onChange={handleChange}
                min="18"
                max="100"
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/*   <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password (optional)
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password ?? ""}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div> */}
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
