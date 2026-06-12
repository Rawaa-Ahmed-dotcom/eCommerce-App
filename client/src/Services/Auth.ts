import axios, {  AxiosError } from "axios";
import type {
  ApiErrorResponse,
  LoginForm,
  LoginResponse,
  RegisterForm,
  RegisterResponse,
} from "../utils/Types";

export const handleRegister = async (
  data: RegisterForm,
): Promise<RegisterResponse> => {
  try {
    const res = await axios.post<RegisterResponse>(
      "http://localhost:5000/api/auth/register",
      data,
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage : string = error.response?.data?.msg as string;
    const fallbackError: string = error.message || "UnExpected Error!";

    throw new Error(errorMessage || fallbackError, { cause: err });
  }
};
export const handleLogin = async (data: LoginForm): Promise<LoginResponse> => {
  try {
    const res = await axios.post<LoginResponse>(
      "http://localhost:5000/api/auth/login",
      data,
    );
    console.log(data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorMessage = error.response?.data?.msg;
    const fallbackErrorMsg = error?.message || "UnExpected Error!";
    throw new Error(errorMessage || fallbackErrorMsg, { cause: err });
  }
};
