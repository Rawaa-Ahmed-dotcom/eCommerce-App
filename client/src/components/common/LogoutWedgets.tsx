import { NavLink } from "react-router";
import { activeClass } from "../../utils/CustomClasses";
import { LogIn } from "lucide-react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import type { SidebarProps } from "../../utils/Types";

const LogoutWedgets = ({isMenuOpen,setIsMenuOpen} : SidebarProps) => {
  return (
    <div className="flex items-center gap-[1em] md:gap-[0.625em]">
      <NavLink
        to="/auth/register"
        title="register"
        className={({ isActive }: { isActive: boolean }) =>
          activeClass(isActive)
        }
      >
        <LogIn fontWeight={900} size={24} className="cursor-pointer" />
      </NavLink>
      <Search />
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default LogoutWedgets;
