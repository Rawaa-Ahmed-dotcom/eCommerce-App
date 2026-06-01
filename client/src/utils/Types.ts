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
interface color {
    name : string, 
    hex : string
}
export interface imageInterface {
    url : string,
    public_id : string,
    alt : string,
    color : string ,
    isPrimary : boolean
}
interface variants {
    size : string,
    color : color[],
    sku : string,
    stock : number
}
export interface ProductInterface {
    _id : string,
    title : string,
    slug : string, 
    sku : string,
    shortDescription : string,
    description : string,
    category : string,
    price : number,
    salePrice? : number,
    currency? : {
        type : string,
        enum : ["EGP", "USD", "EUR", "SAR"]
    },
    gender : {
        type : string,
        enum : ["men","women","unisex","kids"]
    },
    material : string,
    care_instructions : string,
    fit_type : string,
    brand : string,
    variants : variants[],
    images : imageInterface[],
    ratings : {
        average? : number,
        count? : number
    },
    tags? : string[],
    isFeatured? : boolean,
    status? : {
        type : string,
        enum : ["active", "draft", "archived"]
    },
}

export interface ProductParams {
    category?: string,
    "price[lte]"?: number,
    sort? : string,
    page?: number,
    limit?: number,
    keyword?: string,
  }

export interface useStateProductParams {
    productParams : ProductParams,
    setProductParams : React.Dispatch<React.SetStateAction<ProductParams>>
}