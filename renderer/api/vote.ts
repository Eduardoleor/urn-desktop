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

const fetchRegisterVote = async ({
  id,
  representative_id,
  representative_type,
  voter_id,
}: {
  id: string;
  voter_id: string;
  representative_id: string;
  representative_type: string;
}) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_API}/vote/add`,
      data: {
        id,
        voter_id,
        representative_id,
        representative_type,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const fetchFederalRepresentative = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_API}/vote/representative-federal`,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export {
  fetchCountVote,
  fetchRegisterVoter,
  fetchRegisterVote,
  fetchFederalRepresentative,
};
