import React, { useContext, forwardRef } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { GlobalContext } from "../../contexts/GlobalContext";
import * as PokeService from "../../services/pokeService";
import ToggleNavButton from "./ToggleNavButton";
import { useFocusTrap, useCombinedRefs } from "../../utils/hooks";

interface INavMenuProps {
  links: Array<string | { name: string; link: string }>;
  active: boolean;
  root?: string;
  toggleNav: () => void;
}

const NavMenu = forwardRef<HTMLDivElement, INavMenuProps>(
  ({ links, active, root, toggleNav }, ref) => {
    const history = useHistory();
    const globalContext = useContext(GlobalContext);

    const containerRef = useFocusTrap<HTMLDivElement>(active);

    const openModalWithPokemonInfo = async (e: any) => {
      if (e.key === "Enter" && e.target) {
        e.target.blur();
        globalContext.toggleLoading();

        try {
          const pokemon = await PokeService.getPokemonDetailsAndEvolutionChainByNameOrId(
            e.target.value.toLowerCase()
          );

          globalContext.toggleLoading();
          history.push(`browse/${pokemon.name}`);
        } catch {
          globalContext.openModalWithReactNode(<h1>No Pokemon found</h1>);
          globalContext.toggleLoading();
        }
      }
    };

    return (
      <div ref={useCombinedRefs(ref, containerRef)}>
        <nav id="main-nav" className={active ? "active" : ""}>
          <input
            placeholder="Enter Pokemon number or name"
            type="text"
            id="search-box"
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
                  to={`/${linkTo.trim().replace(/\s+/g, "-")}`}
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
