import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { detailAdvert } from "./service";
import type { Advert } from "./types";
import imagePlaceholder from '../../assets/placeholder_image.png';

const AdvertPage = () => {
  const { advertId } = useParams();
  const [advert, setAdverts] = useState<Advert | null>(null);
  const photoClear = advert?.photo ? advert?.photo as string : imagePlaceholder
  useEffect(() => {
    if (advertId) {
      detailAdvert(advertId).then((data) => setAdverts(data));
    }
  }, [advertId]);
  return (
    <div className="flex-1">
      <div className="m-[0_auto] max-w-[80dvw] py-8 grid grid-cols-1 md:grid-cols-3 md:gap-5">
        <div className="md:col-span-3 md:py-0 tracking-wider py-7 flex [&>p>a]:text-emerald-600 [&>a]:cursor-pointer">
          <p ><span>Ir a</span> <Link to={`/`}>Inicio</Link> / <Link to={`/adverts`}><span>Anuncios</span></Link> / <Link to={`/adverts/${advert?.id}`} className="capitalize">{advert?.name}</Link></p>
        </div>
        
        <figure className="relative md:col-span-2">
          <img
            className="aspect-video rounded-md object-cover object-center"
            src={photoClear}
            alt="Product Image"
          />
          <span
            className={`leading-none absolute bottom-2 left-2 rounded-md px-3 py-2 font-medium tracking-wide text-gray-50 ${advert?.sale ? "bg-emerald-600" : "bg-orange-600"} `}
          >
            {advert?.sale ? "Venta" : "Compra"}
          </span>
        </figure>
        <div>
          <h2 className="text-2xl font-bold tracking-wider">{advert?.name}</h2>
          <h3 className="text-4xl font-extrabold text-red-700">
            $ {advert?.price}
          </h3>
          <ul className="flex gap-3 pt-2">
            {advert?.tags.map((tag) => (
              <li
                className="leading-none py-1 text-md rounded-xl border-2 border-emerald-400 text-emerald-800 px-3"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdvertPage;
