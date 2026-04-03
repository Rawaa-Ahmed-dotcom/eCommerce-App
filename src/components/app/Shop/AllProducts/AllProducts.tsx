import { useGetAllProducts } from "../../../../hooks/Products"
import { type product } from "../../../../utils/products";
import SingleProduct from "../SingleProduct";
const AllProducts = () => {
  const {products,error,isLoading} = useGetAllProducts();
  
  return (
   <section className= "mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 ">
    {products && products.map((product : product) => <SingleProduct product={product}/>)}
   </section>
   
  )
}

export default AllProducts
