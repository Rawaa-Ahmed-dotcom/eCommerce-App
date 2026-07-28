import FormRow from "../components/common/form/FormRow";
import {
  useDeleteAccount,
  usePassword,
  usePersonalInfoProfile,
  useProfile,
} from "../Hooks/profile";
import type { PersonalForm, ResetPassword } from "../utils/Types";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { submitPersonalInfo } from "../utils/helpers";
import { handleCancel } from "../utils/helpers";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../store/hooks";
import { logoutUser } from "../store/features/userSlice";
import { useQueryClient } from "@tanstack/react-query";

const ProfileSettings = () => {
  const { data } = useProfile();
  const user = data?.user;
  const {
    register: personalRegister,
    handleSubmit,
    reset,
    formState: { errors: personalErrors },
  } = useForm<PersonalForm>({ mode: "onBlur" });
  const {
    register: passwordRegister,
    formState: { errors: passwordErrors },
    handleSubmit: handleSubmitPassword,
    getValues,
    reset: resetPassword,
  } = useForm<ResetPassword>({ mode: "onChange" });
  const personaInfoMutation = usePersonalInfoProfile();
  const passwordMutation = usePassword();
  const deleteAccountMutation = useDeleteAccount();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const handlePersonalInfoSubmit = async (personalData: PersonalForm) => {
    await submitPersonalInfo(personalData, personaInfoMutation as any);
  };

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, reset]);
  const submit = (data: ResetPassword) => {
    toast.promise(
      passwordMutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
      {
        success: "Password Updated Successfully",
        loading: "Updating...",
        error: "Password Failed to update",
      },
    );
  };
  if (passwordMutation.isSuccess) {
    resetPassword({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        deleteAccountMutation.mutate(undefined, {
          onSuccess: (data: { msg: string }) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.clear();

            Swal.fire({
              title: "Deleted!",
              text: data?.msg || "Your account has been deleted successfully.",
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
            dispatch(logoutUser());
            navigate("/auth/register");
          },
          onError: (error: Error) => {
            const errorMessage =
              (error as Error & { msg?: string }).msg || error.message;
            Swal.fire({
              title: "Error!",
              text:
                errorMessage || "Failed to delete account. Please try again.",
              icon: "error",
              confirmButtonColor: "#d33",
            });
          },
        });
      }
    });
  };
  return (
    <div className="p-20 flex flex-col gap-7">
      <form
        className="w-full"
        onSubmit={handleSubmit(handlePersonalInfoSubmit)}
      >
        <div className="bg-white rounded-xl p-12">
          <h2 className="font-medium text-2xl text-[#131D21] capitalize ">
            Personal information
          </h2>
          <div className="flex flex-col mt-12 gap-6">
            <div className="flex items-center gap-6 w-full">
              <FormRow
                fieldName="username"
                label="full name"
                register={personalRegister}
                errors={personalErrors}
                validations={{ required: "Full Name is required" }}
                customClass="w-[50%]"
                defaultValue={user?.username}
              />
              <FormRow
                fieldName="email"
                label="email"
                register={personalRegister}
                errors={personalErrors}
                disabled={true}
                defaultValue={user?.email}
                customClass="w-[50%]"
              />
            </div>

            <FormRow
              register={personalRegister}
              errors={personalErrors}
              fieldName="phone"
              label="Phone"
              validations={{
                required: "Phone Number is required",
                pattern: {
                  value: /^01[0125][0-9]{8}$/,
                  message: "Invalid Phone number ex:(01552527899)",
                },
              }}
              placeholder="015 5252 7899"
            />
            <div className="flex items-center justify-center gap-6">
              <button
                type="submit"
                className="bg-[#B2D8D8] flex items-center justify-center rounded-lg w-45 py-4
    text-[#3C5F60] font-[Inter] font-normal text-[16px] capitalize! cursor-pointer
    transition-all duration-200 ease-in-out
    hover:bg-[#9AC7C7] hover:shadow-md hover:-translate-y-0.5
    active:translate-y-0 active:shadow-sm active:bg-[#8AB8B8]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                save changes
              </button>

              <button
                type="button"
                className="bg-transparent flex items-center justify-center rounded-lg w-45 py-4
    text-[#586062] font-[Inter] font-normal text-[16px] capitalize! cursor-pointer
    border border-[#C0C8C7]
    transition-all duration-200 ease-in-out
    hover:bg-[#F5F7F7] hover:border-[#9CA8A7] hover:-translate-y-0.5
    active:translate-y-0 active:bg-[#EBEFEE]"
                onClick={() => handleCancel(reset, user)}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </form>
      <form className="w-full" onSubmit={handleSubmitPassword(submit)}>
        <div className="bg-white rounded-xl p-12">
          <h2 className="font-medium text-2xl text-[#131D21] capitalize ">
            Change Password
          </h2>
          <div className="flex flex-col mt-12 gap-6">
            <FormRow
              fieldName="currentPassword"
              label="current password"
              register={passwordRegister}
              errors={passwordErrors}
              validations={{ required: "Current Password is required" }}
              type="password"
            />
            <div className="flex items-center gap-6 w-full">
              <FormRow
                fieldName="newPassword"
                label="New Password"
                register={passwordRegister}
                errors={passwordErrors}
                validations={{
                  required: "New Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @, $, !).",
                  },
                  validate: (value) => {
                    const { currentPassword } = getValues();
                    if (value === currentPassword) {
                      return "You must enter a new password ";
                    }
                  },
                }}
                customClass="w-[50%]"
                type="password"
              />
              <FormRow
                fieldName="confirmNewPassword"
                label="Confirm New Password"
                register={passwordRegister}
                errors={passwordErrors}
                validations={{
                  required: "Confirmation is required",
                  validate: (value) => {
                    const { newPassword } = getValues();
                    if (newPassword !== value) return "Passwords do not match";
                  },
                }}
                customClass="w-[50%]"
                type="password"
              />
            </div>

            <div className="flex items-center justify-center gap-6">
              <button
                type="submit"
                className="bg-transparent flex items-center justify-center rounded-lg w-45 py-4
                text-[#586062] font-[Inter] font-normal text-[16px] capitalize! cursor-pointer
                border border-[#C0C8C7]
                transition-all duration-200 ease-in-out
                hover:bg-[#F5F7F7] hover:border-[#9CA8A7] hover:-translate-y-0.5
                active:translate-y-0 active:bg-[#EBEFEE]"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="bg-white rounded-xl p-12 w-full">
        <div className="flex flex-col gap-3 items-center">
          <h2 className="font-medium text-2xl text-[#BA1A1A] capitalize ">
            danger zone
          </h2>
          <p className="text-[#586062] font-[Inter] font-normal text-[16px]">
            Deleting your account is permanent. All your order history, saved
            items, and personal data will be wiped from our servers.
          </p>
        </div>
        <div className="flex flex-col mt-12 gap-6">
          <div className="flex items-center justify-center gap-6">
            <button
              className=" flex items-center justify-center rounded-lg w-45 py-4
                text-white font-[Inter] font-normal text-[16px] capitalize! cursor-pointer
                bg-[#BA1A1A] transition-all duration-200 ease-in-out
                hover:bg-[#980505]  hover:-translate-y-0.5
                active:translate-y-0 active:bg-[#811212]"
              onClick={handleDeleteAccount}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
