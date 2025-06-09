"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  id: number | any;
  title: string;
  release_date: any;
  desc: string;
  thumbnail_url: string;
  handleClick?(id: number): any;
}

const MovieCard = ({
  title,
  desc,
  release_date,
  thumbnail_url,
  id,
  handleClick,
}: MovieCardProps) => {
  const router = useRouter();
  const handleImageClick = () => {
    router.push(`/movieDetail/${id}`);
  };
  
  return (
    <div
      className=" group cursor-pointer"
      onClick={() => handleClick && handleClick(id)}
    >
      <div className=" max-w-sm w-full h-[450px]">
        <Image
          src={thumbnail_url}
          alt={title || "Movie poster"}
          width={500}
          height={750}
          onClick={handleImageClick}
          className="rounded-lg w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
        />
      </div>
      <div>
        <div className="text-2xl-bold">{title}</div>
        {/* <p>{desc}</p> */}
        <span>{release_date}</span>
      </div>
    </div>
  );
};

export default MovieCard;
