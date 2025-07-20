import { useState, type ChangeEvent } from "react";
import type { FilterByAdverts, RadioType } from "../types";
import TagsSelected from "../../../components/tags/tags-selected";

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
  const [typesAdvert, setTypesAdverts] = useState<RadioType[]>([
    { value: "compra", state: false },
    { value: "venta", state: false },
    { value: "todos", state: true },
  ]);
  const { tags } = filters
  
  function handleChangeTags(tag:string) {
    addTagToFilters(tag);   
  }  
  function handleRemoveTagSelected(tag:string) {       
    removeTagFromFIlters(tag)
  }
  function handleChangeType(e: ChangeEvent<HTMLInputElement>) {    
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
          { typesAdvert.map(typeAdvert => (
            <label 
            key={typeAdvert.value}
            className="grid grid-cols-[40px_1fr]" 
            htmlFor={typeAdvert.value}>
            <input
              checked={typeAdvert.state}
              onChange={handleChangeType}
              type="radio"
              name="sale"
              value={typeAdvert.value}
              id={typeAdvert.value}
            />
            <span>{`${typeAdvert.value.slice(0,1).toUpperCase()}${typeAdvert.value.slice(1)}`}</span>
          </label>
          )) }          
        </div>
      </div>
      {!showByCategory && (        
        <TagsSelected 
        onChangeTags={handleChangeTags}
        onDeleteTagSelected={handleRemoveTagSelected}   
        tagsSelected={tags}     
        />
      )}
    </div>
  );
};

export default Filter;
