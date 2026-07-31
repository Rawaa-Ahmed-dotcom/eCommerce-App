import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "../Services/contact";
import type { ContactFormData } from "../utils/Types";

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => createMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
  });
  return mutation;
};
