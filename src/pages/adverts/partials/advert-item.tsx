// import { Link } from 'react-router';
import type { Advert } from "../types";
// import Modal from './modal';
import { type MouseEvent } from "react";
// import Modal from "./modal";
// import { CloseIcon } from "../../../components/icons/close-icon";
// import { DeleteIcon } from "../../../components/icons/delete-icon";
// import { deleteAdvert } from "../service";
// import { createPortal } from "react-dom";
import { Link } from "react-router";
import photoPlaceholder from '../../../assets/placeholder_image.png';
// import { useNotification } from "../../../components/ui/notification/context";
// import { AxiosError } from "axios";
// import ModalUpdate from "./modal-update";
// import ModalDelete from "./modal-delete";
import { useAppDispatch } from "../../../store";
import { modalShowFullFilled } from "../../../store/actions";
import type { Modal } from "./types";
// import ModalUpdate from "./modal-update";


interface AdvertItemProps {
  advert:Advert;
  // modalToUpdate:HTMLDialogElement;
  // onDelete:(advertId:string)=>void;
}
const AdvertItem = ({advert:{name,id,photo,price,tags,sale}}: AdvertItemProps) => {
  // const refModal = useRef<HTMLDialogElement>(null);  
  // const refModalUpdate = useRef<HTMLDialogElement>(null);

  const photoClear = photo ? photo as string : photoPlaceholder 
  
  
  const dispatch = useAppDispatch()
  
  // const { addNoti } = useNotification()

  function handleClickShowModal(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    const advertToDelete:Advert = {name,id,photo,price,tags,sale}
    const modal:Modal<Advert> = {
      data:advertToDelete,
      type:'delete',
      visible:true
    }
    dispatch(modalShowFullFilled(modal))
    // if (refModal.current) {      
    //   refModal.current.showModal();
    // }
  }

  function handleClickShowModalUpdate(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    const advertToUpdate:Advert = {name,id,photo,price,tags,sale}
    const modal:Modal<Advert> = {
      data:advertToUpdate,
      type:'update',
      visible:true
    }
    dispatch(modalShowFullFilled(modal))
    // console.log(modal);
    
    // modalToUpdate.showModal();    
    // if (refModalUpdate.current) {      
    // }
  }

  // function handleClickCloseModal(e: MouseEvent<HTMLButtonElement>) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   refModal.current?.close();
  // }
  // async function handleClickAccept(e: MouseEvent<HTMLButtonElement>) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   try {
  //     // await deleteAdvert(id as string);
  //     onDelete(id as string);
  //     addNoti({
  //       message:'Advert was deleted, successfull',
  //       id:crypto.randomUUID(),
  //       type:'success',
  //       createdAt:Date.now()
  //     })
  //   } catch (error) {
  //     if(error instanceof AxiosError){
  //       addNoti({
  //         message: error.response?.data?.message ?? error.message ?? "",
  //         id:crypto.randomUUID(),
  //         type:'error',
  //         createdAt:Date.now()
  //       })
  //     }
  //   }

  //   refModal.current?.close();
  // }
  return (
    <>
      <li className={`transition-all duration-300 hover:scale-[1.01] group`}>
        <Link to={`/adverts/${id}`}>
          <figure className="relative">
            <img
              className="aspect-video w-full rounded-md object-cover object-center"
              src={photoClear}
              alt={`photo ${name}`}
            />
            <span
              className={`absolute bottom-2 left-2 rounded-md px-2 font-medium tracking-wide text-gray-50 transition-opacity duration-300 group-hover:opacity-0 ${sale ? "bg-emerald-600" : "bg-orange-600"} `}
            >
              {sale ? "Venta" : "Compra"}
            </span>
            <div
              className={`overlay pointer-events-none absolute right-0 bottom-0 left-0 flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-white/20 to-transparent px-5 py-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:backdrop-blur-sm`}
            >
              <button
                className={`pointer-events-auto rounded-md bg-red-700 px-5 py-1 text-white hover:bg-red-500`}
                onClick={handleClickShowModal}
              >
                Borrar
              </button>
              <button
                className={`cursor pointer-events-auto rounded-md bg-sky-700 px-5 py-1 text-white hover:bg-sky-500`}
                onClick={handleClickShowModalUpdate}
              >
                Editar
              </button>
            </div>
          </figure>
          <div className="">
            <h3 className="text-2xl font-medium">{name}</h3>
            <h4 className="text-xl font-bold text-red-700 group-hover:text-red-500">
              $ {price}
            </h4>
            <div>
              <ul className="flex gap-2 pt-2">
                {tags.map((tag) => (
                  <li
                    className="rounded-xl border border-emerald-500 px-2 text-sm text-emerald-800"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Link>
      </li>
      {/* {createPortal(<Modal ref={refModal}>
        <div className="">
          <header className="relative bg-sky-700 py-4">
            <div className="flex items-center gap-2 px-3 select-none">
              <span className="text-white">
                <DeleteIcon />
              </span>
              <h2 className="text-white">Borrar Producto</h2>
            </div>
            <button
              className="cursor-pointer absolute top-2 right-2 rounded-md bg-red-500 px-2 py-2 font-bold text-white hover:bg-red-300"
              onClick={handleClickCloseModal}
            >
              <span className="flex items-center justify-center text-xs">
                <CloseIcon />
              </span>
            </button>
          </header>
          <div className="px-3 pt-2 pb-3">
            <h3 className="py-3 pointer-events-none select-none">
              Está seguo de borrar el producto:
              <br />
              <span className="font-bold">{name}</span>
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
      </Modal>,document.body)} */}
      {/* {
        createPortal(<ModalDelete ref={refModal} advert={{name,id,photo,price,tags,sale}} />,
          document.body
        )
      } */}
      {/* {
        createPortal(
        <ModalUpdate advert={{name,id,photo,price,tags,sale} as Advert} ref={refModalUpdate} />,
        document.body)
      }       */}
    </>
  );
}; 

export default AdvertItem;
