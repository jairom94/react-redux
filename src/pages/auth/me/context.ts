import { createContext, useContext } from "react";
import type { UserResponse } from "../types";

export const UserContext = createContext<{
    user:UserResponse | null;
    onUserLogged:()=>void;
    onUserLogout:()=>void;
}>({
  user:null,
  onUserLogged: ()=>{},
  onUserLogout: ()=>{},
});

export function useUserInformation() {
  const user = useContext(UserContext);
  return user;
}
