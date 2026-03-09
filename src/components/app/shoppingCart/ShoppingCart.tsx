import React from "react";
import { ShoppingCart } from "lucide-react";
import styled from "./style.module.css";
const ShoppingCartCom = () => {
  return (
    <div className={styled.cart_container}>
      <ShoppingCart color="var( --color-neutral-dark-gray)" size={30}/>
      <div className={styled.cart_quantity}>
        <span>1</span>
      </div>
    </div>
  );
};

export default ShoppingCartCom;
