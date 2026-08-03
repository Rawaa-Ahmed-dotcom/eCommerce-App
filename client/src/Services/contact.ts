import api from "../api/config";
import type { ContactFormData, ApiErrorResponse } from "../utils/Types";
import axios from "axios";


export const createMessage = async (data : ContactFormData) => {
  try {
    const res = await api.post("/contact" , data);
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
