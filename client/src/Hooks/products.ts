import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllProducts, getSingleProduct } from "../Services/products";
import type { ProductParams } from "../utils/Types";

export const useGetAllProducts = (productParams: ProductParams) => {
  const productsQuery = useQuery({
    queryKey: ["products", productParams],
    queryFn: () => getAllProducts(productParams),
    placeholderData: keepPreviousData,
  });
  return productsQuery;
};

export const useGetSingleProduct = (slug : string) => {
    const productQuery = useQuery({
        queryKey : ["products" , slug],
        queryFn : () => getSingleProduct(slug)
    });
    return productQuery;
}