import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleLogin, handleRegister } from "../Services/Auth";
import type { LoginForm, RegisterForm } from "../utils/Types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data:RegisterForm) => handleRegister(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return mutation;
};

export const useHandleLogin = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn : (data:LoginForm) => handleLogin(data),
    onSuccess : () => queryClient.invalidateQueries({queryKey : ["users"]})
    
  })
  return mutation;
}
