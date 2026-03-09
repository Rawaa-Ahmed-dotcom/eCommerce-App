import { House, Store, BadgeInfo, Mail, LogIn ,IdCard} from "lucide-react";
export const menuItems = [
  { icon: <House color="#F5F5F5" size={24} />, label: "Home", path: "/" },
  { icon: <Store color="#F5F5F5" size={24} />, label: "Shop", path: "/shop" },
  {
    icon: <BadgeInfo color="#F5F5F5" size={24} />,
    label: "About",
    path: "/about",
  },
  {
    icon: <Mail color="#F5F5F5" size={24} />,
    label: "Contact",
    path: "/contact",
  },
  {
    icon : <LogIn color="#F5F5F5" size={24}/>,
    label : "Login",
    path : "/login"
  },
  {
    icon : <IdCard color="#F5F5F5" size={24}/>,
    label : "Register",
    Path : "/register"
  }
];

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.1 } },
};

export const sidebarVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

export const itemVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
  exit: { x: -20, opacity: 0, transition: { duration: 0.15 } },
};

export const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 25, delay: 0.05 },
  },
};