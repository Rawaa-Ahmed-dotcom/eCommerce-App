import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../../Services/Products/getAllProducts"
import type { ProductParams } from "../../utils/Types";


export const useGetAllProducts = (productParams:ProductParams) => {
    const productsQuery = useQuery({
        queryKey : ["products", productParams],
        queryFn : () => getAllProducts(productParams),
        placeholderData : keepPreviousData,
    });
    return productsQuery;
}