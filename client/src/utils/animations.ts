export const sectionVariants = {
  hidden: (direction : string) => ({
    opacity: 0,
    y: direction === "down" ? 80 : -80, 

  }),
  visible: {
    opacity: 1,
    y: 0, 
    transition: {
      type: "spring",
      stiffness: 45,   
      damping: 18,    
      duration: 0.8,
    }
  }
};

export const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1, 
    },
  },
};
export const itemVariants = {
  hidden: { opacity: 0, x: -10 }, 
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      type: "spring", 
      stiffness: 70,   
      damping: 18 
    } 
  },
};