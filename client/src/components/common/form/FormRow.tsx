import type { FormRowProps } from "../../../utils/Types";
import FormErrorMsg from "../../feedback/FormErrorMsg";
import { type FieldValues } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
const FormRow = <T extends FieldValues>({
  fieldName,
  validations,
  register,
  label,
  errors,
  customClass,
  placeholder,
  defaultValue,
  disabled,
  type,
}: FormRowProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>();
  return (
    <div className={`flex flex-col gap-1.25 ${customClass}`}>
      <label
        htmlFor={label}
        className="uppercase text-[#414848] font-[Inter] font-medium text-[14px] tracking-[0.7px]"
      >
        {label}
      </label>
      {type === "password" ? (
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            defaultValue={defaultValue}
            {...register(fieldName, validations)}
            id={label}
            disabled={disabled}
            className={`bg-white border border-[#C0C8C7] rounded-lg w-full
                  px-[1em] py-[0.8125em] text-[#6B7280] font-normal
                  text-[1em] font-[Inter] placeholder:text-[#6B7280]
                  placeholder:font-normal placeholder:text-[1em] placeholder:font-[Inter] 
                  focus:outline-none disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF]
                  disabled:border-[#E5E7EB] disabled:cursor-not-allowed ${type === "password" ? "relative" : ""}`}
            placeholder={placeholder}
          />
          {showPassword ? (
            <Eye
              className="absolute right-3 bottom-3 cursor-pointer"
              onClick={() => {
                setShowPassword(false);
              }}
            />
          ) : (
            <EyeClosed
              className="absolute right-3 bottom-3 cursor-pointer"
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )}
        </div>
      ) : (
        <input
          type={type || "text"}
          defaultValue={defaultValue}
          {...register(fieldName, validations)}
          id={label}
          disabled={disabled}
          className={`bg-white border border-[#C0C8C7] rounded-lg 
                  px-[1em] py-[0.8125em] text-[#6B7280] font-normal
                  text-[1em] font-[Inter] placeholder:text-[#6B7280]
                  placeholder:font-normal placeholder:text-[1em] placeholder:font-[Inter] 
                  focus:outline-none disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF]
                  disabled:border-[#E5E7EB] disabled:cursor-not-allowed `}
          placeholder={placeholder}
        />
      )}
      {errors[fieldName]?.message && (
        <FormErrorMsg msg={String(errors[fieldName]?.message)} />
      )}
    </div>
  );
};

export default FormRow;
