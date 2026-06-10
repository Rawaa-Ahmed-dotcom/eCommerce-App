import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleRegister } from "../Services/Auth";
import type { RegisterForm } from "../utils/Types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data:RegisterForm) => handleRegister(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return mutation;
};
