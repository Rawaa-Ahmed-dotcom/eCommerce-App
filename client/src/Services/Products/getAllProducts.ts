import axios from "axios";
import type { ProductParams } from "../../utils/Types";

export const getAllProducts = async (productParams: ProductParams) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/products`, {
      params: productParams,
    });

    return res.data;
  } catch (err) {
    const serverMessage:string = err.response?.data?.message;
    const fallbackMessage = err.message || "Unexpected Error!";
    throw new Error(serverMessage || fallbackMessage, {cause : err});
  }
};
