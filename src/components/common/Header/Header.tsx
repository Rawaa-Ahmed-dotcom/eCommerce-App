import { useState } from "react";
import styled from "./style.module.css";
import { Link } from "react-router-dom";
import ShoppingCartCom from "../../app/shoppingCart/ShoppingCart";
import DropdownMenu from "../../app/DropDownMenu/DropdownMenu";
import { Menu } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className={styled.wrapper}>
        <Link to="/">
          <h1 className={styled.logo}>FamilyFold </h1>
        </Link>
        <ul className={styled.header_links}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">contact</Link>
          </li>
        </ul>
        <div className={styled.header_btns}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <ShoppingCartCom />
        </div>
      </div>
      <div className={styled.other_screens}>
        <div>
          <div className={styled.drop_down_menu}>
            <div className={styled.drop_down_icon}>
              <Menu onClick={() => setMenuOpen(true)} size={24}/>
            </div>
            <DropdownMenu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
          </div>
          <Link to="/">
            <h1 className={styled.logo}>FamilyFold </h1>
          </Link>
        </div>
        <div>
          <ShoppingCartCom/>
        </div>
      </div>
    </header>
  );
};

export default Header;
