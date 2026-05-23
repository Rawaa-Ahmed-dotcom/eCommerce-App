import { useQuery } from "@tanstack/react-query"
import { getSignleCategory } from "../../Services/Categories/getSingleCategory"

export const useGetSingleCategory = (slug : string) => {
    const {data:category ,  isLoading , isError , error} = useQuery({
        queryKey : ["categories" , slug],
        queryFn : () =>  getSignleCategory(slug)
    });
    return {category , isLoading, isError , error};
}