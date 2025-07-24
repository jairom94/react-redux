import { useRef, useState, type ChangeEvent, type ComponentProps, type FormEvent, type RefObject } from "react";
import Modal from "./modal";
import type { Advert, AdvertResponse } from "../types";
import FormField from "../../../components/ui/form-field";
import PreviewImage from "./preview-image";
import ButtonCustom from "../../../components/ui/button";
import { useNotification } from "../../../components/ui/notification/context";
import { AxiosError } from "axios";
import SaleCheck from "../../../components/ui/salecheck/salecheck";
import TagsSelected from "../../../components/tags/tags-selected";

interface ModalUpdateProps extends ComponentProps<"dialog"> {
  advert: Advert;
}
const ModalUpdate = ({ advert, ...props }: ModalUpdateProps) => {
  const { addNoti } = useNotification();
  const initialValues:AdvertResponse = {
    id:advert.id as string,
    name:advert.name,
    price:advert.price,
    tags:advert.tags,
    sale:advert.sale as boolean,
    photo:advert.photo as string,
    createdAt:advert.createdAt as string
  }
  const [advertOld, setAdvertOld] = useState<AdvertResponse>(initialValues)  
  const photoFile = useRef<HTMLInputElement>(null)

  const { name,price,tags,sale,photo } = advertOld  
  


  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const advertClear: AdvertResponse = {
      ...advertOld,
      [e.target.name]: e.target.value,
    };
    setAdvertOld(advertClear);
  }
  function onSale(){
    setAdvertOld((prevAdvert) => ({
        ...prevAdvert,
        sale:true
      }));
  }
  function onBuy(){
    setAdvertOld((prevAdvert) => ({
        ...prevAdvert,
        sale:false
      }));
  }
  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setAdvertOld((prevAdvert) => ({
        ...prevAdvert,
        photo: e.target.files![0],
      }));
    }
  }
  function handleClickRemovePhoto() {
    setAdvertOld((prevAdvert) => ({
      ...prevAdvert,
      photo: "",
    }));
    if (photoFile.current) {
      photoFile.current.value = "";
    }
  }
  function handleRemoveTagSelected(tag:string) {
    const oldTags = tags as string[]
    const tagsClear = oldTags.filter(t => t !== tag)
    setAdvertOld((prevAdvert) => ({
      ...prevAdvert,
      tags:tagsClear,
    }));    
  }
  function handleChangeTags(tag:string) {
    const oldTags = tags as string[]    
    const tagsClear = [...oldTags, tag]    
    setAdvertOld((prevAdvert) => ({
      ...prevAdvert,
      tags:tagsClear,
    }));    
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
        // const advertToUpdate:AdvertSimple = {
        //   name:advert.name,
        //   sale:advert.sale as boolean,
        //   price: advert.price,
        //   tags:advert.tags,          
        // }
    } catch (error) {
      if (error instanceof AxiosError) {
        addNoti({
          message: error.response?.data?.message ?? error.message ?? "",
          id: crypto.randomUUID(),
          type: "error",
          createdAt: Date.now(),
        });
      }
    }
  }

  function handleClickCloseModal(){
          const modalRef:RefObject<HTMLDialogElement> = props.ref as RefObject<HTMLDialogElement>
          modalRef.current.close()
      }
  return (
    <Modal {...props}>
      <div className="px-4 py-6 min-w-[60vw] md:min-w-[450px]">
        <form 
        className={`flex w-full flex-col gap-2`} 
        onSubmit={handleSubmit}>
          <FormField
            type="text"
            name="name"
            value={name as string}
            onChange={handleChange}
            id="name"
            label="Nombre"
          />
          <SaleCheck 
          sale={sale as boolean} 
          onChangeSale={onSale} 
          onChangeBuy={onBuy} 
          />
          <FormField
            type="number"
            name="price"
            value={price as number}
            onChange={handleChange}
            id="price"
            label="Precio"
          />
          <TagsSelected  
          tagsSelected={tags as string[]}
          onDeleteTagSelected={handleRemoveTagSelected}
          onChangeTags={handleChangeTags}
          />
          <div className="flex flex-col gap-2">
            <label
              className={`block cursor-pointer rounded-md border border-dashed py-7 text-center`}
            >
              <span className="text-sm">
                Arrastra tus imágenes aquí o haz clic para seleccionar
              </span>
              <input
                type="file"
                accept="image/*"
                name="file"
                ref={photoFile}
                onChange={handleChangeFile}
                className="hidden"
              />
            </label>
            <div className="relative w-[150px]">
              {photo && (
                <PreviewImage
                  imageFile={photo as string}
                  onClick={handleClickRemovePhoto}
                />
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <ButtonCustom  
            onClick={handleClickCloseModal}          
            className="cursor-pointer rounded-md bg-emerald-500 px-3 py-2 text-gray-100 transition-colors duration-300 ease-in-out hover:bg-emerald-800 disabled:pointer-events-none disabled:opacity-60"
          >
            Editar Anuncio
          </ButtonCustom>
          <button
              className="cursor-pointer rounded-md bg-red-300 px-4 py-2 text-gray-800 hover:bg-red-400"
              onClick={handleClickCloseModal}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalUpdate;
