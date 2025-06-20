"use client";

import React, { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
const base_url =process.env.NEXT_PUBLIC_API_BASE_URL
export default function ReviewBox() {
  const params = useParams(); 
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>("");
  const id = Number(params.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !review) {
      alert("Please select a rating and write a review.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${base_url}/add-user-rating/${id}`,
        {
          rating,
          review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Review submitted:", response.data);
      alert("Review submitted successfully!");

      setRating(null);
      setReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <div>
      <div className="p-4 mx-auto bg-white rounded-lg shadow-md max-w-4xl sm:p-6 grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div className="lg:col-span-4 col-span-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Write a review
            </h2>
            <div className="flex justify-start items-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`${star}-stars`}
                    name="rating"
                    value={star}
                    checked={rating === star}
                    onChange={() => setRating(star)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`${star}-stars`}
                    className={`text-2xl cursor-pointer hover:scale-110 ${
                      rating && rating >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </label>
                </React.Fragment>
              ))}
            </div>
            <textarea
              id="review"
              name="review"
              rows={4}
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your review"
            ></textarea>
            <button
              type="submit"
              className="mt-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 hidden lg:flex flex-col space-y-4">
          <div className="flex items-center">
            <span className="text-yellow-400 text-xl">★★★★★</span>
            <p className="ml-2 text-sm font-medium text-gray-900">
              3.5 out of 5
            </p>
          </div>
          <p className="text-sm font-medium text-gray-500">4 global ratings</p>
          {[5, 4, 3, 2, 1].map((star, i) => (
            <div className="flex items-center" key={star}>
              <span className="text-sm font-medium text-blue-600 hover:underline shrink-0">
                {star} star
              </span>
              <div className="w-3/4 h-4 mx-2 bg-gray-200 rounded">
                <div
                  className="h-4 bg-yellow-400 rounded"
                  style={{ width: `${[50, 25, 10, 5, 0][i]}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500">
                {[50, 25, 10, 5, 0][i]}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
