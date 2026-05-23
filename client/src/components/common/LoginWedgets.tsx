import { NavLink } from "react-router";
import { ShoppingCart, UserRound, LogOut } from "lucide-react";
import { activeClass } from "../../utils/CustomClasses";
import Search from "./Search";
import Sidebar from "./Sidebar";
import type { SidebarProps } from "../../utils/Types";

const LoginWedgets = ({ isMenuOpen, setIsMenuOpen }: SidebarProps) => {
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
      <NavLink
        to="/logout"
        title="logout"
        className={({ isActive }: { isActive: boolean }) =>
          activeClass(isActive)
        }
      >
        <LogOut fontWeight={900} size={24} className="cursor-pointer" />
      </NavLink>

      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Search />
    </div>
  );
};

export default LoginWedgets;
