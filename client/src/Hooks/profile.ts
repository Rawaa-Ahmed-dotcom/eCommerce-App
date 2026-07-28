import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  deleteAccount,
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../Services/profile";
import type { PersonalForm, ResetPasswordPayload } from "../utils/Types";

export const useProfileImage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData: FormData) => uploadProfileImage(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return mutation;
};

export const useProfile = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: getProfile,
  });
  return query;
};

export const usePersonalInfoProfile = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (personalInfo: PersonalForm) => updateProfile(personalInfo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  return mutation;
};
export const usePassword = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ResetPasswordPayload) => changePassword(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  return mutation;
};

export const useDeleteAccount = () => {
  const mutation = useMutation({
    mutationFn: deleteAccount,
  });
  return mutation;
};
