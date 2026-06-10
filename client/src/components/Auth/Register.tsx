import { useForm } from "react-hook-form";
import type { RegisterForm } from "../../utils/Types";
import { useCreateUser } from "../../Hooks/auth";
import { submit } from "../../utils/helpers";
import { useNavigate } from "react-router";
import FormRow from "../common/FormRow";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<RegisterForm>({ mode: "onBlur" });
  const navigate = useNavigate();
  const { mutateAsync } = useCreateUser();
  

  return (
    <section className="bg-[rgba(255,255,255,1)] rounded-xl p-20 w-[50%] flex flex-col gap-[1.5em] shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <h2 className="font-semibold text-[2em] tracking-[-0.32px] text-[#131D21]">
        Register Now!
      </h2>
      <form
        className="flex flex-col gap-[1.5em]"
        onSubmit={handleSubmit((data) => submit(data,mutateAsync,navigate))}
      >
        <FormRow
          fieldName="username"
          validations={{ required: "Username is required" }}
          register={register}
          errors={errors}
        />
        <FormRow
          fieldName="email"
          validations={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message:
                "Please enter a valid email address (e.g., name@example.com).",
            },
          }}
          register={register}
          errors={errors}
        />
        <FormRow
          fieldName="password"
          validations={{
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @, $, !).",
            },
          }}
          register={register}
          errors={errors}
        />
        <div className="flex items-center justify-center">
          <button
            className="bg-[#B2D8D8] rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] flex items-center justify-center w-[50%] py-[1em] text-[#3C5F60] font-[Inter] font-semibold text-[1em] tracking-[0.16px] capitalize! cursor-pointer transition duration-300 hover:bg-[#87a4a4] disabled:bg-[#717878] disabled:pointer-events-none disabled:text-[#444747]"
            disabled={!isDirty || !isValid}
          >
            register
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
