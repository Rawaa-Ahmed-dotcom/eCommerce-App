import { motion, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { sectionVariants } from "../../utils/animations";
export const ScrollSection = ({ children , className } : {children : ReactNode , className : string}) => {
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState("down");
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY.current) {
      setDirection("down");
    } else if (latest < lastScrollY.current) {
      setDirection("up");
    }
    lastScrollY.current = latest;
  });

  return (
    <motion.section
      custom={direction}
      variants={sectionVariants as Variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }} 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      
        transformOrigin: "center center" 
      }}
      className= {className}
    >
      {children}
    </motion.section>
  );
};