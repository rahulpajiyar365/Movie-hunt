"use client";
import axios from "axios";

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
  const movieURL = process.env.NEXT_PUBLIC_API_MOVIE_DETAIL_URL;

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://192.168.1.212:8000/api/movie-detail/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Movie detail", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching movies detail:", error);
    throw error;
  }
};
export const moviefavorite = async (id: number) => {
  const movieURL = process.env.NEXT_PUBLIC_API_MOVIE_DETAIL_URL;

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://192.168.1.212:8000/api/favorite/${id}`,
      {

        headers: {
          Authorization: `Bearer ${token}`,

        },
        
      }
    );
    console.log("Favorite Movie", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    throw error;
  }
};
