


"use client";
import { useState } from "react";

interface PopMessageProps {
  onConfirm: (password: string) => void;
  onCancel: () => void;
}

const PopMessage = ({ onConfirm, onCancel }: PopMessageProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!password) {
      setError("Password is required.");
      return;
    }
    setError("");
    onConfirm(password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Confirm Account Deletion
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
            Please enter your password to confirm deletion.
          </p>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={handleSubmit}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Confirm Delete
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopMessage;
