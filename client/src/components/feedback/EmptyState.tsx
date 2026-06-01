import { CircleMinus } from "lucide-react"

const EmptyState = ({handleResetFilters} : {handleResetFilters : () => void}) => {
  return (
    <div className="flex items-center w-full justify-center flex-col gap-[0.5em]">
        <CircleMinus size={35} color="#3C5F60"/>
        <h2 className="text-[#3C5F60] font-bold text-3xl">No Available Products</h2>
        <button className="transition duration-300 text-[#586062] text-[1.5em] hover:underline cursor-pointer" onClick={handleResetFilters}>Clear filters</button>
    </div>
  )
}

export default EmptyState
