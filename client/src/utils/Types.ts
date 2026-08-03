import type {
  FieldErrors,
  Path,
  RegisterOptions,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";

export interface SidebarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CategoryImageInterface {
  url: string;
  public_id: string;
  _id: string;
}
export interface CategoryInterface {
  _id: string;
  title: string;
  description: string;
  slug: string;
  img: CategoryImageInterface;
}

export interface imageInterface {
  url: string;
  public_id: string;
  alt: string;
  color: string;
  isPrimary: boolean;
}
export interface variants {
  size: string;
  color: string;
  sku: string;
  stock: number;
}
export interface ProductInterface {
  _id: string;
  title: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  category: string;
  price: number;
  salePrice?: number;
  currency?: "EGP" | "USD" | "EUR" | "SAR";
  
  gender: "men" |  "women" | "unisex" | "kids";
  
  material: string;
  care_instructions: string;
  fit_type: string;
  brand: string;
  variants: variants[];
  images: imageInterface[];
  ratings: {
    average?: number;
    count?: number;
  };
  tags?: string[];
  isFeatured?: boolean;
  status?: "active" | "draft" | "archived";
   
    
}

export interface ProductParams {
  category?: string;
  "price[lte]"?: number;
  sort?: string;
  page?: number;
  limit?: number;
  keyword?: string;
}

export interface useStateProductParams {
  productParams: ProductParams;
  setProductParams: React.Dispatch<React.SetStateAction<ProductParams>>;
}

export interface cartItem {
  slug: string;
  title: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

export interface cartState {
  cartItems: cartItem[];
  totalQuantity: number;
  totalAmount: number;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}
export interface LoginForm {
  email: string;
  password: string;
}

export type FormRowProps<T extends FieldValues> = {
  fieldName: Path<T>;
  label : string;
  validations?: RegisterOptions<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  customClass? : string;
  placeholder? : string,
  defaultValue ? :string,
  disabled? : boolean,
  type? : string,
  onClick? : () =>  void
};
export type AuthResponse = {
  msg: string;
  accessToken: string;
  user: user;
};

export type ApiErrorResponse = {
  msg: string;
};
export type user = {
  id: string;
  email: string;
  username: string;
  role: string;
};

export interface ReduxState {
  user : user | null,
  token : string | null
}

export interface orderItem {
  product : string,
  size : string,
  color : string,
  quantity : number,
  price : number,
  image? : string;
  title? : string;
}
export interface orderData {
  orderItems : orderItem[];

  personalInfo : checkoutForm
}

export interface checkoutForm {
  contactInfo : {
    fullname : string,
    email : string,
    phone : string
  },
  shippingAddress : {
    address : string,
    city : string, 
    state:  string,
    zipCode : string
  },
  paymentMethod : "card" | "ccd",
  cardInfo? : {
    cardNumber : string,
    expiryDate : string,
    ccv : string
  }
}


export interface Profile {
  username : string,
  email : string,
  role : string,
  profileImg : {
    url : string,
    public_id : string
  },
  phone : string
}

export interface PersonalForm {
  username? : string,
  email? : string,
  phone : string
}

export interface ResetPasswordPayload {
  currentPassword : string,
  newPassword : string,
}
export interface ResetPassword extends ResetPasswordPayload{
  confirmNewPassword : string
}


export interface OrdersFilters  {
  status : string;
}

export type OrderStatusRadioProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  count: number;
  currentStatus: string;
  onChange: (value: string) => void;
};

export interface orderDetails {
  _id : string;
  orderNumber :  number;
  createdAt : string;
  userId: string;
    contactInfo : {
        fullname : string;
        email : string;
        phone : string;
    },
    orderItems: orderItem[];
    shippingAddress: {
        address: string;
        city: string;
        state: string;
        zipCode : string;
    },
    paymentMethod: string;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isPaid: boolean;
    
    status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
    paymentDetails : {
        paidAt:  Date ;
        transactionId: string;
    };
    deliveredAt: Date;
}

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

