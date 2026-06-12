import type { FormRowProps } from "../../utils/Types";
import FormErrorMsg from "../feedback/FormErrorMsg";
import { type FieldValues } from "react-hook-form";

const FormRow = <T extends FieldValues>({
  fieldName,
  validations,
  register,
  errors,
}: FormRowProps<T>) => {
  return (
    <div className="flex flex-col gap-1.25">
      <label
        htmlFor={fieldName}
        className="uppercase text-[#414848] font-[Inter] font-medium text-[14px] tracking-[0.7px]"
      >
        {fieldName}
      </label>
      <input
        type="text"
        {...register(fieldName, validations)}
        id={fieldName}
        className="bg-white border border-[#C0C8C7] rounded-lg px-[1em] py-[0.8125em] text-[#6B7280] font-normal text-[1em] font-[Inter] placeholder:text-[#6B7280] placeholder:font-normal placeholder:text-[1em] placeholder:font-[Inter]  focus:outline-none"
      />
      {errors[fieldName]?.message && (
        <FormErrorMsg msg={String(errors[fieldName]?.message)} />
      )}
    </div>
  );
};

export default FormRow;
