import {
  ReceiptText,
  ShoppingBag,
  Blocks,
  UsersRound,
  CircleDollarSign,
  UserPlus,
  PackageSearch,
} from "lucide-react";
export const featuresMap = [
  {
    img: "/leaf.png",
    title: "Ethical Sourcing",
    description:
      "We partner with artisans who share our commitment to fair wages and safe working conditions.",
  },
  {
    img: "/container.png",
    title: "Sustainable Design",
    description:
      "Timeless silhouettes designed to last years, not seasons, using renewable materials.",
  },
  {
    img: "/quality.png",
    title: "Curated Quality",
    description:
      "Every piece is hand-selected and rigorously tested to ensure it meets our exacting standards.",
  },
];

export const AdminMenu = [
  { title: "overview", icon: <ReceiptText />, to: "" },
  { title: "products", icon: <Blocks />, to: "products" },
  { title: "orders", icon: <ShoppingBag />, to: "orders" },
  { title: "users", icon: <UsersRound />, to: "users" },
];

export const adminFilters = [
  { value: "30d", label: "Last 30 Days" },
  { value: "7d", label: "Last 7 Days" },
  { value: "24h", label: "Last 24 Hours" },
];

export const adminCards = [
  { icon: <CircleDollarSign size={24}/>, title: "total revenue", value: "$45,230" },
  { icon: <ShoppingBag size={24}/>, title: "total orders", value: "1,845" },
  { icon: <UserPlus size={24}/>, title: "new customers", value: "612" },
  { icon: <PackageSearch size={24}/>, title: "total products", value: "50" },
];
