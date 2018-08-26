import * as React from "react";
import { NavLink } from "react-router-dom";
import PokemonTypeColor from "../../assets/PokemonTypeColors";
import { GlobalContextConsumer } from "../../contexts/GlobalContext";
import PokeService from "../../services/pokeService";
import PokeDetails from "../pokemonDetailsView/PokeDetails";
import ToggleNavButton from "./ToggleNavButton";

interface INavMenuProps {
  links: string[];
  active: boolean;
  toggleNav: () => void;
}

const NavMenu = (props: INavMenuProps) => (
  <GlobalContextConsumer>
    {value => {
      const openModalWithPokemonInfo = (e: any) => {
        if (e.key === "Enter" && e.target) {
          value.toggleLoading();
          PokeService.getPokemonDetailsAndEvolutionChainByNameOrId(
            e.target.value.toLowerCase()
          )
            .then((details: any) => {
              value.toggleLoading();
              value.openModalWithReactNode(
                <PokeDetails {...details} />,
                PokemonTypeColor[details.types[0].type.name]
              );
            })
            .catch(
              (error: Error) =>
                (error.message === "404 Not Found" &&
                  alert("No pokemon found")) ||
                value.toggleLoading()
            );
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
    }}
  </GlobalContextConsumer>
);

export default NavMenu;
