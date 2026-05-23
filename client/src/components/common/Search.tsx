import { SearchIcon } from "lucide-react";
const Search = () => {
  return (
    <div className="relative md:block hidden">
      <input
        type="search"
        placeholder="search..."
        className="border border-[#C0C8C7] rounded-[99px] bg-[#EAF5FA]  py-[0.625em] pl-[2.5em] pr-[1em] focus:outline-none"
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
