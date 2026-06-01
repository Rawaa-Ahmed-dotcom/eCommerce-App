
import type { AppDispatch } from '../store';
import { setPage } from '../store/features/productSlice';

export const handlePages = (numberOfPages : number , page : number , dispatch : AppDispatch) => {
  

  return Array.from({ length: numberOfPages }, (_, index) => {
    const pageNumber = index + 1;

    return (
      <button
        key={pageNumber}
        className={`${pageNumber === page ? "bg-[#416465] text-white" : "bg-transparent text-[#131D21]"} cursor-pointer  w-10 h-10 rounded-lg  font-bold font-[Inter] text-[1em] flex items-center justify-center`}
        onClick={() => dispatch(setPage(pageNumber))}
      >
        {pageNumber}
      </button>
    );
  });
};


