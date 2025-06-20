"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import EditProfilePage from "@/components/userProfile/Edit-Profile";
import PopMessage from "@/components/pop-message/PopMessage";
import { fetchUserProfile, handleDelete } from "../../api/api-call/api2";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  image_url: string;
}

export default function ProfilePage() {
  const [editOpen, setEditOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /*   useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }
}, []);

useEffect(() => {
  if (!loading && !user) {
    router.push("/login");
  }
}, [loading, user]); */
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-lg">Loading your profile…</p>;

  if (!user)
    return <p className="text-center py-10 text-red-600">User not found.</p>;

  return (
    <>
      <div className="bg-slate-500 dark:bg-gray-900 flex items-center justify-center p-20">
        <div className=" bg-gray-200 shadow-xl rounded-xl max-w-md w-full p-6 text-center">
          <Image
            src={user.image_url || "/images/poster.png"}
            alt={user.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-blue-600 object-cover mx-auto h-40 w-40"
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
              onClick={() => setShowConfirm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Delete Account
            </button>

            {showConfirm && (
              <PopMessage
                onCancel={() => setShowConfirm(false)}
                onConfirm={async (password) => {
                  setShowConfirm(false);
                  const result = await handleDelete(password, router);
                  if (result.success) {
                    alert("Account deleted");
                    localStorage.removeItem("token");
                    window.dispatchEvent(new Event("storage")); 
                    router.push("/login");
                  } else {
                    alert(result.error);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>

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
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
              onClick={() => setEditOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <EditProfilePage
              user={user}
              onClose={async () => {
                setEditOpen(false);
                setLoading(true);
                try {
                  const userData = await fetchUserProfile();
                  setUser(userData);
                } finally {
                  setLoading(false);
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}