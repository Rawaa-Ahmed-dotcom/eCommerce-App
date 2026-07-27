import { NavLink } from "react-router-dom";
import { useState } from "react";
import { activeClass } from "../../utils/CustomClasses";
import LoginWedgets from "./LoginWedgets";
import LogoutWedgets from "./LogoutWedgets";
import { motion, type Variants } from "framer-motion";
import { listVariants } from "../../utils/animations";
import { itemVariants } from "../../utils/animations";
import { useAppSelector } from "../../store/hooks";




const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {token} = useAppSelector(state => state.authState);
  return (
    <motion.header
      className="flex flex-col justify-center w-full h-[4em] z-50 fixed top-0 left-0 bg-[#F1FBFF] border-b border-[#131d21]/5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.05 }}
    >
      <div className="px-[1em] md:px-[3em] lg:px-[5em] flex items-center justify-between">
        
        <div className="logo font-extrabold text-[#131D21] text-[1.5em] uppercase tracking-wider">
          vestry
        </div>
        
        <motion.ul 
          className="hidden md:flex items-center gap-[1.5em]"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { to: "/", label: "Home" },
            { to: "/shop", label: "Shop" },
            { to: "/contact", label: "Contact" },
          ].map((link, index) => (
            <motion.li key={index} variants={itemVariants as Variants}>
              <NavLink
                to={link.to}
                className={({ isActive }) => activeClass(isActive)}
              >
                {link.label}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 65, damping: 16 }}
          className="flex items-center"
        >
          {token ? (
            <LoginWedgets isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          ) : (
            <LogoutWedgets isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;