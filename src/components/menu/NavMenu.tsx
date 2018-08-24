import * as React from "react";
import { NavLink } from "react-router-dom";
import ToggleNavButton from "./ToggleNavButton";

interface INavMenuProps {
  links: string[];
  active: boolean;
  toggleNav: () => void;
}

const NavMenu = (props: INavMenuProps) => (
  <div>
    <nav id="main-nav" className={props.active ? "active" : ""}>
      {props.links.map((link: string, index: number) => (
        <NavLink
          onClick={props.toggleNav}
          className="nav-item"
          key={index}
          to={`/${link.trim().replace(/\s+/g, "-")}`}>
          {link}
        </NavLink>
      ))}
    </nav>
    <ToggleNavButton active={props.active} onCLick={props.toggleNav} />
  </div>
);

export default NavMenu;
