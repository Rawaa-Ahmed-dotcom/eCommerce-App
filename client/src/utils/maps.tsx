import { ReceiptText, ShoppingBag, Blocks , UsersRound} from "lucide-react"
export const featuresMap = [
    {img : "/leaf.png" , title : "Ethical Sourcing" , description : "We partner with artisans who share our commitment to fair wages and safe working conditions."},
    {img : "/container.png" , title : "Sustainable Design" , description : "Timeless silhouettes designed to last years, not seasons, using renewable materials."},
    {img : "/quality.png" , title : "Curated Quality" , description : "Every piece is hand-selected and rigorously tested to ensure it meets our exacting standards."},
]

export const AdminMenu = [
    {title : "overview" , icon : <ReceiptText /> , to : ""},
    {title : "products" , icon : <Blocks /> , to : "products"},
    {title : "orders" , icon :<ShoppingBag /> , to : "orders"},
    {title : "users" , icon : <UsersRound /> , to : "users"}
]