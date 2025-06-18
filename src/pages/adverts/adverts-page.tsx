import { useEffect, useMemo, useState } from "react";
import type { Advert, FilterByAdverts } from "./types";
import AdvertItem from "./partials/advert-item";
import { getAdverts } from "./service";
import manage from "../../utils/manage";
import { useSearchParams } from "react-router";
import Filter from "./partials/filter";
import NoAdverts from "./partials/no-adverts";
import BreadCrumbs from "./partials/bread-crumbs";


const AdvertsPage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);  
  const [filters, setFilters] = useState<FilterByAdverts>({
    name: "",
    type: "",
    tags: [],
  });  

  const [searchParams] = useSearchParams();
  const searchByCategory = searchParams.get("category") ?? "";

  useEffect(() => {
    getAdverts(searchByCategory)
      .then((data) => setAdverts(data))
      .catch((err) => alert(err));    
  }, [searchByCategory]);

  const advertsFilters = useMemo(() => {
    return manage.filterAdverts(adverts, filters);
  }, [adverts, filters]);

  function handleDeleteAdvert(advertId: string) {
    const newAdverts = adverts.filter(({ id }) => id !== advertId);
    setAdverts(newAdverts);
  }  
  function changeName(name: string) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      name,
    }));
  }
  function changeTypeFilters(type:string){
    setFilters((prevFilters) => ({
      ...prevFilters,
      type,
    }));
  }
  function addTagToFilters(tag:string){
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: [...filters.tags, tag],
    }));
  }
  function removeTagFromFIlters(tag:string){
    const temp = [...filters.tags.filter((t) => t !== tag)];
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: temp,
    }));
  }
  return (
    <div className="m-[0_auto] max-w-[90dvw] py-5 md:grid md:max-w-[100dvw] md:grid-cols-[minmax(350px,350px)_1fr]">
      
      {/* BreadCrumbs */}
      <div className="col-span-2 flex p-7 tracking-wider [&>a]:cursor-pointer [&>p>a]:text-emerald-600">
        <BreadCrumbs  searchByCategory={searchByCategory} />
      </div>

      {/* Filtrado */}     
      <Filter 
      filters={filters} 
      onChangeName={changeName} 
      onChangeTypeFilters={changeTypeFilters}
      showByCategory={searchByCategory}
      addTagToFilters={addTagToFilters}
      removeTagFromFIlters={removeTagFromFIlters}
      />
      <ul
        className={`grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-[minmax(280px,_1fr)_minmax(280px,_1fr)_minmax(280px,_1fr)_minmax(280px,_1fr)] md:px-2`}
      >
        {(adverts.length > 0 || adverts.length == 0) &&
          advertsFilters.length === 0 && (
            <NoAdverts />            
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
