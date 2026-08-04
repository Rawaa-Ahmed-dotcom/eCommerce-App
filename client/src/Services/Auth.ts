import api from "../api/config";
import axios from "axios";
import type{ RegisterForm , AuthResponse , ApiErrorResponse , LoginForm} from "../utils/Types";

export const handleRegister = async (
  data: RegisterForm,
): Promise<AuthResponse> => {
  try {
    const res = await api.post<AuthResponse>("/auth/register", data);
    console.log(res.data);
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

export const handleLogin = async (data: LoginForm): Promise<AuthResponse> => {
  try {
    const res = await api.post<AuthResponse>("/auth/login", data);

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

export const handleLogout = async () => {
  try {
    const res = await api.get("/auth/logout");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
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