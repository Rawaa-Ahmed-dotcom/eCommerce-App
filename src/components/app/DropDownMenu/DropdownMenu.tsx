import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  overlayVariants,
  sidebarVariants,
  headerVariants,
  itemVariants,
  menuItems,
} from "../../../utils/menuAnimation";
import styled from "./style.module.css";
import { Link } from "react-router-dom";

export default function DropDownMenu({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const MotionNavLink = motion(Link);
  const [active, setActive] = useState("Home");
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => setMenuOpen(false)}
          className={styled.overlay}
        />
      )}

      {menuOpen && (
        <motion.div
          key="sidebar"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={styled.sidebar}
        >
          {/* Header */}
          <motion.div variants={headerVariants} className={styled.header}>
            <div>
              <p>Navigation</p>
              <h2>Main Menu</h2>
            </div>

            {/* زرار الإغلاق */}
            <motion.button
              onClick={() => setMenuOpen(false)}
              whileHover={{
                scale: 1.1,
                rotate: 90,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
              className={styled.close_icon}
            >
              ✕
            </motion.button>
          </motion.div>

          {/* Menu Items */}
          <nav style={{ padding: "16px 12px", flex: 1 }}>
            {menuItems.map((item) => (
              <MotionNavLink
                to={item.path}
                key={item.label}
                variants={itemVariants}
                onClick={() => {
                  setActive(item.label);
                  setMenuOpen(false);
                }}
                /* hover: درجة أفتح من #1D3557 */
                whileHover={{
                  x: 6,
                  backgroundColor: "#254a73",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                className={styled.item}
                style={{
                  background:
                    active === item.label
                      ? "rgba(245, 245, 245, 0.12)"
                      : "transparent",
                  border:
                    active === item.label
                      ? "1px solid rgba(245, 245, 245, 0.2)"
                      : "1px solid transparent",
                  backdropFilter: active === item.label ? "blur(12px)" : "none",
                }}
              >
                <span>{item.icon}</span>
                <div>
                  <p
                    style={{
                      margin: 0,
                      color:
                        active === item.label
                          ? "#F5F5F5"
                          : "rgba(245, 245, 245, 0.65)",
                      fontWeight: active === item.label ? 700 : 500,
                      fontSize: 15,
                    }}
                  >
                    {item.label}
                  </p>
                </div>

                {active === item.label && (
                  <motion.span layoutId="activePill" className={styled.pill} />
                )}
              </MotionNavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
