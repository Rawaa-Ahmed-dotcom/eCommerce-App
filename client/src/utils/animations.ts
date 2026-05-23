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