import { NavLink } from "react-router";

import Search from "./Search";
import Sidebar from "./Sidebar";
import type { SidebarProps } from "../../utils/Types";

const LogoutWedgets = ({isMenuOpen,setIsMenuOpen} : SidebarProps) => {
  return (
    <div className="flex items-center gap-[1em] md:gap-[0.625em]">
      <button>
        <NavLink
        to="/auth/login"
        title="login"
        className= "text-[#416465] border-2 border-[#416465] py-2 px-3 rounded-[20px] font-semibold ">
        Login
      </NavLink>
      </button>
      <button className="bg-[#416465] py-2 px-3 rounded-[20px]">
        <NavLink
        to="/auth/register"
        title="register"
        className= "text-white   font-semibold ">
        Register
      </NavLink>
      </button>
      <Search />
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default LogoutWedgets;
