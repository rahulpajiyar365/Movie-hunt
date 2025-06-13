import axios from "axios";
import { useRouter } from "next/navigation";
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  image_url: string;
}

export const fetchUserProfile = async (): Promise<User | null> => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  try {
    const { data } = await axios.get<{ data: User }>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data.data;
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    return null;
  }
};

export const handleDelete = async (id: number) => {
  const router = useRouter();
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile-delete`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("Account deleted");
    router.push("/login");
  } catch (err) {
    console.error("Failed to delete account:", err);
    alert("Failed to delete account");
  }
};
