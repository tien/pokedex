import React, { forwardRef } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { getPokemonDetailsRoute } from "../../routes";
import {
  useCombinedRefs,
  useEnterKeyCallback,
  useFocusTrap,
  useInput
} from "../../utils/hooks";
import ToggleNavButton from "./ToggleNavButton";

interface INavMenuProps {
  links: Array<string | { name: string; link: string }>;
  active: boolean;
  toggleNav: () => void;
}

const NavMenu = forwardRef<HTMLDivElement, INavMenuProps>(
  ({ links, active, toggleNav }, ref) => {
    const history = useHistory();

    const containerRef = useFocusTrap<HTMLDivElement>(active);

    const [searchQuery, searchQueryChangeHander] = useInput("");

    const openModalWithPokemonInfo = useEnterKeyCallback(() => {
      if (searchQuery !== "") {
        history.push(getPokemonDetailsRoute(searchQuery));
      }
    }, [searchQuery]);

    return (
      <div ref={useCombinedRefs(ref, containerRef)}>
        <nav id="main-nav" className={active ? "active" : ""}>
          <input
            id="search-box"
            type="text"
            placeholder="Enter Pokemon number or name"
            value={searchQuery}
            onChange={searchQueryChangeHander}
            onKeyPress={openModalWithPokemonInfo}
          />
          {links.map(
            (link: string | { name: string; link: string }, index: number) => {
              const name = typeof link === "string" ? link : link.name;
              const linkTo = typeof link === "string" ? link : link.link;
              return (
                <NavLink
                  key={index}
                  className="nav-item"
                  exact={true}
                  onClick={toggleNav}
                  to={`/${linkTo
                    .trim()
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {name}
                </NavLink>
              );
            }
          )}
        </nav>
        <ToggleNavButton active={active} onClick={toggleNav} />
      </div>
    );
  }
);

export default NavMenu;
