"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import type { Movie } from "@/components/movies/Movie";

import MovieCard from "../components/movies/movieCard";
import SearchButton from "@/components/search-button/SearchButton";
import Pagination from "@/components/pagination/Pagination";
import Skeleton from "@/components/skeleton/Skeleton";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchResults !== null) return;
    // const controller = new AbortController()
    const getMovies = async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${base_url}/movies?page=${page}`);
        const data = await res.json();
        setMovies(data.data.data || []);
        setLastPage(data.data.last_page);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies.Please try again");
      } finally {
        setLoading(false);
      }
    };
    getMovies(currentPage);
  }, [currentPage, searchResults]);

  function handleSinglemovie(id: number) {
    router.push(`/movieDetail/${id}`);
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="text-black  bg-slate-400 min-h-screen px-4 py-6">
      {loading ? (
        <Skeleton />
      ) : error ? (
        <p className="text-center text-red-600 mt-6">{error}</p>
      ) : (
        <>
          <div className="mt-4">
            <SearchButton
              onSearchResults={(results: Movie[] | null) =>
                setSearchResults(results)
              }
            />
          </div>

          <div className="w-full my-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
              {(searchResults ?? movies).map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  release_date={movie.release_date ?? ""}
                  description={movie.description}
                  thumbnail_url={movie.thumbnail_url}
                  handleClick={handleSinglemovie}
                />
              ))}
            </div>
          </div>

          {searchResults === null && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                setCurrentPage={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}
