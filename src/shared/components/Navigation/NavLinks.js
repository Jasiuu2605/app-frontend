import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">MY PALCES</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHTENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
