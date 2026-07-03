import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleLogin, handleLogout, handleRegister } from "../Services/Auth";
import type { LoginForm, RegisterForm } from "../utils/Types";
import { useDispatch } from "react-redux";
import type { AuthResponse } from "../utils/Types";
import { logoutUser, setCredentials } from "../store/features/userSlice";
import Swal from "sweetalert2";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: RegisterForm) => handleRegister(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return mutation;
};

export const useHandleLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: (data: LoginForm) => handleLogin(data),
    onSuccess: (data: AuthResponse) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      dispatch(setCredentials({ user: data.user, token: data.accessToken }));
    },
  });
  return mutation;
};

export const useHandleLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: handleLogout,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      dispatch(logoutUser());
      Swal.fire({
        title: "Success!",
        text: data.msg,
        icon: "success",
        confirmButtonText: "Ok",
      });
    },
  });
  return mutation;
};
