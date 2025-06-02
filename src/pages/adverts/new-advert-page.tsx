import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import RadioItem from "../../components/ui/radio-item";
import RadioGroup from "../../components/ui/radio-group";
import type { Advert, Tag } from "./types";
import FormField from "../../components/ui/form-field";
import CheckGroup from "../../components/ui/check-group";
import CheckItem from "../../components/ui/check-item";
import ButtonCustom from "../../components/ui/button";
import { createAdvert, getTags } from "./service";
import PreviewImage from "./partials/preview-image";
import { AxiosError } from "axios";

const NewAdvertPage = () => {
  const initialValueAdvert: Advert = {
    name: "",
    type: "",
    price: 0,
    photo: "",
    tags: [],
  };
  const [advert, setAdvert] = useState<Advert>(initialValueAdvert);
  const photoFile = useRef<HTMLInputElement>(null);
  // const previewImage = useRef<HTMLPictureElement>(null);

  const { name, type, price, tags, photo } = advert;
  //   const Tags = ["work", "lifestyle", "mobile", "motor"];
  const [Tags, setTags] = useState<Tag[]>([]);
  const [ranNum, setRanNum] = useState(Math.random);
  const isDisabled =
    !name || !type || Number(price) === 0 || tags.length === 0 || !photo;
  useEffect(() => {
    getTags()
      .then((tags_) => setTags(tags_))
      .catch((err) => alert(err));
  }, []);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newAdvert: Advert = {
      ...advert,
      [e.target.name]: e.target.value,
    };
    setAdvert(newAdvert);
  }
  function handleChangeRadioGroup(nameSelected: string) {
    if (nameSelected === "sale") {
      setAdvert((prevAdvert) => ({
        ...prevAdvert,
        type: nameSelected,
        sale: true,
      }));
    } else {
      setAdvert((prevAdvert) => ({
        ...prevAdvert,
        type: nameSelected,
        sale: false,
      }));
    }
  }
  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setAdvert((prevAdvert) => ({
        ...prevAdvert,
        photo: e.target.files![0],
      }));
    }
  }
  function handleClickRemovePhoto() {
    setAdvert((prevAdvert) => ({
      ...prevAdvert,
      photo: "",
    }));
    if (photoFile.current) {
      photoFile.current.value = "";
    }
  }
  function handleChangeCheckGroup() {
    return {
      onSelect(value: string) {
        setAdvert((prevAdvert) => ({
          ...prevAdvert,
          tags: [...tags, value],
        }));
      },
      onUnSelect(value: string) {
        const newTags = tags.filter((tag) => tag !== value);
        setAdvert((prevAdvert) => ({
          ...prevAdvert,
          tags: [...newTags],
        }));
      },
      clearSelects() {
        setAdvert((prevAdvert) => ({
          ...prevAdvert,
          tags: [],
        }));
      },
    };
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const advertFormData = new FormData();
      Object.entries(advert).forEach(([key, value]) => {
        if (key !== "type") {
          if (!value) return;
          if (value instanceof File || value instanceof Blob) {
            advertFormData.append(key, value);
          }          
          else if (Array.isArray(value)) {                       
            advertFormData.append(key, value.join(','));            
          }else{          
            advertFormData.append(key, String(value));
          }
            
        }
      });
      const resp = await createAdvert(advertFormData);      
      setAdvert(initialValueAdvert);
      setRanNum(Math.random);
      alert(`Anuncio creado: ${resp.name}`)
      // console.log(resp);
    } catch (error) {
      if(error instanceof AxiosError){
        alert(`Error: ${error.message}`)
      }
    }
  }
  // const cont = useRef(0)
  // cont.current+=1
  //   console.log(cont.current);
  return (
    <div
      className={`mx-auto my-0 flex max-w-[80dvw] flex-1 flex-col items-center justify-center pb-7 md:mx-auto md:my-0 md:max-w-[500px]`}
    >
      <form className={`flex w-full flex-col gap-2`} onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          id="name"
          label="Nombre"
        />
        <RadioGroup
          newKey={ranNum}
          name="type"
          onChange={handleChangeRadioGroup}
        >
          <RadioItem label="Compra" value="buy" id="compra" />
          <RadioItem label="Venta" value="sale" id="venta" />
        </RadioGroup>
        <FormField
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
          id="price"
          label="Precio"
        />
        <CheckGroup
          newKey={ranNum}
          name="tags"
          value={tags}
          onChange={handleChangeCheckGroup}
        >
          {Tags.map((tag) => (
            <CheckItem key={tag} label={tag} name={tag} id={tag} />
          ))}
        </CheckGroup>
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
                imageFile={photo as File}
                onClick={handleClickRemovePhoto}
              />
            )}
          </div>
        </div>
        <ButtonCustom
          disabled={isDisabled}
          className="cursor-pointer bg-emerald-500 py-2 text-gray-100 transition-colors duration-300 ease-in-out hover:bg-emerald-800 disabled:pointer-events-none disabled:opacity-60"
        >
          Crear Nuevo Anuncio
        </ButtonCustom>
      </form>
    </div>
  );
};

export default NewAdvertPage;
