import { NavLink } from "react-router";
// import { useAuth } from "../../pages/auth/context";
// import { logOut } from "../../pages/auth/service";
import { UserIcon } from "../../components/icons/user-icon";
import { LogoutIcon } from "../../components/icons/logout-icon";
// import { useUserInformation } from "./me/context";
import { useRef } from "react";
import ModalConfirm from "../adverts/partials/modal-confirm";
import { useAppSelector } from "../../store";
import { getAuth } from "../../store/selectors";

export default function AuthButton() {
  // const { isLogged } = useAuth();
  const isLogged = useAppSelector(getAuth)
  const modalRef = useRef<HTMLDialogElement>(null)

  const handleLogoutClick = async () => {
    const modalConfirm = modalRef.current
    if(modalConfirm){
      modalConfirm.showModal()
    }
    
  };
  return isLogged ? (
    <>
    <button 
    className="size-full flex flex-col justify-center items-center cursor-pointer"
    onClick={handleLogoutClick}>
      <span>
        <LogoutIcon />
      </span>
      <span>Logout</span>
    </button>
    <ModalConfirm ref={modalRef} />
    </>
  ) : (
    <NavLink
      className={({ isActive }) => (isActive ? "active-navbar" : "")}
      to="/signup"
    >
      <span>
        <UserIcon />
      </span>
      <span>Login/Signup</span>
    </NavLink>
  );
}
