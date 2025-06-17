"use client";
import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchMovies = async () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await axios.get(`${baseURL}/movies`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const movieDetail = async (id: number) => {
  // const movieURL = process.env.NEXT_PUBLIC_API_MOVIE_DETAIL_URL;

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${base_url}/movie-detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Movie detail", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching movies detail:", error);
    throw error;
  }
};

export const moviefavorite = async (id: number) => {
  // const movieURL = process.env.NEXT_PUBLIC_API_MOVIE_DETAIL_URL;

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${base_url}/movie-detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Favorite Movie", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    throw error;
  }
};

export const fetchMovieById = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${base_url}/movie-detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    throw error;
  }
};
