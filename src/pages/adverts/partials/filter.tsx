import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { FilterByAdverts, RadioType, Tag } from "../types";
import { getTags } from "../service";
import { CloseIcon } from "../../../components/icons/close-icon";

interface FilterProps {
  filters: FilterByAdverts;
  addTagToFilters: (tag: string) => void;
  removeTagFromFIlters: (tag: string) => void;
  showByCategory: string;
  onChangeTypeFilters: (type: string) => void;
  onChangeName: (name: string) => void;
}
const Filter = ({
  filters,
  addTagToFilters,
  removeTagFromFIlters,
  showByCategory,
  onChangeTypeFilters: changeTypeFilters,
  onChangeName: changeName,
}: FilterProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const selectFilterRef = useRef<HTMLSelectElement>(null);
  const [typesAdvert, setTypesAdverts] = useState<RadioType[]>([
    { value: "compra", state: false },
    { value: "venta", state: false },
    { value: "todos", state: true },
  ]);

  useEffect(() => {
    getTags()
      .then((data) => setTags(data))
      .catch((err) => alert(err));
  }, []);
  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    if (!e.target.value) return;
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   tags: [...filters.tags, e.target.value],
    // }));
    addTagToFilters(e.target.value);
    Array.from(e.target.children).forEach((el) => {
      if (el.textContent === e.target.value) {
        el.setAttribute("disabled", "");
      }
    });
    Array.from(e.target.children)[0].removeAttribute("selected");
  }
  function handleCloseTagFilter(tag: string) {
    const temp = [...filters.tags.filter((t) => t !== tag)];
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   tags: temp,
    // }));
    removeTagFromFIlters(tag);
    const selectFilter = selectFilterRef.current;
    if (!selectFilter) return;
    Array.from(selectFilter.children).forEach((el) => {
      if (el.textContent === tag) {
        el.removeAttribute("disabled");
      }
    });
    if (temp.length === 0) {
      Array.from(selectFilter.children)[0].setAttribute("selected", "");
    } else {
      Array.from(selectFilter.children)[0].removeAttribute("selected");
    }
  }
  function handleChangeType(e: ChangeEvent<HTMLInputElement>) {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   type: e.target.value,
    // }));
    changeTypeFilters(e.target.value);
    let temp = typesAdvert.map((ta) => {
      if (ta.value === e.target.value) {
        return { ...ta, state: true };
      }
      return { ...ta, state: false };
    });
    setTypesAdverts(temp);
    temp = [];
  }
  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   name: e.target.value,
    // }));
    changeName(e.target.value);
  }
  return (
    <div className="flex flex-col gap-5 p-3 md:sticky md:top-[var(--h-header-md)] md:left-0 md:self-start [&>div]:flex [&>div]:flex-col">
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
        <div className="flex flex-col gap-2 [&>label]:cursor-pointer [&>label]:text-emerald-600 [&>label]:transition-colors [&>label]:duration-300 [&>label]:has-checked:font-medium [&>label]:has-checked:text-emerald-800 [&>label>input]:cursor-pointer">
          <label className="grid grid-cols-[40px_1fr]" htmlFor="compra">
            <input
              checked={typesAdvert[0].state}
              onChange={handleChangeType}
              type="radio"
              name="sale"
              value="compra"
              id="compra"
            />
            <span>Compra</span>
          </label>
          <label className="grid grid-cols-[40px_1fr]" htmlFor="venta">
            <input
              checked={typesAdvert[1].state}
              onChange={handleChangeType}
              type="radio"
              name="sale"
              value="venta"
              id="venta"
            />
            <span>Venta</span>
          </label>
          <label className="grid grid-cols-[40px_1fr]" htmlFor="todos">
            <input
              checked={typesAdvert[2].state}
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
      {!showByCategory && (
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
            <option value="">Seleccionar opcion</option>
            {tags.map((tag) => (
              <option value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Filter;
