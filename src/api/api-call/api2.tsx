import { User } from "@/components/movies/Movie";
import axios from "axios";
import { useRouter } from "next/navigation";
const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchUserProfile = async (): Promise<User | null> => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  try {
    const { data } = await axios.get<{ data: User }>(`${base_url}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    return null;
  }
};

export const handleDelete = async (
  password: string,
  router: ReturnType<typeof useRouter>
): Promise<{ success: boolean; error?: string }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return { success: false, error: "Unauthorized" };
  }

  try {
    await axios.post(
      `${base_url}/profile-delete`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete account:", err);
    if (err.response?.status === 401) {
      return { success: false, error: "Incorrect password." };
    }
    return { success: false, error: "Account deletion failed." };
  }
};
