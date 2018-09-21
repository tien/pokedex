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

const RecursivePokeEvolution = (
  currGen: any,
  color: string,
  key: number,
  callback: (id: number | string) => void
) => {
  // tslint:disable-next-line:no-console
  console.log(currGen)
  const onClick = () => callback(currGen.id);
  if (currGen.children.length === 0) {
    return (
      <div key={key} className="poke-evo-parent" onClick={onClick}>
        <img src={currGen.imageUrl} />
        {currGen.name}
      </div>
    );
  } else {
    return (
      <div key={key} className="poke-evo-wrapper">
        <div className="poke-evo-parent" onClick={onClick}>
          <img src={currGen.imageUrl} />
          {currGen.name}
        </div>
        <Arrow style={{ fill: color, stroke: color }} />
        <div className="poke-evo-children-group">
          {currGen.children.map((child: any) =>
            RecursivePokeEvolution(child, color, key + 1, callback)
          )}
        </div>
      </div>
    );
  }
};

const PokeEvolution = (props: IPokeEvolutionProps) => (
  <GlobalContextConsumer>
    {value => {
      const openModalWithPokemonInfo = (id: number | string) => {
        value.toggleLoading();
        PokeService.getPokemonDetailsAndEvolutionChainByNameOrId(id).then(
          (details: any) => {
            value.toggleLoading();
            value.openModalWithReactNode(
              <PokeDetails {...details} />,
              PokemonTypeColors[details.types[0].type.name]
            );
          }
        );
      };
      return (
        <div className="poke-evo-tree">
          {RecursivePokeEvolution(
            props.evolutionChain,
            props.color,
            0,
            openModalWithPokemonInfo
          )}
        </div>
      );
    }}
  </GlobalContextConsumer>
);

export default PokeEvolution;
