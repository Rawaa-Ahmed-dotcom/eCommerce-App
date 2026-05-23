import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../Services/Categories/getAllCategories";

export const useGetAllCategories = () => {
    const {data : categories , isLoading , isError , error} = useQuery({
        queryKey : ["categories"],
        queryFn : getAllCategories
    })
    return {categories , isLoading , isError , error};
};
