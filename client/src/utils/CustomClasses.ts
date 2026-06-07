export const activeClass = (isActive: boolean) =>
  isActive
    ? "font-bold text-[1em] text-[#416465] font-[Inter]  border-b-[2px] border-b-[#416465]"
    : "font-normal text-[1em] text-[#414848] font-[Inter]  relative   after:content-[''] after:absolute after:h-[2px] after:left-0 after:bottom-[-2.5px] after:rounded-md after:transition-all after:duration-300 after:ease-in-out after:bg-[#416465] after:w-0 hover:after:w-full ";


export const activeClassMenu = (isActive: boolean) =>
  isActive
    ? "font-bold text-[1em] text-white font-[Inter]  "
    : "font-normal text-[1em] text-white/60 font-[Inter] hover:text-white ";


export const activeClassBreadcrumb = (isActive: boolean) =>
  isActive
    ? "text-[#131D21] font-[Inter] font-medium text-[0.875em] transition duration-300 hover:underline"
    : "text-[#586062]  font-[Inter] font-medium text-[0.875em] transition duration-300 hover:underline";