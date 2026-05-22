import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  ShoppingCart,
  UserRound,
  LogOut,
  LogIn,
  SearchIcon,
} from "lucide-react";
const activeClass = (isActive: boolean) =>
  isActive
    ? "font-bold text-[1em] text-[#416465] font-[Inter]  border-b-[2px] border-b-[#416465]"
    : "font-normal text-[1em] text-[#414848] font-[Inter]  relative   after:content-[''] after:absolute after:h-[2px] after:left-0 after:bottom-[-2.5px] after:rounded-md after:transition-all after:duration-300 after:ease-in-out after:bg-[#416465] after:w-0 hover:after:w-full ";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <header className="flex flex-col justify-center w-full h-[4em] " data-aos="fade-down" data-aos-duration="1000">
      <div className="px-[1em] md:px-[3em] lg:px-[5em] flex items-center justify-between">
        <div className="logo font-extrabold text-[#131D21] text-[1.5em] uppercase">
          vestry
        </div>
        <ul className="flex items-center gap-[1.5em]">
          <li>
            <NavLink
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                activeClass(isActive)
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }: { isActive: boolean }) =>
                activeClass(isActive)
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }: { isActive: boolean }) =>
                activeClass(isActive)
              }
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }: { isActive: boolean }) =>
                activeClass(isActive)
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
        {isLoggedIn ? (
          <div className="flex items-center gap-[0.625em]">
            <NavLink
              to="/cart"
              title="cart"
              className={({ isActive }: { isActive: boolean }) =>
                activeClass(isActive)
              }
            >
              <ShoppingCart
                fontWeight={900}
                size={24}
                className="cursor-pointer"
              />
            </NavLink>
            <NavLink
              to="/profile"
              title="profile"
              className={({ isActive }: { isActive: boolean }) =>
                activeClass(isActive)
              }
            >
              <UserRound
                fontWeight={900}
                size={24}
                className="cursor-pointer"
              />
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

            <div className="relative">
              <input
                type="search"
                placeholder="search..."
                className="border border-[#C0C8C7] rounded-[99px] bg-[#EAF5FA]  py-[0.625em] pl-[2.5em] pr-[1em] focus:outline-none"
              />
              <SearchIcon
                className="absolute left-3 top-[50%] transform translate-y-[-50%]"
                color="#414848"
                size={20}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-[0.625em]">
            <NavLink
              to="/register"
              title="register"
              className={({ isActive }: { isActive: boolean }) =>
                activeClass(isActive)
              }
            >
              <LogIn fontWeight={900} size={24} className="cursor-pointer" />
            </NavLink>
            <div className="relative">
              <input
                type="search"
                placeholder="search..."
                className="border border-[#C0C8C7] rounded-[99px] bg-[#EAF5FA]  py-[0.625em] pl-[2.5em] pr-[1em] focus:outline-none"
              />
              <SearchIcon
                className="absolute left-3 top-[50%] transform translate-y-[-50%]"
                color="#414848"
                size={20}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
