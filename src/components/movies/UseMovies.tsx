import useSWR from "swr";

const fetcher = async (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
    },
  }).then((res) => res.json());

export const UseMovies = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "http://192.168.1.212:8000/api/movies",
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000, 
    }
  );

  return {
    movies: data ?? [],
    isLoading,
    error, 
    mutate,
  };
};
