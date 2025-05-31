import { NavLink } from "react-router";
import { useAuth } from "../../pages/auth/context";
import { logOut } from "../../pages/auth/service";
import { UserIcon } from "../../components/icons/user-icon";
import { LogoutIcon } from "../../components/icons/logout-icon";

export default function AuthButton() {
  const { isLogged, onLogout } = useAuth();
  const handleLogoutClick = async () => {
    await logOut();
    onLogout();
  };
  return isLogged ? (
    <button 
    className="size-full flex flex-col justify-center items-center cursor-pointer"
    onClick={handleLogoutClick}>
      <span>
        <LogoutIcon />
      </span>
      <span>Logout</span>
    </button>
  ) : (
    <NavLink
      className={({ isActive }) => (isActive ? "active-navbar" : "")}
      to="/login"
    >
      <span>
        <UserIcon />
      </span>
      <span>Login</span>
    </NavLink>
  );
}
