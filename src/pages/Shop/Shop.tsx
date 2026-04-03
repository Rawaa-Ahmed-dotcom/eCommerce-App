import React from 'react'
import { Outlet } from 'react-router'

import { NavLink } from 'react-router'
import styles from "./style.module.css";
const activeClass = ({isActive} : {isActive : boolean}) => isActive ? styles.activeLink : ""; 
const Shop = () => {
  return (
     <main className= {styles.main}>
      <nav>
        <ul>
          <li>
            <NavLink to = "allproducts" className={activeClass}>All</NavLink>
          </li>
           <li>
            <NavLink to = "men" className={activeClass}>Men</NavLink>
          </li>
           <li>
            <NavLink to = "women" className={activeClass}>Women</NavLink>
          </li>
           <li>
            <NavLink to = "kids" className={activeClass}>Kids</NavLink>
          </li>
           <li>
            <NavLink to = "baby" className={activeClass}>Babies</NavLink>
          </li>
           <li>
            <NavLink to = "sport" className={activeClass}>Sport</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </main>
  )
}

export default Shop
