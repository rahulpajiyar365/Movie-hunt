
"use client";

import { useState } from "react";

interface Props {
  onCancel: () => void;
  onConfirm: (password: string) => void;
}

export default function PopMessage({ onCancel, onConfirm }: Props) {
  const [password, setPassword] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full dark:bg-gray-800"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Confirm Delete
        </h2>
        <input
          type="password"
          className="w-full px-4 py-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(password)}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
