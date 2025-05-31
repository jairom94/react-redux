import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import type { Advert, FilterByAdverts, Tag } from "./types";
import AdvertItem from "./partials/advert-item";
import { getAdverts, getTags } from "./service";
// import { DeleteIcon } from '../../components/icons/delete-icon';
import { CloseIcon } from "../../components/icons/close-icon";
import manage from "../../utils/manage";
import notFoundPlaceholder from '../../assets/not-found.jpg';
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
    <div className="m-[0_auto] max-w-[90dvw] py-5 md:grid md:max-w-[100dvw] md:grid-cols-[350px_1fr]">
        {/* Filtrado */}
      <div className="p-3 [&>div]:flex [&>div]:flex-col">
        <div>
          <label htmlFor="">Nombre</label>
          <input
            value={filters.name}
            onChange={handleChangeName}
            type="text"
            className="border"
          />
        </div>
        <div>
          <label htmlFor="compra">
            Compra
            <input
              onChange={handleChangeType}
              type="radio"
              name="sale"
              value="compra"
              id="compra"
            />
          </label>
          <label htmlFor="venta">
            Venta
            <input
              onChange={handleChangeType}
              type="radio"
              name="sale"
              value="venta"
              id="venta"
            />
          </label>
          <label htmlFor="todos">
            Todos
            <input
              onChange={handleChangeType}
              type="radio"
              name="sale"
              value="todos"
              id="todos"
            />
          </label>
        </div>
        <div>
          <div className="flex gap-2">
            {filters.tags.map((tag) => (
              <span
                key={tag}
                className="group flex items-center gap-1 rounded-3xl border px-3 has-[button:hover]:border-red-500"
              >
                {tag}
                <button
                  onClick={() => handleCloseTagFilter(tag)}
                  className="cursor-pointer text-xs hover:text-red-500"
                >
                  <CloseIcon />
                </button>
              </span>
            ))}
          </div>
          <label htmlFor="category">Seleccionar categoria</label>
          <select
            className="border"
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
      <ul className={`md:px-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4`}>
        {adverts.length > 0 && advertsFilters.length === 0 && (
          <li>
            <figure className="relative">
              <img
                className="aspect-video w-full rounded-md object-cover object-center"
                src={notFoundPlaceholder}
                alt={`photo ${name}`}
              />                            
            </figure>
            <p className="text-xl font-medium">No se encontro los anuncions que busca.</p>
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
