import  { AxiosError } from "axios";
import type { ApiErrorResponse, orderData} from "../utils/Types";
import api from "../api/config";

export const handleCreateOrder = async (data: orderData, token: string) => {
  try {
    const res = await api.post("/orders", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};

export const handleGetAllOrders = async (token: string) => {
  try {
    const res = await api.get("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};

export const handleGetOrderDetails = async (id: string, token: string) => {
  try {
    const res = await api.get(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};

export const handleGetUserOrders = async (token: string) => {
  try {
    const res = await api.get(`/orders/myorders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};

export const updateOrderToBeDelivered = async (token: string, id: string) => {
  try {
    const res = await api.put(`/${id}/deliver`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};


export const updateOrderToPaid = async (token : string , id : string) => {
  try {
    const res = await api.put(`/${id}/pay`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
}