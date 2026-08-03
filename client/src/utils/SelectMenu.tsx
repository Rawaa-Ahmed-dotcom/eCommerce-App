import { motion } from "motion/react";
import { components, type MenuProps} from "react-select";
import type{ SortOption } from "./SelectMenu.constants";




export const Menu = (props: MenuProps<SortOption, false>) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <components.Menu {...props} />
    </motion.div>
  );
};
