import { SearchIcon } from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { setKeyword } from "../../store/features/productSlice";


const Search = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="relative md:block hidden">
      <input
        type="search"
        placeholder="search..."
        className="border border-[#C0C8C7] rounded-[99px] bg-[#EAF5FA]  py-[0.625em] pl-[2.5em] pr-[1em] focus:outline-none"
        onChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      <SearchIcon
        className="absolute left-3 top-[50%] transform translate-y-[-50%]"
        color="#414848"
        size={20}
      />
    </div>
  );
};

export default Search;
