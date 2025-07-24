import { useEffect, useMemo, useState } from "react";
import type { FilterByAdverts, Tag } from "./types";
import AdvertItem from "./partials/advert-item";
// import { getAdverts } from "./service";
import manage from "../../utils/manage";
import { useSearchParams } from "react-router";
import Filter from "./partials/filter";
import NoAdverts from "./partials/no-adverts";
import BreadCrumbs from "./partials/bread-crumbs";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAdvertsRedux, getUi } from "../../store/selectors";
import { advertsLoaded } from "../../store/actions";
// import { AxiosError } from "axios";
import { useNotification } from "../../components/ui/notification/context";
// import { createPortal } from "react-dom";
// import ModalUpdate from "./partials/modal-update";
// import { getAdverts } from "./service";

const AdvertsPage = () => {
  // const [adverts, setAdverts] = useState<Advert[]>([]);
  const { addNoti } = useNotification();
  const dispatch = useAppDispatch();
  const adverts = useAppSelector(getAdvertsRedux);
  const [filters, setFilters] = useState<FilterByAdverts>({
    name: "",
    type: "",
    tags: [],
  });

  const [searchParams] = useSearchParams();
  const searchByCategory = searchParams.get("category") ?? "";

  const { error, pending } = useAppSelector(getUi);

  // const refModalUpdate = useRef<HTMLDialogElement>(null);

  // const { visible,htmlDialog,data } = useAppSelector(getModalShowed)

  useEffect(() => {
    dispatch(advertsLoaded(searchByCategory));
    if(error){
      addNoti({
          message: `ADVERTS PAGE: ${error}`,
          type: "error",
          id: crypto.randomUUID(),
          createdAt: Date.now(),
      });
    }
  }, [searchByCategory, dispatch,error]);

  // useEffect(()=>{
  //   if(visible && htmlDialog){
  //     htmlDialog.showModal()
  //   }
  // },[visible])

  const advertsFilters = useMemo(() => {
    return manage.filterAdverts(adverts, filters);
  }, [adverts, filters]);

  function changeName(name: string) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      name,
    }));
  }
  function changeTypeFilters(type: string) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type,
    }));
  }
  function addTagToFilters(tag: Tag) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: [...filters.tags, tag],
    }));
  }
  function removeTagFromFIlters(tag: Tag) {
    const temp = [...filters.tags.filter((t) => t !== tag)];
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: temp,
    }));
  }

  // console.log('render...');
  
  return (
    <div className="m-[0_auto] w-full max-w-[90dvw] py-5 md:grid md:max-w-[100dvw] md:grid-cols-[minmax(350px,350px)_1fr]">
      {/* BreadCrumbs */}
      <div className="col-span-2 flex p-7 tracking-wider [&>a]:cursor-pointer [&>p>a]:text-emerald-600">
        <BreadCrumbs searchByCategory={searchByCategory} />
      </div>

      {/* Filtrado */}
      <Filter
        filters={filters}
        onChangeName={changeName}
        onChangeTypeFilters={changeTypeFilters}
        showByCategory={searchByCategory as Tag}
        addTagToFilters={addTagToFilters}
        removeTagFromFIlters={removeTagFromFIlters}
      />
      <ul
        className={`grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-[minmax(280px,_1fr)_minmax(280px,_1fr)_minmax(280px,_1fr)_minmax(280px,_1fr)] md:px-2`}
      >
        {(adverts.length > 0 || adverts.length == 0) &&
          advertsFilters.length === 0 && !pending && <NoAdverts />}
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
        : advertsFilters.map((advert) => (
          <AdvertItem
            key={advert.id}
            advert={advert}
            // modalToUpdate={refModalUpdate.current}
            // onDelete={handleDeleteAdvert}
          />
        ))}
      </ul>      
    </div>
  );
};

export default AdvertsPage;
