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

const fetchLocalRepresentative = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_API}/vote/representative-local`,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const fetchGovRepresentative = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_API}/vote/representative-gov`,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const fetchUrnStatus = async (id: string) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_API}/vote/urn-status`,
      params: {
        id,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const fetchUrnResult1 = async (id: string) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_API}/vote/urn-results-1`,
      params: {
        id,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const fetchUrnResult2 = async (id: string) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_API}/vote/urn-results-2`,
      params: {
        id,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const fetchUrnResult3 = async (id: string) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_API}/vote/urn-results-3`,
      params: {
        id,
      },
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
  fetchLocalRepresentative,
  fetchGovRepresentative,
  fetchUrnStatus,
  fetchUrnResult1,
  fetchUrnResult2,
  fetchUrnResult3,
};
