import React from "react";

import Logo from "../assets/logo-blue-background.webp";
import CartWidget from "./CartWidget";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo-container">
        <img src={Logo} alt="logo" />
      </div>
      <ul className="navbar__list">
        <li className="navbar__item">
          <a href="#home" className="navbar__link">
            <i class="fa-solid fa-house"></i>
            <span>Home</span>
          </a>
        </li>
        <li className="navbar__item">
          <a href="#products" className="navbar__link">
            <i class="fa-solid fa-couch"></i>
            <span>Products</span>
          </a>
        </li>
        <li className="navbar__item">
          <a href="#contact" className="navbar__link">
            <i class="fa-solid fa-paper-plane"></i>
            <span>Contact</span>
          </a>
        </li>
        <li className="navbar__item">
          <a href="#us" className="navbar__link">
            <i class="fa-solid fa-leaf"></i>
            <span>Us</span>
          </a>
        </li>
        <li className="navbar__item">
          <a href="#cart" className="navbar__link">
            <CartWidget />
            <span>Cart</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
