export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

export type Login = Omit<User, "name" | "username">;

export interface LoginResponse {
  accessToken: string;
}

export interface UserResponse extends Omit<User, "password"> {
  id: string;
  createdAt: string;
}
