import { type ComponentProps, type RefObject } from "react";
import Modal from "./modal";
import { CloseIcon } from "../../../components/icons/close-icon";
import { useUserInformation } from "../../auth/me/context";
import { AxiosError } from "axios";
import { useAuth } from "../../auth/context";
import { logOut } from "../../auth/service";
import { UserIcon } from "../../../components/icons/user-icon";

const ModalConfirm = (props: ComponentProps<'dialog'>) => {   
    const { onLogout } = useAuth();           
    const { user,onUserLogout } = useUserInformation()    

    function handleClickCloseModal(){
        const modalRef:RefObject<HTMLDialogElement> = props.ref as RefObject<HTMLDialogElement>
        modalRef.current.close()
    }
    async function handleClickAccept(){
        try {
          await logOut();
          onLogout();
          onUserLogout()          
        } catch (error) {
          if(error instanceof AxiosError){
            alert(error)
          }
        }
        
    }
  return (
    <Modal {...props}>
      <div>
        <header className="relative bg-sky-700 py-4 px-7">
          <div className="flex items-center gap-2 px-3 select-none">
            <span className="text-white">
              <UserIcon />
            </span>
            <h2 className="text-white">Cerrar Sesión</h2>
          </div>
          <button
            className="absolute top-3 right-3 cursor-pointer rounded-md bg-red-500 px-2 py-2 font-bold text-white hover:bg-red-300"
            onClick={handleClickCloseModal}
          >
            <span className="flex items-center justify-center text-xs">
              <CloseIcon />
            </span>
          </button>
        </header>
        <div className="px-7 pt-2 pb-3">
          <h3 className="pointer-events-none py-3 select-none">
            ¿<span className="capitalize">{ user ? user.name : 'Unknow' }</span> estas seguro de cerrar sesión?            
          </h3>
          <div className="flex gap-2">
            <button
              className="cursor-pointer rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
              onClick={handleClickAccept}
            >
              Aceptar
            </button>
            <button
              className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
              onClick={handleClickCloseModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
