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

const RecursivePokeEvolution = (currGen: any) => (
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
          children.push(RecursivePokeEvolution(child));
        }
        return (
          <div className="poke-evo-wrapper">
            <div className="poke-evo-parent" onClick={openModalWithPokemonInfo}>
              <img src={currGen.imageUrl} />
              {currGen.name}
            </div>
            ----> <div className="poke-evo-children-group">{children}</div>
          </div>
        );
      }
    }}
  </GlobalContextConsumer>
);

const PokeEvolution = (props: IPokeEvolutionProps) => (
  <div className="poke-evo-tree">
    {RecursivePokeEvolution(props.evolutionChain)}
  </div>
);

export default PokeEvolution;
