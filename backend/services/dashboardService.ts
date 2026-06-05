import axios from "axios";

export const getDashboardStats =
  async () => {
    const res =
      await axios.get(
        "http://localhost:5000/api/dashboard/stats"
      );

    return res.data;
  };