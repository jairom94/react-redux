import { useEffect } from "react";
import type { Tag } from "./types";
import AdvertItem from "./partials/advert-item";
import { useSearchParams } from "react-router";
import Filter from "./partials/filter";
import NoAdverts from "./partials/no-adverts";
import BreadCrumbs from "./partials/bread-crumbs";
import { useAppDispatch, useAppSelector } from "../../store";
import { filtersRedux, getAdvertsRedux, getUi, isLoadedAdverts } from "../../store/selectors";
import { advertsLoaded } from "../../store/actions";
import { useNotification } from "../../components/ui/notification/context";
import AdvertsSkeleton from "./adverts-skeleton";
import manage from "../../utils/manage";
import { usePagination } from "./partials/pagination/pagination";
import Pagination from "./partials/pagination/pagination-comp"


const AdvertsPage = () => {  
  const { addNoti } = useNotification();
  
  const dispatch = useAppDispatch();
  
  const adverts = useAppSelector(getAdvertsRedux);

  const isLoaded = useAppSelector(isLoadedAdverts);
    
  
  const [searchParams] = useSearchParams();
  const searchByCategory = searchParams.get("category") ?? "";

  const { error, pending } = useAppSelector(getUi);
  
  useEffect(() => {    
    dispatch(advertsLoaded(searchByCategory))            
  }, [searchByCategory, dispatch]);

  useEffect(()=>{
    if(error){
      addNoti({
          message: `ADVERTS PAGE: ${error}`,
          type: "error",          
      });
    }
  },[error])
  
  
  const filters = useAppSelector(filtersRedux)

  const advertsFilteredList =  manage.filterAdverts(adverts, filters);  
  const { page,pages,advertsToShow,showPage } = usePagination(advertsFilteredList,filters);

  
 
  

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
        { isLoaded && (advertsFilteredList.length == 0) && <NoAdverts /> }
        { pending 
        ? ( <AdvertsSkeleton /> ) 
        : advertsToShow.map((advert) => (
          <AdvertItem
            key={advert.id}
            advert={advert}            
          />
        )) }
      </ul>
      {/* Paginación */}
      <Pagination 
        showPage={showPage} 
        pages={pages} 
        page={page}
      />
    </div>
  );
};

export default AdvertsPage;
