// RedirectIfAuthenticated.tsx
import { Navigate } from "react-router";
import { useAppSelector } from "../../store";
import { getAuth } from "../../store/selectors";
import type { ReactNode } from "react";

interface AuthRedirectProps {
    redirectPath?: string;
    children: ReactNode;
}

export const AuthRedirect = ({ redirectPath = "/", children }:AuthRedirectProps) => {
  const isLogged = useAppSelector(getAuth);
  if (isLogged) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
