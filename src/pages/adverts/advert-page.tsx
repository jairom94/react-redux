import { useEffect } from "react";
import { Link, useParams } from "react-router";
// import { detailAdvert } from "./service";
// import type { Advert } from "./types";
import imagePlaceholder from "../../assets/placeholder_image.png";
import { DeliveryIcon } from "../../components/icons/delivery-icon";
import { DeleteIcon } from "../../components/icons/delete-icon";
// import ModalDelete from "./partials/modal-delete";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAdvertRedux } from "../../store/selectors";
import { advertLoaded, modalShowFullFilled } from "../../store/actions";
import type { Advert } from "./types";
import type { Modal } from "./partials/types";

const AdvertPage = () => {
  const { advertId } = useParams();
  // const [advert, setAdverts] = useState<Advert | null>(null);
  const advert = useAppSelector(getAdvertRedux)
  const dispatch = useAppDispatch()
  // const modalDeleteRef = useRef<HTMLDialogElement>(null)

  const photoClear = advert?.photo
    ? (advert?.photo as string)
    : imagePlaceholder;
  useEffect(() => {
    if (advertId) {
      dispatch(advertLoaded(advertId))
      // detailAdvert(advertId).then((data) => setAdverts(data));
    }
  }, [advertId,dispatch]);
  function handleShowModal(){
    const {name,id,photo,price,tags,sale} = advert!
    const advertToDelete:Advert = {name,id,photo,price,tags,sale}
        const modal:Modal<Advert> = {
          data:advertToDelete,
          type:'delete',
          visible:true
        }
        dispatch(modalShowFullFilled(modal))
    // const modal = modalDeleteRef.current
    // if(modal){
    //   modal.showModal()
    // }
  }
  return (
    <>
      <div className="flex-1">
        <div className="m-[0_auto] grid max-w-[80dvw] grid-cols-1 py-8 md:grid-cols-3 md:gap-5">
          <div className="flex py-7 tracking-wider md:col-span-3 md:py-0 [&>a]:cursor-pointer [&>p>a]:text-emerald-600">
            <p>
              <span>Ir a</span> <Link to={`/`}>Inicio</Link> /{" "}
              <Link to={`/adverts`}>
                <span>Anuncios</span>
              </Link>{" "}
              /{" "}
              <Link to={`/adverts/${advert?.id}`} className="capitalize">
                {advert?.name}
              </Link>
            </p>
          </div>

          <figure className="relative md:col-span-2">
            <img
              className="aspect-video rounded-md object-cover object-center"
              src={photoClear}
              alt="Product Image"
            />
            <span
              className={`absolute bottom-2 left-2 rounded-md px-3 py-2 leading-none font-medium tracking-wide text-gray-50 md:top-2 md:bottom-auto ${advert?.sale ? "bg-emerald-600" : "bg-orange-600"} `}
            >
              {advert?.sale ? "Venta" : "Compra"}
            </span>
          </figure>
          <div>
            <div className="flex pt-4 md:relative">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-700">
                  {advert?.price} €
                </h2>
                <h3 className="text-2xl font-bold tracking-wider text-gray-700 capitalize">
                  {advert?.name}
                </h3>
              </div>
              <div className="flex flex-col justify-center md:absolute md:right-0 md:-top-1">
                <button 
                onClick={handleShowModal}
                className="text-md flex cursor-pointer items-center gap-2 rounded-3xl bg-red-500 px-3 py-3 text-white transition-colors duration-300 hover:bg-red-700">
                  <DeleteIcon />
                  <span>Borrar este anuncio</span>
                </button>
              </div>
            </div>
            <p className="pt-3 tracking-wide text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ea
              fugiat molestias labore harum.
            </p>
            <div className="flex items-center gap-2 pt-3 font-medium text-violet-800">
              <span className="text-2xl">
                <DeliveryIcon />
              </span>
              <span>Envío Disponible</span>
            </div>
            <ul className="flex gap-3 py-8">
              {advert?.tags.map((tag) => (
                <li
                  className="text-md rounded-xl bg-gray-200 px-7 py-2 leading-none text-gray-700 capitalize shadow-lg border border-gray-400"
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-300 pt-4">
              <h4 className="pb-3 text-xl font-bold text-gray-700">
                Detalles del Producto
              </h4>
              <p className="tracking-wider text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolorem culpa recusandae aut fugit voluptatum eos est
                exercitationem nisi voluptatibus eligendi ab libero quos sint
                atque labore, maiores deleniti corporis sunt!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* { advert && <ModalDelete ref={modalDeleteRef} advert={advert} /> } */}
    </>
  );
};

export default AdvertPage;
