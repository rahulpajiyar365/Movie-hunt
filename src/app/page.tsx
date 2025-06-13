"use client";
import { useEffect, useState } from "react";
import MovieCard from "../component/movies/movieCard";
import { Movie } from "../component/movies/Movie";
import { useRouter } from "next/navigation";
import SearchButton from "@/component/search-button/SearchButton";
import Pagination from "@/component/pagination/Pagination";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    const getMovies = async (page: number) => {
      try {
        const res = await fetch(
          `http://192.168.1.212:8000/api/movies?page=${page}`
        );
        const data = await res.json();
        console.log("respone from get movies", data);
        setMovies(data.data.data || []);
        setLastPage(data.data.last_page);
      } catch (error: any) {
        console.error("Error fetching movies:", error.data);
      }
    };
    getMovies(currentPage);
  }, [currentPage]);

  function handleSinglemovie(id: number) {
    router.push(`/movieDetail/${id}`);
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="text-black border-2  min-h-screen">
      <div className="mt-4 ">
        <SearchButton />
      </div>
      <div className="w-full my-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 place-items-center">
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
      <div>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={handlePageChange}
        />
      </div>
    </main>
  );
}
