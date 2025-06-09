"use client";

import { useEffect, useState } from "react";

import MovieCard from "../component/movies/MovieCard";

import { Movie } from "../component/movies/Movie";

import axios from "axios";

const fetcher = async (url: string): Promise<Movie[]> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function HomePage() {
  const [movies, setMovies] = useState<any[]>();

  const fetchMovies = async () => {
    const response = await axios.get("http://192.168.1.212:8000/api/movies");
    // const response = await axios.get(DB_BASE_URL);
    console.log("Movie Resposnse", response?.data?.data);
    setMovies(response?.data?.data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  function handleSinglemovie(id: number) {
    // alert('hhhhhh')
    // throw new Error("Function not implemented.");
  }

  return (
    <main className="bg-zinc-950 text-zinc-100 min-h-screen ">
      <div className="w-full container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2  place-items-center">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              release_date={movie.release_date}
              desc={movie.description}
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
