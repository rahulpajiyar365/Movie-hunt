
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaHeart } from "react-icons/fa6";
import { Favorite } from "@/components/movies/Movie";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const FavoritePage = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get(`${base_url}/view-favorite`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data.data || []);
      } catch (err: any) {
        console.error("Error fetching favorites:", err);
        if (err?.response?.status === 401) {
          router.push("/login");
        } else {
          setError("Failed to load favorites. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [router]);

  const handleImageClick = useCallback(
    (id: number) => {
      router.push(`/movieDetail/${id}`);
    },
    [router]
  );

  const handleRemove = useCallback(
    async (movieId: number | null) => {
      if (!movieId) return;

      const confirmed = confirm("Remove this movie from your favorites?");
      if (!confirmed) return;

      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        await axios.delete(`${base_url}/remove-favorite/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFavorites((prev) => prev.filter((fav) => fav.movie.id !== movieId));
      } catch (err) {
        console.error("Error removing favorite:", err);
        alert("Could not remove the movie from favorites.");
      }
    },
    [router]
  );

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-500">
          Your Favorite Movies
        </h2>
        <div className="text-center text-white">Loading favorites...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-500">
          Your Favorite Movies
        </h2>
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

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
    <section className="container mx-auto p-4 bg-slate-500">
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
                loading="lazy"
                className="rounded-lg w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                onClick={() => handleImageClick(movie.id)}
              />
              <div className="absolute top-0 right-0 p-2">
                <button
                  type="button"
                  onClick={() => handleRemove(movie.id)}
                  className="bg-transparent border-none p-0 m-0"
                  aria-label="Remove from favorites"
                >
                  <FaHeart className="h-10 w-10 text-red-500 hover:text-white transition-colors" />
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
