import { useEffect } from "react";
import type { Tag } from "./types";
import AdvertItem from "./partials/advert-item";
import { useSearchParams } from "react-router";
import Filter from "./partials/filter";
import NoAdverts from "./partials/no-adverts";
import BreadCrumbs from "./partials/bread-crumbs";
import { useAppDispatch, useAppSelector } from "../../store";
import { filtersRedux, getAdvertsRedux, getUi } from "../../store/selectors";
import { advertsLoaded } from "../../store/actions";
import { useNotification } from "../../components/ui/notification/context";


const AdvertsPage = () => {  
  const { addNoti } = useNotification();
  
  const dispatch = useAppDispatch();
  
  const adverts = useAppSelector(getAdvertsRedux);
    
  
  const [searchParams] = useSearchParams();
  const searchByCategory = searchParams.get("category") ?? "";

  const { error, pending } = useAppSelector(getUi);


  useEffect(() => {    
    dispatch(advertsLoaded(searchByCategory))        
    if(error){
      addNoti({
          message: `ADVERTS PAGE: ${error}`,
          type: "error",
          id: crypto.randomUUID(),
          createdAt: Date.now(),
      });
    }
  }, [searchByCategory, dispatch,error]);

  
  const filters = useAppSelector(filtersRedux)

  const advertsFilteredList = adverts.filter( advert => { 
          const testing:boolean[] = [] 
          if(filters.name){ 
              testing.push(advert.name.toLowerCase().startsWith(filters.name)) 
          } 
          if(filters.sale !== undefined){ 
              testing.push( advert.sale === filters.sale ) 
          } 
          if(filters.price){ 
              const [min,max] = filters.price  
              if(min >= 0 && max > min){ 
                  testing.push( (advert.price >= min && advert.price <= max) ) 
              } 
          } 
          if(filters.tags && filters.tags.length > 0){ 
              testing.push( filters.tags.some(tag=>advert.tags.includes(tag)) ) 
          } 
          return testing.every(Boolean) 
  })
  // console.log(advertsFilteredList);
  


  
  return (
    <div className="m-[0_auto] w-full max-w-[90dvw] py-5 md:grid md:max-w-[100dvw] md:grid-cols-[minmax(350px,350px)_1fr]">
      {/* BreadCrumbs */}
      <div className="col-span-2 flex p-7 tracking-wider [&>a]:cursor-pointer [&>p>a]:text-emerald-600">
        <BreadCrumbs searchByCategory={searchByCategory} />
      </div>

      {/* Filtrado */}
      <Filter               
        showByCategory={searchByCategory as Tag}        
      />
      <ul
        className={`grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-[minmax(280px,_1fr)_minmax(280px,_1fr)_minmax(280px,_1fr)_minmax(280px,_1fr)] md:px-2`}
      >
        {(advertsFilteredList.length == 0) &&
          !pending && <NoAdverts />}
        { pending ? (
          <>
          <div className="card">
            <div className="min-h-[250px] rounded-2xl border border-gray-500 bg-gray-50 card-skeleton"></div>
            <p className="min-h-[30px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
            <p className="min-h-[30px] max-w-[100px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
          </div>
          <div className="card">
            <div className="min-h-[250px] rounded-2xl border border-gray-500 bg-gray-50 card-skeleton"></div>
            <p className="min-h-[30px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
            <p className="min-h-[30px] max-w-[100px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
          </div>
          <div className="card">
            <div className="min-h-[250px] rounded-2xl border border-gray-500 bg-gray-50 card-skeleton"></div>
            <p className="min-h-[30px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
            <p className="min-h-[30px] max-w-[100px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
          </div>
          <div className="card">
            <div className="min-h-[250px] rounded-2xl border border-gray-500 bg-gray-50 card-skeleton"></div>
            <p className="min-h-[30px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
            <p className="min-h-[30px] max-w-[100px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
          </div>
          <div className="card">
            <div className="min-h-[250px] rounded-2xl border border-gray-500 bg-gray-50 card-skeleton"></div>
            <p className="min-h-[30px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
            <p className="min-h-[30px] max-w-[100px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
          </div>
          <div className="card">
            <div className="min-h-[250px] rounded-2xl border border-gray-500 bg-gray-50 card-skeleton"></div>
            <p className="min-h-[30px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
            <p className="min-h-[30px] max-w-[100px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
          </div>
          <div className="card">
            <div className="min-h-[250px] rounded-2xl border border-gray-500 bg-gray-50 card-skeleton"></div>
            <p className="min-h-[30px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
            <p className="min-h-[30px] max-w-[100px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
          </div>
          <div className="card">
            <div className="min-h-[250px] rounded-2xl border border-gray-500 bg-gray-50 card-skeleton"></div>
            <p className="min-h-[30px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
            <p className="min-h-[30px] max-w-[100px] mt-2 bg-gray-50 rounded-2xl border border-gray-500 card-skeleton"></p>
          </div>
          </>
        ) 
        : advertsFilteredList.map((advert) => (
          <AdvertItem
            key={advert.id}
            advert={advert}            
          />
        ))}
      </ul>      
    </div>
  );
};

export default AdvertsPage;
