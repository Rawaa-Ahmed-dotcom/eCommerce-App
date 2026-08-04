import axios, { AxiosError } from "axios";
import { logoutUser, setCredentials } from "../store/features/userSlice";
import { store } from "../store/index.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://e-commerce-app-iroy.vercel.app/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = store.getState().authState?.token;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !(originalRequest as unknown as { _retry?: boolean })._retry
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.set("Authorization", `Bearer ${token}`);
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      (originalRequest as unknown as { _retry?: boolean })._retry = true;

      try {
        const refresh = await axios.get(`${BASE_URL}/auth/refresh`, {
          withCredentials: true,
        });

        const newAccessToken = refresh.data.accessToken;
        const user = refresh.data.user;

        store.dispatch(setCredentials({ token: newAccessToken, user }));

        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);

        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        const err = refreshError as AxiosError;
        console.log(err.response?.status, err.response?.data);

        store.dispatch(logoutUser());
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;