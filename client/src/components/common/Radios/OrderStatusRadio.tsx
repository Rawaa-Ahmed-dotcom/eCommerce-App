import type { OrderStatusRadioProps } from "../../../utils/Types";

const OrderStatusRadio = ({
  id,
  name,
  value,
  label,
  count,
  currentStatus,
  onChange,
}: OrderStatusRadioProps) => {
 
  return (
    <div className="flex w-full mb-2.5">
      <input
        type="radio"
        className="peer sr-only"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        checked={currentStatus === value}
      />
      <label
        htmlFor={id}
        className="flex items-center justify-between w-full p-3 rounded-lg cursor-pointer bg-transparent peer-checked:bg-[#B2D8D8] transition-colors duration-300"
      >
        <span className="font-[Inter] font-bold text-[16px] text-[#3C5F60] transition-colors duration-300">
          {label}
        </span>
        <span className="flex items-center justify-center bg-[#416465] text-white w-4 h-4 rounded-full font-bold font-[Inter] text-[10px] peer-checked:bg-[#416465] peer-checked:text-white transition-colors duration-300">
          {count}
        </span>
      </label>
    </div>
  );
};

export default OrderStatusRadio;