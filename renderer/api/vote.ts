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

const fetchRegisterVoter = async (id: string, key: string) => {
  console.log(id, key);
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_API}/vote/register`,
      data: {
        id,
        voter_key: key,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export { fetchCountVote, fetchRegisterVoter };
