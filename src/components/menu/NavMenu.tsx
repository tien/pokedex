import React from "react";
import { NavLink } from "react-router-dom";

import PokemonTypeColor, {
  PokemonTypeColorAlias
} from "../../assets/PokemonTypeColors";
import { GlobalContextConsumer } from "../../contexts/GlobalContext";
import PokeService from "../../services/pokeService";
import PokeDetails from "../pokemonDetailsView/PokeDetails";
import ToggleNavButton from "./ToggleNavButton";

interface INavMenuProps {
  links: Array<string | { name: string; link: string }>;
  root?: string;
  active: boolean;
  toggleNav: () => void;
}

const NavMenu = (props: INavMenuProps) => (
  <GlobalContextConsumer>
    {value => {
      const openModalWithPokemonInfo = (e: any) => {
        if (e.key === "Enter" && e.target) {
          e.target.blur();
          value.toggleLoading();
          PokeService.getPokemonDetailsAndEvolutionChainByNameOrId(
            e.target.value.toLowerCase()
          )
            .then((details: any) => {
              value.toggleLoading();
              value.openModalWithReactNode(
                <PokeDetails {...details} />,
                PokemonTypeColor[
                  details.types[0].type.name as PokemonTypeColorAlias
                ]
              );
            })
            .catch((error: Error) => {
              value.openModalWithReactNode(<h1>No Pokemon found</h1>);
              value.toggleLoading();
            });
        }
      };
      return (
        <div>
          <nav id="main-nav" className={props.active ? "active" : ""}>
            <input
              placeholder="Enter Pokemon number or name"
              type="text"
              id="search-box"
              onKeyPress={openModalWithPokemonInfo}
            />
            {props.links.map(
              (
                link: string | { name: string; link: string },
                index: number
              ) => {
                const name = typeof link === "string" ? link : link.name;
                const linkTo = typeof link === "string" ? link : link.link;
                return (
                  <NavLink
                    exact={true}
                    onClick={props.toggleNav}
                    className="nav-item"
                    key={index}
                    to={`/${linkTo.trim().replace(/\s+/g, "-")}`}
                  >
                    {name}
                  </NavLink>
                );
              }
            )}
          </nav>
          <ToggleNavButton active={props.active} onClick={props.toggleNav} />
        </div>
      );
    }}
  </GlobalContextConsumer>
);

export default NavMenu;
