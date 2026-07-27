import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword, getProfile, updateProfile, uploadProfileImage } from "../Services/profile";
import toast from "react-hot-toast";
import type { PersonalForm, ResetPasswordPayload } from "../utils/Types";

export const useProfileImage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ formData, token }: { formData: FormData; token: string }) =>
      uploadProfileImage(formData, token),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data.msg);
    },
  });

  return mutation;
};


export const useProfile = () => {
  const query = useQuery({
    queryKey : ["users"],
    queryFn :  getProfile
  });
  return query;
}


export const usePersonalInfoProfile = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn : (personalInfo : PersonalForm) => updateProfile(personalInfo),
    onSuccess : () =>   queryClient.invalidateQueries({queryKey : ["users"]})
  });
  return mutation;
}
export const usePassword = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn : (data : ResetPasswordPayload) => changePassword(data),
    onSuccess : () => queryClient.invalidateQueries({queryKey : ["users"]})
  });
  return mutation;
}