import type { ReactNode } from "react";
// import { useAuth } from "./context";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../store";
import { getAuth } from "../../store/selectors";

interface RequireAuthProps {
  children: ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
  // const { isLogged } = useAuth();
  const isLogged = useAppSelector(getAuth)
  const location = useLocation();
  // console.log(location.pathname);
  
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default RequireAuth;