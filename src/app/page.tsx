"use client";

import { useEffect, useState } from "react";

import MovieCard from "../component/movies/movieCard";

import { Movie } from "../component/movies/Movie";
import axios from "axios";

import { useRouter } from "next/navigation";
import { fetchMovies } from "./api/api-call/api";
import { GrFavorite } from "react-icons/gr";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      console.log("Data From page", data);
      setMovies(data);
    };
    getMovies();
  }, []);

  function handleSinglemovie(id: number) {
    router.push(`/movieDetail/${id}`);
  }

  return (
    <main className=" text-black border-2 border-amber-500 min-h-screen ">
      <div className="w-full  my-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2  place-items-center">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              release_date={movie.release_date}
              description={movie.description}
              thumbnail_url={movie.thumbnail_url}
              id={movie.id}
              handleClick={handleSinglemovie}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
