export interface Movie {
  id: number;
  title: string;
  duration: number;
  description?: string;
  release_date: string;
  thumbnail_url: string;
  rating: string;
  language: string;
  trailer_url?: string;
}