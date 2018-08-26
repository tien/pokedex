import * as React from "react";
import PokemonTypeColors from "../../assets/PokemonTypeColors";
import { GlobalContextConsumer } from "../../contexts/GlobalContext";
import PokeService from "../../services/pokeService";
import "../../styles/PokeEvolution.css";
import PokeDetails from "./PokeDetails";

interface IPokeEvolutionProps {
  evolutionChain: any;
  color: string;
}

const Arrow = (props: any) => (
  <svg
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48">
    <path d="M24 16V8l16 16-16 16v-8H8V16z" />
  </svg>
);

const RecursivePokeEvolution = (currGen: any, color: string) => (
  <GlobalContextConsumer>
    {value => {
      const openModalWithPokemonInfo = () => {
        value.toggleLoading();
        PokeService.getPokemonDetailsAndEvolutionChainByNameOrId(
          currGen.name
        ).then((details: any) => {
          value.toggleLoading();
          value.openModalWithReactNode(
            <PokeDetails {...details} />,
            PokemonTypeColors[details.types[0].type.name]
          );
        });
      };
      if (currGen.children.length === 0) {
        return (
          <div className="poke-evo-children-group">
            <div className="poke-evo-parent" onClick={openModalWithPokemonInfo}>
              <img src={currGen.imageUrl} />
              {currGen.name}
            </div>
          </div>
        );
      } else {
        const children: JSX.Element[] = [];
        for (const child of currGen.children) {
          children.push(RecursivePokeEvolution(child, color));
        }
        return (
          <div className="poke-evo-wrapper">
            <div className="poke-evo-parent" onClick={openModalWithPokemonInfo}>
              <img src={currGen.imageUrl} />
              {currGen.name}
            </div>
            <Arrow style={{ fill: color, stroke: color }} />
            <div className="poke-evo-children-group">{children}</div>
          </div>
        );
      }
    }}
  </GlobalContextConsumer>
);

const PokeEvolution = (props: IPokeEvolutionProps) => (
  <div className="poke-evo-tree">
    {RecursivePokeEvolution(props.evolutionChain, props.color)}
  </div>
);

export default PokeEvolution;
