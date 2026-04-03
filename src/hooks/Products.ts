import {useQuery} from "@tanstack/react-query";
import { getAllProducts, getCategoryProducts } from "../services/products";
export const useGetAllProducts = () => {
    const {data:products,error,isLoading} = useQuery({
        queryKey : ["products"],
        queryFn : getAllProducts
    })
    return {products,error,isLoading}
}
export const useGetCategoryProducts = (category:string) => {
    const {data:categoryProducts,error,isLoading} = useQuery({
        queryKey : ["products",category],
        queryFn : () => getCategoryProducts(category)
    })
    return {categoryProducts, error , isLoading};
}