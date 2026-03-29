import { useState } from "react";
import styled from "./style.module.css";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartCom from "../../app/shoppingCart/ShoppingCart";
import DropdownMenu from "../../app/DropDownMenu/DropdownMenu";
import { Menu } from "lucide-react";
import { menuItems } from "../../../utils/menuAnimation";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className={styled.wrapper}>
        <Link to="/">
          <h1 className={styled.logo}>WearAll </h1>
        </Link>
        <ul className={styled.header_links}>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? styled.active : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({isActive}) => isActive ? styled.active : ""}>Shop</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({isActive}) => isActive ? styled.active : ""}>About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({isActive}) => isActive ? styled.active : ""}>contact</NavLink>
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
            <DropdownMenu setMenuOpen={setMenuOpen} menuOpen={menuOpen} menuItems={menuItems}/>
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
