import { NavLink } from "react-router";
import { useAuth } from "../../pages/auth/context";
import { logOut } from "../../pages/auth/service";
// import { UserIcon } from "../../components/icons/user-icon";
import { LogoutIcon } from "../../components/icons/logout-icon";

export default function AuthButtonDesktop() {
  const { isLogged, onLogout } = useAuth();
  const handleLogoutClick = async () => {
    await logOut();
    onLogout();
  };
  return isLogged ? (
    <button
      className={`rounded-4xl border-2 border-emerald-500 px-16 py-2 font-medium transition-opacity duration-300 hover:opacity-70 cursor-pointer flex items-center gap-3 `}
      onClick={handleLogoutClick}
    >
      <span>
        <LogoutIcon />
      </span>
      <span>Logout</span>
    </button>
  ) : (
    <NavLink
      className={`rounded-4xl border-2 border-emerald-500 px-6 py-2 font-medium transition-opacity duration-300 hover:opacity-70`}
      to="/signup"
    >
      Regístrate o inicia sesión
    </NavLink>
  );
}
