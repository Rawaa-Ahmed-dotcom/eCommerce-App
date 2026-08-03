import api from "../../api/config";
import { AxiosError } from "axios";
import type{ ApiErrorResponse } from "../../utils/Types";
export const getAllCategories = async () => {
    try {
        const res  = await api.get("/categories");
        const categories = await res.data
        return categories;
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
            const errorMessage: string = error.response?.data?.msg as string;
            const fallbackError: string = error.message || "UnExpected Error!";
        
            throw new Error(errorMessage || fallbackError, { cause: err });
    }
}