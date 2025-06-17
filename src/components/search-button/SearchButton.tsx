"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  thumbnail_url: string;
  title: string;
  genres: Genre[];
};

type SearchButtonProps = {
  onSearchResults: (results: Movie[] | null) => void;
};

const SearchButton: React.FC<SearchButtonProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<number | "">("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${base_url}/movies-genre`);
        const genreList = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setGenres(genreList);
      } catch (err) {
        console.error("Failed to fetch genres", err);
        setGenres([]);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: { name: string; gen?: number[] } = { name: query };
      if (genre !== "") {
        payload.gen = [genre];
      }

      const response = await axios.post(`${base_url}/search-movies`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const searchData = response.data.data || [];
      onSearchResults(searchData); // send to parent
    } catch {
      setError("No result found");
      onSearchResults([]); // empty list on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-3 mb-6"
      >
        <div className="flex flex-grow">
          <input
            type="text"
            placeholder="Search for movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 h-10 rounded-l-md border-2 border-sky-500 focus:outline-none focus:border-sky-600 text-sm"
          />
          <button
            type="submit"
            className="bg-sky-500 text-white rounded-r-md px-4 text-sm hover:bg-sky-600 transition"
          >
            Search
          </button>
        </div>

        <select
          value={genre}
          onChange={(e) =>
            setGenre(e.target.value ? Number(e.target.value) : "")
          }
          className="w-full md:w-40 h-10 border-2 border-sky-500 text-sky-600 rounded-md px-2 text-sm focus:outline-none focus:border-sky-600"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </form>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SearchButton;
