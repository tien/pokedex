import * as React from "react";
import { NavLink } from "react-router-dom";
import ToggleNavButton from "./ToggleNavButton";

interface INavMenuProps {
  links: string[];
}

interface INavMenuState {
  active: boolean;
}

class NavMenu extends React.Component<INavMenuProps, INavMenuState> {
  public constructor(props: INavMenuProps) {
    super(props);
    this.state = {
      active: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  public toggleNav() {
    this.setState(prevState => ({
      active: !prevState.active
    }));
  }

  public render() {
    return (
      <div>
        <nav id="main-nav" className={this.state.active ? "active" : ""}>
          {this.props.links.map((link: string, index: number) => (
            <NavLink
              className="nav-item"
              key={index}
              to={`/${link.trim().replace(/\s+/g, "-")}`}>
              {link}
            </NavLink>
          ))}
        </nav>
        <ToggleNavButton active={this.state.active} onCLick={this.toggleNav} />
      </div>
    );
  }
}

export default NavMenu;
