"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { FaHeart } from "react-icons/fa6";

interface Movie {
  id: number;
  title: string;
  thumbnail_url: string;
  release_date: string;
}

interface Favorite {
  movie: Movie;
}

const FavoritePage = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://192.168.1.212:8000/api/view-favorite`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites(response.data.data || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);

  const handleImageClick = (id: number) => {
    router.push(`/movieDetail/${id}`);
  };

  const removefav = () => {
    //TODO Post
  };

  if (favorites.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-500">
          Your Favorite Movies
        </h2>
        <div className="text-center text-gray-500">No favorite movies yet.</div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-red-500">
        Your Favorite Movies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map(({ movie }) => (
          <div
            key={movie.id}
            className="group cursor-pointer max-w-sm w-full mx-auto bg-white p-4 rounded-lg shadow"
          >
            <div className="relative h-[450px] w-full">
              <Image
                src={movie.thumbnail_url || "/default-poster.jpg"}
                alt={movie.title || "poster"}
                width={500}
                height={750}
                className="rounded-lg w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                onClick={() => handleImageClick(movie.id)}
              />
              <div className="absolute top-0 right-0 p-2">
                <button
                  type="button"
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      const token = localStorage.getItem("token");
                      await axios.delete(
                        `http://192.168.1.212:8000/api/remove-favorite/${movie.id}`,
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
                    className="h-10 w-10 text-red-500 hover:text-white"
                    onClick={removefav}
                  />
                </button>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{movie.title}</div>
              <span className="text-gray-500 text-sm">
                {movie.release_date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FavoritePage;
