import { Outlet } from "react-router";
import RequireAuth from "../../pages/auth/require-auth";
// import UserProvider from "../../pages/auth/me/user-provider";

export function LayoutAdverts() {  
  return (
    <RequireAuth>      
        <Outlet />      
    </RequireAuth>
  );
}