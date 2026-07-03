import { NavLink } from "react-router";
import { ShoppingCart, UserRound, LogOut } from "lucide-react";
import { activeClass } from "../../utils/CustomClasses";
import Search from "./Search";
import Sidebar from "./Sidebar";
import type { SidebarProps } from "../../utils/Types";

import { useHandleLogout } from "../../Hooks/auth";

const LoginWedgets = ({ isMenuOpen, setIsMenuOpen }: SidebarProps) => {
  const logoutMutation = useHandleLogout();
  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex items-center gap-[1em] md:gap-[0.625em]">
      <NavLink
        to="/cart"
        title="cart"
        className={({ isActive }: { isActive: boolean }) =>
          activeClass(isActive)
        }
      >
        <ShoppingCart fontWeight={900} size={24} className="cursor-pointer" />
      </NavLink>
      <NavLink
        to="/profile"
        title="profile"
        className={({ isActive }: { isActive: boolean }) =>
          activeClass(isActive)
        }
      >
        <UserRound fontWeight={900} size={24} className="cursor-pointer" />
      </NavLink>
      <button
        className="font-bold text-[1em] text-[#416465] font-[Inter] "
        onClick={logout}
      >
        <LogOut fontWeight={900} size={24} className="cursor-pointer" />
      </button>

      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Search />
    </div>
  );
};

export default LoginWedgets;
