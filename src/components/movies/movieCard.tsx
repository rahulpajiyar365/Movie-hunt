"use client";

import React from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FaHeart } from "react-icons/fa6";
import { MovieProps } from "./Movie";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const MovieCard = ({ id, title, release_date, thumbnail_url }: MovieProps) => {
  const router = useRouter();
  const handleImageClick = (id: number) => {
    router.push(`/movieDetail/${id}`);
  };
  const handlefav = () => {
    //TODO Post
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div key={id} className="group cursor-pointer max-w-sm w-full">
        <div className=" relative h-[450px] w-[300px]">
          <Image
            src={thumbnail_url || "/images/poster.png"}
            alt={title || "poster"}
            width={500}
            height={750}
            className="  rounded-lg w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
            onClick={() => handleImageClick(id)}
          />
          <div className="absolute top-0 right-0 p-2">
            <button
              type="button"
              onClick={async (e) => {
                e.stopPropagation();
                try {
                  const token = localStorage.getItem("token");
                  await axios.post(
                    `${base_url}/add-favorite/${id}`,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                } catch (error) {
                  console.error("Error adding favorite:", error);
                }
              }}
              className="bg-transparent border-none p-0 m-0"
            >
              <FaHeart
                className="h-10 w-10 hover:text-red-500"
                onClick={handlefav}
              />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold">{title}</div>

          <span className="text-gray-500 text-sm">{release_date}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
