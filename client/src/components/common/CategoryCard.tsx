import type { CategoryInterface } from "../../utils/Types"
import { Link } from "react-router"
const CategoryCard = ({cat } : {cat : CategoryInterface}) => {

  return (
    <div className="flex flex-col items-center mb-4">
        <div className="w-fit">
            <img src = {cat.img.url} alt = {cat.title} className="max-w-full object-cover rounded-xl"/>
            <Link className="text-[#31D21] text-[1.5em] font-medium mt-[1em] md:mt-[1.5em] capitalize text-center md:text-left" to = {`/categories/${cat.slug}`}>{cat.title}</Link>
        </div>
    </div>
  )
}

export default CategoryCard
