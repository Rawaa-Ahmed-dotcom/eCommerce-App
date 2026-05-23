import { Menu , X } from "lucide-react";
import { createPortal } from "react-dom";
import { AnimatePresence , motion} from "motion/react";
import { NavLink } from "react-router";
import { type SidebarProps } from "../../utils/Types";
import { activeClassMenu } from "../../utils/CustomClasses";


const Sidebar = ({isMenuOpen , setIsMenuOpen} : SidebarProps) => {
  return (
    <div className="menu block md:hidden">
      <Menu
        className="cursor-pointer"
        color="#414848"
        onClick={() => setIsMenuOpen(true)}
      />

      {createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                style={{ zIndex: 9998 }}
                className="fixed inset-0 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                style={{ zIndex: 9999 }}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{
                  type: "tween",
                  ease: [0.25, 0.46, 0.45, 0.94],
                  duration: 0.35,
                }}
                className="fixed top-0 right-0 w-72 h-screen bg-[#416465] shadow-2xl flex flex-col pt-10 px-6"
              >
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="self-end mb-15 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>

                <ul className="flex flex-col gap-5">
                  {[
                    { to: "/", label: "Home" },
                    { to: "/shop", label: "Shop" },
                    { to: "/categories", label: "Categories" },
                    { to: "/contact", label: "Contact" },
                  ].map(({ to, label }, i) => (
                    <motion.li
                      key={to}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.1 + i * 0.07,
                        duration: 0.3,
                      }}
                    >
                      <NavLink
                        to={to}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }: { isActive: boolean }) =>
                          activeClassMenu(isActive)
                        }
                      >
                        {label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default Sidebar;
