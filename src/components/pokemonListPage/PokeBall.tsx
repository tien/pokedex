// import * as Color from "color";
import * as React from "react";
import { GlobalContextConsumer } from "../../contexts/GlobalContext";
import PokemonTypeColor from "../../enums/PokemonTypeColors";
import PokeService from "../../services/pokeService";
import "../../styles/PokeBall.css"
import PokeDetails from "../pokemonDetailsView/PokeDetails";

interface IPokeCardProps {
  idNum: number;
  name: string;
  imageUrl: string;
}

const PokeCard = (props: IPokeCardProps) => (
  <GlobalContextConsumer>
    {value => {
      const openModalWithPokemonInfo = () =>
        PokeService.getPokemonByNameOrId(props.idNum).then((details: any) =>
          value.openModalWithReactNode(
            <PokeDetails {...details} />,
            PokemonTypeColor[details.types[0].type.name]
          )
        );

      return (
        <div className="poke-ball" onClick={openModalWithPokemonInfo}>
          <div className="poke-ball-top">
            <h3 className="poke-ball-name">{props.name}</h3>
            <h6>{props.idNum}</h6>
          </div>
          <div className="ava-wrapper">
            <img
              className="poke-ava"
              src={props.imageUrl}
            />
          </div>
          <div className="poke-ball-bottom" />
        </div>
      );
    }}
  </GlobalContextConsumer>
);

export default PokeCard;
