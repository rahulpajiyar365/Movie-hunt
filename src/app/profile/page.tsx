/* "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import EditProfilePage from "@/component/userProfile/Edit-Profile";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  image_url: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get<{ data: User }>(
        "http://192.168.1.212:8000/api/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete account?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://192.168.1.212:8000/api/profile-delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Account deleted");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <p className="text-center py-10">Loading…</p>;
  if (!user)
    return <p className="text-center py-10 text-red-600">User not found.</p>;

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl max-w-md w-full p-6 text-center">
          <Image
            src={user.image_url || "/default-avatar.png"}
            alt={user.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-blue-600 object-cover mx-auto"
          />

          <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
            {user.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          <p className="text-gray-600 dark:text-gray-300">Age: {user.age}</p>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => setEditOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {editOpen && user && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setEditOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <EditProfilePage
              user={user}
              onClose={() => {
                setEditOpen(false);
                fetchUserProfile(); // refresh profile after update
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
 */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import EditProfilePage from "@/component/userProfile/Edit-Profile";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  image_url: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const router = useRouter();

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const { data } = await axios.get<{ data: User }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(data.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete account?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile-delete`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Account deleted");
      router.push("/");
    } catch (err) {
      console.error("Failed to delete account:", err);
      alert("Failed to delete account");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-lg">Loading your profile…</p>;

  if (!user)
    return <p className="text-center py-10 text-red-600">User not found.</p>;

  return (
    <>
      {/* Profile Card */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl max-w-md w-full p-6 text-center">
          <Image
            src={user.image_url || "/default-avatar.png"}
            alt={user.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-blue-600 object-cover mx-auto"
          />

          <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
            {user.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          <p className="text-gray-600 dark:text-gray-300">Age: {user.age}</p>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => setEditOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && user && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setEditOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
              onClick={() => setEditOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <EditProfilePage
              user={user}
              onClose={() => {
                setEditOpen(false);
                fetchUserProfile();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
