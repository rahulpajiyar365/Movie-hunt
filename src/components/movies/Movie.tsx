export interface Movie {
  id: number;
  title: string;
  duration?: number;
  description?: string;
  release_date?: string;
  thumbnail_url: string;
  rating?: string;
  language?: string;
  trailer_url?: string;
}
interface Genre {
  id: number;
  name: string;
}

 export interface Movie1 {
  id: number;
  title: string;
  description: string;
  release_date: string;
  duration: number;
  rating: string;
  language: string;
  thumbnail_url: string ;
  trailer_url: string;
  video_url: string;
  genres: Genre[];
}
/*  interface Movie {
  id: number;
  title: string;
  thumbnail_url: string;
  release_date: string;
} */

 export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  image_url: string;
}

export interface Favorite {
  movie: Movie;
}

 export interface MovieProps {
  id: number;
  title: string;
  release_date: string;
  description: string | undefined;
  thumbnail_url: string;

  handleClick: any;
}
