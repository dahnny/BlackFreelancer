import axios from "axios";
import { baseUrl } from "./constants";

export const login = async () => {
  try {
    const response = await axios.get(`${baseUrl}/auth/login`);
    return response;
  } catch (error) {
      console.log(error)
  }
};
