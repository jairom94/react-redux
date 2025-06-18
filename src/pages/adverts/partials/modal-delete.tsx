import { type ComponentProps, type RefObject } from "react";
import Modal from "./modal";
import { DeleteIcon } from "../../../components/icons/delete-icon";
import { CloseIcon } from "../../../components/icons/close-icon";
import type { Advert } from "../types";
import { deleteAdvert } from "../service";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

interface ModalDeleteProps extends ComponentProps<'dialog'> {
    advert:Advert;
}

const ModalDelete = ({advert:{id,name},...props}:ModalDeleteProps) => { 
    const navigate = useNavigate()   
    function handleClickCloseModal(){
        const modalRef:RefObject<HTMLDialogElement> = props.ref as RefObject<HTMLDialogElement>
        modalRef.current.close()
    }
    async function handleClickAccept(){
        try {
            await deleteAdvert(id as string)
            navigate('/adverts')
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
              <DeleteIcon />
            </span>
            <h2 className="text-white">Borrar Producto</h2>
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
            Está seguo de borrar el producto:
            <br />
            <span className="font-bold capitalize">{name}</span>
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

export default ModalDelete;
