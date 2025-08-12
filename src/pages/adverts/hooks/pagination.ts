import { useEffect, useRef, useState } from "react";
import type { Advert, FilterByAdverts } from "../types";

export function usePaginationn(advertsFilteredList: Advert[],filters:FilterByAdverts) {
//   console.log(advertsFilteredList);
  const [advertsToShow, setAdvertsToShow] = useState<Advert[]>([]);
  const limit = 8;
  const page = useRef(1);
  const totalPages = Math.ceil(advertsFilteredList.length / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  useEffect(() => {
    page.current = 1;
    setAdvertsToShow(advertsFilteredList.slice(0, limit));
  }, [filters]);
  function showPage(pageNumber: number) {
    const currentPage = pageNumber;
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const advertsToShow_ = advertsFilteredList.slice(startIndex, endIndex);
    setAdvertsToShow(advertsToShow_);
    console.log(advertsToShow_);
    
    page.current = currentPage;
  }
  return {
    advertsToShow,
    showPage,
    totalPages,
    pages,
    limit,
    page: page.current,
  };
}
