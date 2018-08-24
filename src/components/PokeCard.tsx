import * as React from "react";
import { GlobalContextConsumer } from "../contexts/GlobalContext";
import PokeDetails from "./PokeDetails";

interface IPokeCardProps {
  idNum: number;
  name: string;
  imageUrl: string;
}

const PokeCard = (props: IPokeCardProps) => (
  <GlobalContextConsumer>
    {value => {
      const openModalWithPokemonInfo = () =>
        value.openModalWithReactNode(<PokeDetails id={props.idNum} />);
      return (
        <div
          className="card-section profile"
          onClick={openModalWithPokemonInfo}>
          <div className="profile-title">
            <img className="ava" src={props.imageUrl} />
            <h3>{props.name}</h3>
            <h6>{props.idNum}</h6>
          </div>
          <div className="profile-content">temp</div>
        </div>
      );
    }}
  </GlobalContextConsumer>
);

export default PokeCard;
