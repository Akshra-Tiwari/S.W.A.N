import axios from "axios";

export const getDashboardStats =
  async () => {
    const res =
      await axios.get(
        "${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats"
      );

    return res.data;
  };