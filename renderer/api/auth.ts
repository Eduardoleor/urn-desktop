import { BASE_API } from "@/constants/api";
import axios from "axios";

const fetchSignIn = async (username: string, password: string) => {
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_API}/auth/validate`,
      data: {
        username,
        password,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export { fetchSignIn };
