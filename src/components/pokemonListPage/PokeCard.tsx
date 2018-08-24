import * as React from "react";
import { GlobalContextConsumer } from "../../contexts/GlobalContext";
import PokeService from "../../services/pokeService";
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
          {
            // tslint:disable-next-line:no-console
            console.log(details)
            value.openModalWithReactNode(<PokeDetails {...details} />)}
        );

      return (
        <div
          className="card-section profile"
          onClick={openModalWithPokemonInfo}>
          <div className="profile-title">
            <img className="ava" src={props.imageUrl} />
            <h3>{props.name}</h3>
            <h6>{props.idNum}</h6>
          </div>
          <div className="profile-content" />
        </div>
      );
    }}
  </GlobalContextConsumer>
);

export default PokeCard;
