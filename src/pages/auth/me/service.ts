import { client } from "../../../api/client";
import storage from "../../../utils/storage";
import type { UserResponse } from "../types";

const URL_AUTH = "/api/auth";

export const userLogged = async () => {
  const url = `${URL_AUTH}/me`;
  const response = await client.get<UserResponse>(url);
  storage.set('me',response.data.username)
  return response.data;
};