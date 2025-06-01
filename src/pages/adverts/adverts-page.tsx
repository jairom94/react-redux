import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import type { Advert, FilterByAdverts, Tag } from "./types";
import AdvertItem from "./partials/advert-item";
import { getAdverts, getTags } from "./service";
// import { DeleteIcon } from '../../components/icons/delete-icon';
import { CloseIcon } from "../../components/icons/close-icon";
import manage from "../../utils/manage";
import notFoundPlaceholder from "../../assets/not-found.jpg";
// import { Link } from 'react-router';

const AdvertsPage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [tags, settags] = useState<Tag[]>([]);
  const [filters, setFilters] = useState<FilterByAdverts>({
    name: "",
    type: "",
    tags: [],
  });
  const selectFilterRef = useRef<HTMLSelectElement>(null);
  // const { name,tags } = filters;
  useEffect(() => {
    getAdverts()
      .then((data) => setAdverts(data))
      .catch((err) => alert(err));
    getTags()
      .then((tags_) => settags(tags_))
      .catch((err) => alert(err));
  }, []);
  const advertsFilters = useMemo(() => {
    return manage.filterAdverts(adverts, filters);
  }, [adverts, filters]);

  function handleDeleteAdvert(advertId: string) {
    const newAdverts = adverts.filter(({ id }) => id !== advertId);
    setAdverts(newAdverts);
  }
  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      name: e.target.value,
    }));
  }
  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: [...filters.tags, e.target.value],
    }));
    Array.from(e.target.children).forEach((el) => {
      if (el.textContent === e.target.value) {
        el.setAttribute("disabled", "");
      }
    });
  }
  function handleCloseTagFilter(tag: string) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: [...prevFilters.tags.filter((t) => t !== tag)],
    }));
    const selectFilter = selectFilterRef.current;
    if (!selectFilter) return;
    Array.from(selectFilter.children).forEach((el) => {
      if (el.textContent === tag) {
        el.removeAttribute("disabled");
      }
    });
  }
  function handleChangeType(e: ChangeEvent<HTMLInputElement>) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: e.target.value,
    }));
  }
  return (
    <div className="m-[0_auto] max-w-[90dvw] py-5 md:grid md:max-w-[100dvw] md:grid-cols-[minmax(350px,350px)_1fr]">
      {/* Filtrado */}
      <div className="flex flex-col gap-5 p-3 [&>div]:flex [&>div]:flex-col">
        <h3 className="font-sans text-2xl font-medium tracking-widest text-emerald-900">
          Filtros
        </h3>
        <div>
          <label
            htmlFor=""
            className="text-lg font-medium tracking-wider text-emerald-700"
          >
            Nombre
          </label>
          <input
            value={filters.name}
            onChange={handleChangeName}
            type="text"
            className="rounded-lg border border-emerald-500 px-3 py-1 focus:outline-emerald-700"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium tracking-wider text-emerald-700">
            Tipo de Anuncio
          </h3>
          <div
          className="flex flex-col gap-2 [&>label]:text-emerald-600 [&>label]:cursor-pointer [&>label>input]:cursor-pointer [&>label]:has-checked:text-emerald-800 [&>label]:has-checked:font-medium [&>label]:transition-colors [&>label]:duration-300"
          >
            <label
              className="grid grid-cols-[40px_1fr]"
              htmlFor="compra"
            >
              <input
                onChange={handleChangeType}
                type="radio"
                name="sale"
                value="compra"
                id="compra"
              />
              <span>Compra</span>
            </label>
            <label
              className="grid grid-cols-[40px_1fr]"
              htmlFor="venta"
            >
              <input
                onChange={handleChangeType}
                type="radio"
                name="sale"
                value="venta"
                id="venta"
              />
              <span>Venta</span>
            </label>
            <label
              className="grid grid-cols-[40px_1fr]"
              htmlFor="todos"
            >
              <input
                onChange={handleChangeType}
                type="radio"
                name="sale"
                value="todos"
                id="todos"
              />
              <span>Todos</span>
            </label>
          </div>
        </div>
        <div className="flex gap-2">
          <label
            className="text-lg font-medium tracking-wider text-emerald-700"
            htmlFor="category"
          >
            Seleccionar categoria
          </label>
          <ul className="flex gap-2">
            {filters.tags.map((tag) => (
              <li
                key={tag}
                className={`group flex items-center justify-center gap-1 rounded-3xl border border-emerald-500 px-3 py-1 font-medium text-emerald-800 has-[button:hover]:border-red-500`}
              >
                <span className="leading-none transition-colors has-[+button:hover]:text-red-500">
                  {tag}
                </span>
                <button
                  onClick={() => handleCloseTagFilter(tag)}
                  className="cursor-pointer p-0 text-xs hover:text-red-500"
                >
                  <CloseIcon />
                </button>
              </li>
            ))}
          </ul>
          <select
            className="rounded-lg border border-emerald-500 px-3 py-1 font-medium text-emerald-800 focus:outline-emerald-700"
            onChange={handleChangeCategory}
            ref={selectFilterRef}
            name="tags"
            id="category"
          >
            <option value="" disabled>
              Seleccionar opcion
            </option>
            {tags.map((tag) => (
              <option value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>
      <ul
        className={`grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-[minmax(280px,_1fr)_minmax(280px,_1fr)_minmax(280px,_1fr)_minmax(280px,_1fr)] md:px-2`}
      >
        {adverts.length > 0 && advertsFilters.length === 0 && (
          <li>
            <figure className="relative">
              <img
                className="aspect-video w-full rounded-md object-cover object-center"
                src={notFoundPlaceholder}
                alt={`photo ${name}`}
              />
            </figure>
            <p className="text-xl font-medium">
              No se encontro los anuncions que busca.
            </p>
          </li>
        )}
        {advertsFilters.map((advert) => (
          <AdvertItem
            key={advert.id}
            advert={advert}
            onDelete={handleDeleteAdvert}
          />
        ))}
      </ul>
    </div>
  );
};

export default AdvertsPage;
