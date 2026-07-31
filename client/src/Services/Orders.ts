import  { AxiosError } from "axios";
import type { ApiErrorResponse, orderData} from "../utils/Types";
import api from "../api/config";

export const handleCreateOrder = async (data: orderData) => {
  try {
    const res = await api.post("/orders", data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};

export const handleGetAllOrders = async () => {
  try {
    const res = await api.get("/orders");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};

export const handleGetOrderDetails = async (id: string) => {
  try {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};

export const handleGetUserOrders = async (status : string) => {
  try {
    const res = await api.get(`/orders/myorders?status=${status}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};

export const updateOrderToBeDelivered = async ( id: string) => {
  try {
    const res = await api.put(`/${id}/deliver`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};


export const updateOrderToPaid = async (id : string) => {
  try {
    const res = await api.put(`/${id}/pay`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
}

export const getOrderStatusCounts = async() => {
  try {
    const res = await api.get("/orders/status-counts");
    return res.data;
  }catch(err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error.message || "Unexpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
}