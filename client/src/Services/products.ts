import type { ProductParams } from "../utils/Types";
import api from "../api/config";

export const getAllProducts = async (productParams: ProductParams) => {
  try {
    const res = await api.get(`/products`, {
      params: productParams,
    });

    return res.data;
  } catch (err) {
    const serverMessage: string = err.response?.data?.msg;
    const fallbackMessage = err.msg || "Unexpected Error!";
    throw new Error(serverMessage || fallbackMessage, { cause: err });
  }
};

export const getSingleProduct = async (slug: string) => {
  try {
    const res = await api.get(`/products/${slug}`);
    return res.data;
  } catch (err) {
    const serverMessage: string = err.response?.data?.msg;
    const fallbackMessage: string = err.msg || "Unexpteced Error!";
    throw new Error(serverMessage || fallbackMessage, { cause: err });
  }
};
