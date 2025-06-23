import { NavLink } from "react-router";
import { useAuth } from "../../pages/auth/context";
import { LogoutIcon } from "../../components/icons/logout-icon";
import { useRef } from "react";
import ModalConfirm from "../adverts/partials/modal-confirm";

export default function AuthButtonDesktop() {
  const { isLogged } = useAuth();  
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
      className={`rounded-4xl border-2 border-emerald-500 px-16 py-2 font-medium transition-opacity duration-300 hover:opacity-70 cursor-pointer flex items-center gap-3 `}
      onClick={handleLogoutClick}
    >
      <span>
        <LogoutIcon />
      </span>
      <span>Logout</span>
    </button>
    <ModalConfirm ref={modalRef} />
   </>
  ) : (
    <NavLink
      className={`rounded-4xl border-2 border-emerald-500 px-6 py-2 font-medium transition-opacity duration-300 hover:opacity-70`}
      to="/signup"
    >
      Regístrate o inicia sesión
    </NavLink>
  );
}
