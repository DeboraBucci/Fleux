import React from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from "../assets/logo-blue-background.webp";
import CartWidget from "./CartWidget";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo-container">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-link navbar__link" : "navbar__link"
            }
          >
            <i className="fa-solid fa-shirt"></i>
            <span>Products</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/category/men"
            className={({ isActive }) =>
              isActive ? "active-link navbar__link" : "navbar__link"
            }
          >
            <i className="fa-solid fa-feather"></i>
            <span>Men</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/category/women"
            className={({ isActive }) =>
              isActive ? "active-link navbar__link" : "navbar__link"
            }
          >
            <i className="fa-solid fa-leaf"></i>
            <span>Women</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/category/jewelry"
            className={({ isActive }) =>
              isActive ? "active-link navbar__link" : "navbar__link"
            }
          >
            <i className="fa-regular fa-gem"></i>
            <span>Jewelry</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <Link to="/cart" className="navbar__link">
            <CartWidget />
            <span>Cart</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
