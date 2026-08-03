import api from "../../api/config";
import { AxiosError } from "axios";
import type{ ApiErrorResponse } from "../../utils/Types";
export const getSignleCategory = async (slug: string) => {
    if (typeof slug !== "string" || !isNaN(Number(slug)))
        throw new Error("Slug must be string");
    try {
    const res = await api.get(
        `/categories/${slug}`,
    );
    return res.data;
    } catch (err) {
        const error = err as AxiosError<ApiErrorResponse>;
            const errorMessage: string = error.response?.data?.msg as string;
            const fallbackError: string = error.message || "UnExpected Error!";
        
            throw new Error(errorMessage || fallbackError, { cause: err });
        throw new Error("Failed to fetch category", { cause: err });
    }
};
