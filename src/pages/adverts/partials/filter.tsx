import { useEffect, type ChangeEvent } from "react";
import type { Tag } from "../types";
import TagsSelected from "../../../components/tags/tags-selected";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./filter.css";
import { useAppDispatch, useAppSelector } from "../../../store";
import { filterAdverts } from "../../../store/actions";
import { filtersRedux, getAdvertsRedux } from "../../../store/selectors";

interface FilterProps {  
  showByCategory: Tag | "";  
}
const Filter = ({  
  showByCategory,
}: FilterProps) => {
  const filters = useAppSelector(filtersRedux);  
  const { name,tags,price:[min,max],sale,range:[start,end] } = filters
  
  const typesAdvert = ['venta','compra','todos']

  const saleSelected = sale === true ? 'venta' : sale === false ? 'compra' : 'todos'

  const adverts = useAppSelector(getAdvertsRedux);

  const dispatch = useAppDispatch()  

  useEffect(()=>{
    // dispatch(advertsFiltered())    
  },[dispatch])
  
  useEffect(()=>{
    if(!adverts.length) return;

    const prices = adverts.map(a => a.price)
    const start = prices.reduce((acum,acc)=> acum > acc ? acum = acc : acum,+Infinity)
    const end = prices.reduce((acum,acc)=> acum < acc ? acum = acc : acum,-Infinity)
    dispatch(filterAdverts({...filters,price:[start,end],range:[start,end]}))      
  },[adverts])
  

  function handleChangeTags(tag: Tag) {
    // addTagToFilters(tag);
    dispatch(filterAdverts({
      ...filters,
      tags: [...filters.tags, tag]
    }))
  }
  function handleRemoveTagSelected(tag: Tag) {
    // removeTagFromFIlters(tag);
    dispatch(filterAdverts({
      ...filters,
      tags: [...filters.tags.filter((t) => t !== tag)]
    }))
  }
  function handleChangeType(e: ChangeEvent<HTMLInputElement>) {
    switch (e.target.value) {
      case "compra":        
        dispatch(filterAdverts({...filters,sale:false}))
        break;    
      case "venta":        
        dispatch(filterAdverts({...filters,sale:true}))
        break;
      default:{
        const temp = {...filters}
        delete temp.sale
        dispatch(filterAdverts(temp))        
        break;
      }
    }

  }
  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {    
    dispatch(filterAdverts({
      ...filters,
      name:e.target.value
    }))
  }
  function handleChangeRange(value:number[]|number){
    dispatch(filterAdverts({...filters,price:value as [number,number]}))      
  }

  function handleClick(){
    const temp = { ...filters,name:'',price:[start,end] as [number,number],tags:[] }
    delete temp.sale
    dispatch(filterAdverts(temp))
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
          value={name}
          onChange={handleChangeName}
          type="search"
          className="rounded-lg border border-emerald-500 text-emerald-800 px-3 py-1 focus:outline-emerald-700"
        />
      </div>
      <fieldset>
        <legend className="text-lg font-medium tracking-wider text-emerald-700">
          Tipo de Anuncio
        </legend>
        <div className="flex flex-col gap-2 [&>label]:cursor-pointer [&>label]:text-emerald-600 [&>label]:transition-colors [&>label]:duration-300 [&>label]:has-checked:font-medium [&>label]:has-checked:text-emerald-800 [&>label>input]:cursor-pointer">
          {typesAdvert.map((typeAdvert) => (
            <label
              key={typeAdvert}
              className="grid grid-cols-[40px_1fr]"
              htmlFor={typeAdvert}
            >
              <input
                checked={typeAdvert === saleSelected}
                onChange={handleChangeType}
                type="radio"
                name="sale"
                value={typeAdvert}
                id={typeAdvert}
              />
              <span>{`${typeAdvert.slice(0, 1).toUpperCase()}${typeAdvert.slice(1)}`}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="px-4">
        <legend className="text-lg font-medium tracking-wider text-emerald-700 pb-2">Rango de precio</legend>
        <div className="flex justify-between text-lg text-emerald-600 font-medium">
          <span>$ {min}</span>
          <span>$ {max}</span>
        </div>
        <Slider          
          range
          min={start}
          max={end}
          step={1}
          value={[min,max]}
          allowCross={false}
          pushable={20}
          onChange={handleChangeRange}
        />
      </div>
      {!showByCategory && (
        <TagsSelected
          onChangeTags={handleChangeTags}
          onDeleteTagSelected={handleRemoveTagSelected}
          tagsSelected={tags}
        />
      )}
      <div>
        <button
        onClick={handleClick} 
        className="bg-emerald-700 py-3 rounded-md tracking-wide text-white hover:bg-emerald-600 transition-colors duration-300 cursor-pointer"
        >Limpiar filtros</button>
      </div>
    </div>
  );
};

export default Filter;
