import api from "../api/config";
import type { ContactFormData, ApiErrorResponse } from "../utils/Types";
import { AxiosError } from "axios";


export const createMessage = async (data : ContactFormData) => {
  try {
    const res = await api.post("/contact" , data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};
