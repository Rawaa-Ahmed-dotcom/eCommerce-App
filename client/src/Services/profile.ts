import type { AxiosError } from "axios";
import api from "../api/config";
import type {
  ApiErrorResponse,
  PersonalForm,
  ResetPasswordPayload,
} from "../utils/Types";

export const uploadProfileImage = async (formData: FormData) => {
  try {
    const res = await api.patch("/auth/profile-picture", formData);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const serverMessage = error.response?.data?.msg;
    const FallbackError = error.message;
    console.log(serverMessage);
    throw new Error(serverMessage || FallbackError, { cause: err });
  }
};

export const getProfile = async () => {
  try {
    const res = await api.get("/auth/profile");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const serverMessage = error.response?.data?.msg;
    const fallbackMessage = error.message;
    throw new Error(serverMessage || fallbackMessage, { cause: err });
  }
};

export const updateProfile = async (personalInfo: PersonalForm) => {
  try {
    const res = await api.patch("/auth/profile", personalInfo);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const serverMessage = error.response?.data?.msg;
    const fallbackMessage = error.message;
    throw new Error(serverMessage || fallbackMessage, { cause: err });
  }
};

export const changePassword = async (data: ResetPasswordPayload) => {
  try {
    const res = await api.patch("/auth/change-password", data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const serverMessage = error.response?.data?.msg;
    const fallbackMessage = error.message;
    throw new Error(serverMessage || fallbackMessage, { cause: err });
  }
};

export const deleteAccount = async () => {
  try {
    const res = await api.delete("/auth/profile");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const serverMessage = error.response?.data?.msg;
    const fallbackMessage = error.message;
    throw new Error(serverMessage || fallbackMessage, { cause: err });
  }
};
