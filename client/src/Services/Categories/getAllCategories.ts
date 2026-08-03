import api from "../../api/config";
import axios from "axios";
import type{ ApiErrorResponse } from "../../utils/Types";
export const getAllCategories = async () => {
    try {
        const res  = await api.get("/categories");
        const categories = await res.data
        return categories;
    } catch (err) {
      let errorMessage = "UnExpected Error!";

    if (axios.isAxiosError<ApiErrorResponse>(err)) {
      errorMessage = err.response?.data?.msg || err.message || errorMessage;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    throw new Error(errorMessage, { cause: err });
    }
}