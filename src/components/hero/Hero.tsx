import Image from "next/image";
import { Movie } from "../movies/Movie";

const Hero = ({ movie }: { movie: Movie }) => (
  <section className="relative w-full h-full mb-8">
   
    <Image
      src={movie.thumbnail_url}
      alt={movie.title}
      fill
      priority
      className="object-cover object-center"
    />
=
    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />

 
    <div className="relative z-10 max-w-4xl pl-6 sm:pl-12 pt-20 space-y-4">
      <h1 className="text-4xl sm:text-6xl font-extrabold">{movie.title}</h1>
      <p className="max-w-lg text-sm sm:text-base text-zinc-300 line-clamp-3">
        {movie.description}
      </p>
      <div className="space-x-4">
        <button className="px-6 py-2 bg-white text-zinc-950 font-semibold rounded hover:bg-zinc-200 transition-colors">
          ▶️ Play
        </button>
        <button className="px-6 py-2 bg-zinc-700/70 text-white font-semibold rounded hover:bg-zinc-600 transition-colors">
          ℹ️ More Info
        </button>
      </div>
    </div>
  </section>
);

export default Hero;
