import axios from "axios";
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
    let errorMessage = "UnExpected Error!";

    if (axios.isAxiosError<ApiErrorResponse>(err)) {
      errorMessage = err.response?.data?.msg || err.message || errorMessage;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    throw new Error(errorMessage, { cause: err });
  }
};

export const getProfile = async () => {
  try {
    const res = await api.get("/auth/profile");
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

export const updateProfile = async (personalInfo: PersonalForm) => {
  try {
    const res = await api.patch("/auth/profile", personalInfo);
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

export const changePassword = async (data: ResetPasswordPayload) => {
  try {
    const res = await api.patch("/auth/change-password", data);
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

export const deleteAccount = async () => {
  try {
    const res = await api.delete("/auth/profile");
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
