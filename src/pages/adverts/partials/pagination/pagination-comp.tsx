import { type MouseEvent } from "react";

interface PaginationProps {
  showPage: (pageNumber: number) => void;
  pages: number[];
  page: number;
}

const Pagination = ({ showPage, pages,page }: PaginationProps) => {

  function handlePageChannge(e: MouseEvent<HTMLButtonElement>) {
    showPage(Number(e.currentTarget.value));
  }
  return (
    <div className="flex items-center gap-2 py-5 md:col-start-2">
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`cursor-pointer rounded-md bg-emerald-600 px-3 py-1 text-white transition-colors duration-300 hover:bg-emerald-700 ${page === pageNumber ? "bg-emerald-900" : ""}`}
          value={pageNumber}
          onClick={handlePageChannge}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
