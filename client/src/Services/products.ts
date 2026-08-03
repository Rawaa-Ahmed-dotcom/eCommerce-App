import type { ProductParams,ApiErrorResponse } from "../utils/Types";
import api from "../api/config";
import axios from "axios";


export const getAllProducts = async (productParams: ProductParams) => {
  try {
    const res = await api.get(`/products`, {
      params: productParams,
    });

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

export const getSingleProduct = async (slug: string) => {
  try {
    const res = await api.get(`/products/${slug}`);
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
