import useSWR from "swr";
const base_URL=process.env.NEXT_PUBLIC_API_BASE_URL
const fetcher = async (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
    },
  }).then((res) => res.json());

export const UseMovies = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${base_URL}/movies`,
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
