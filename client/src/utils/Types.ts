export interface SidebarProps {
    isMenuOpen : boolean,
    setIsMenuOpen : React.Dispatch<React.SetStateAction<boolean>>
}

export interface CategoryImageInterface {
    url : string,
    public_id : string,
    _id : string
}
export interface CategoryInterface {
    _id : string,
    title : string,
    description : string,
    slug : string,
    img : CategoryImageInterface
}