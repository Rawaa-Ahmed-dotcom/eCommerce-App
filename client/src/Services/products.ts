import axios from "axios";
import type { ProductParams } from "../utils/Types";

export const getAllProducts = async (productParams: ProductParams) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/products`, {
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
    const res = await axios.get(`http://localhost:5000/api/products/${slug}`);
    return res.data;
  } catch (err) {
    const serverMessage: string = err.response?.data?.msg;
    const fallbackMessage: string = err.msg || "Unexpteced Error!";
    throw new Error(serverMessage || fallbackMessage, { cause: err });
  }
};
