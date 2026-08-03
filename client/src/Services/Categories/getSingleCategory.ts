import api from "../../api/config";
import axios from "axios";
import type { ApiErrorResponse } from "../../utils/Types";
export const getSignleCategory = async (slug: string) => {
  if (typeof slug !== "string" || !isNaN(Number(slug)))
    throw new Error("Slug must be string");
  try {
    const res = await api.get(`/categories/${slug}`);
    return res.data;
  } catch (err) {
    let errorMessage = "UnExpected Error!";

    if (axios.isAxiosError<ApiErrorResponse>(err)) {
      errorMessage = err.response?.data?.msg || err.message || errorMessage;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    throw new Error(errorMessage, { cause: err });
  }
};
