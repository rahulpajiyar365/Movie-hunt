"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchMovies } from "@/app/api/api-call/api";
import { GrFavorite } from "react-icons/gr";
import Link from "next/link";
import { FaHeart } from "react-icons/fa6";

interface MovieProps {
  id: number;
  title: string;
  release_date: string;
  description: string | undefined;
  thumbnail_url: string;
  handleClick: any;
}

const MovieCard = ({
  id,
  title,
  release_date,

  thumbnail_url,
}: MovieProps) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  /*  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // const response = await axios.get("http://192.168.1.212:8000/api/movies");
        const response = await axios.get(`${baseURL}/movies`);
        console.log("Movie Response", response?.data?.data);
        setMovies(response?.data?.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []); */

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };

    getMovies();
  }, []);

  const handleImageClick = (id: number) => {
    router.push(`/api/movieDetail/${id}`);
  };
  const handlefav = () => {
    //TODO Post
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div key={id} className="group cursor-pointer max-w-sm w-full">
        <div className=" relative h-[450px] w-full">
          <Image
            src={thumbnail_url}
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
                    `http://192.168.1.212:8000/api/add-favorite/${id}`,
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
