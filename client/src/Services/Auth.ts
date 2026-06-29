import axios, { AxiosError } from "axios";
import type {
  ApiErrorResponse,
  AuthResponse,
  LoginForm,
  RegisterForm,
} from "../utils/Types";

export const handleRegister = async (
  data: RegisterForm,
): Promise<AuthResponse> => {
  try {
    const res = await axios.post<AuthResponse>(
      "http://localhost:5000/api/auth/register",
      data,
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage: string = error.response?.data?.msg as string;
    const fallbackError: string = error.message || "UnExpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};
export const handleLogin = async (data: LoginForm): Promise<AuthResponse> => {
  try {
    const res = await axios.post<AuthResponse>(
      "http://localhost:5000/api/auth/login",
      data,
    );

    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackErrorMsg = error?.message || "UnExpected Error!";
    throw new Error(errorMessage || fallbackErrorMsg, { cause: err });
  }
};

export const handleLogout = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/auth/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("cartItems");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackError = error?.message || "Unexpected Error|";
    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};
