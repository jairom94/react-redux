export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  [key: string]: string
}

export interface Login {
  email: string;
  password: string;
  remember: boolean;  
  [key: string]: string | boolean;
}
export type LoginClean = {  
  [P in keyof Omit<Login, 'remember'>]: string; 
};

export interface LoginResponse {
  accessToken: string;
}

export interface UserResponse extends Omit<User, "password"> {
  id: string;
  createdAt: string;
}


