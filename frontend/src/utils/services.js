import axios from "axios";
import { baseUrl } from "./constants";
import { toast } from "react-toastify";
import { NotificationError } from "../components/ui/Notification";

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/${id}`);
    const { data } = response.data;
    if (!data) return;
    return data;
  } catch (error) {
    console.log({ error });
    toast(<NotificationError text="Failed to fetch users" />);
  }
};

export const uploadImage = async (image) => {
  const photoData = new FormData();
  photoData.append("photo", image);
  const response = await axios.post(
    `${baseUrl}/api/users/upload/image`,
    photoData
  );
  const { data } = response.data;
  if (!data) return;
  return data;
};

export const updateUser = async (payload) => {
  const { id, firstName, lastName, description, profilePhoto } = payload;
  const response = await axios.put(`${baseUrl}/api/users/${id}`, {
    firstName,
    lastName,
    description,
    profilePhoto,
  });
  const { data } = response.data;
  if (!data) return;
  return data;
};
