import { BASE_API } from "@/constants/api";
import axios from "axios";

const fetchCountVote = async (id: string) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_API}/vote/count`,
      params: {
        id,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export { fetchCountVote };
