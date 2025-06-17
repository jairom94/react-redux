import { Outlet } from "react-router";
import RequireAuth from "../../pages/auth/require-auth";

export function LayoutAdverts() {  
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
}