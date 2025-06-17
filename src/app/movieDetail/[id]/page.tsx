"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchMovieById } from "../../../api/api-call/api";
import ReviewBox from "@/components/reviewbox/Reviewbox";
import { Movie1 } from "@/components/movies/Movie";

/* interface PageProps {
  params: { id: string };
} */

export default function Page() {
  const params = useParams();
  const id = Number(params.id);
  const [movie, setMovie] = useState<Movie1 | null>(null);
  // const [movieRating, setMovieRating] = useState(0);

  useEffect(() => {
    if (id) {
      fetchMovieById(id)
        .then((data) => setMovie(data))
        .catch((error) => console.error("Error fetching movie detail:", error));
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-8">
      {movie ? (
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="relative w-full aspect-video bg-black">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
              src={movie.video_url}
              allowFullScreen
            />
          </div>

          <div className="flex flex-col md:flex-row p-6 gap-8">
            <div className="md:w-1/3">
              <Image
                src={movie.thumbnail_url}
                alt={movie.title}
                width={300}
                height={200}
                className="rounded-xl object-cover shadow-md"
              />
            </div>

            <div className="md:w-2/3 space-y-4">
              <h1 className="text-3xl font-extrabold">{movie.title}</h1>

              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p>
                  <span className="font-semibold">Release Date:</span>{" "}
                  {movie.release_date}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {movie.duration} mins
                </p>
                <p>
                  <span className="font-semibold">Rating:</span> {movie.rating}
                </p>

                <p>
                  <span className="font-semibold">Language:</span>{" "}
                  {movie.language}
                </p>
              </div>

              <p className="text-md leading-relaxed">{movie.description}</p>

              <div>
                <p className="font-semibold mb-1">Genres:</p>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <ReviewBox />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-lg font-semibold">
          Loading...
        </div>
      )}
    </div>
  );
}
