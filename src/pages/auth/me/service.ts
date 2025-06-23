import { client } from "../../../api/client";
import type { UserResponse } from "../types";

const URL_AUTH = "/api/auth";

export const userLogged = async () => {
  const url = `${URL_AUTH}/me`;
  const response = await client.get<UserResponse>(url);
  return response.data;
};