// import * as Color from "color";
import "../../styles/PokeBall.css";

import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface IPokeCardProps extends RouteComponentProps {
  idNum: number;
  name: string;
  imageUrl: string;
}

const PokeCard = (props: IPokeCardProps) => {
  const goToPokemonRoute = () => props.history.push(`${props.name}`);

  return (
    <div className="poke-ball" onClick={goToPokemonRoute}>
      <div className="poke-ball-top">
        <h3 className="poke-ball-name">{props.name}</h3>
        <h6>{props.idNum}</h6>
      </div>
      <div className="ava-wrapper">
        <img className="poke-ava" src={props.imageUrl} />
      </div>
      <div className="poke-ball-bottom" />
    </div>
  );
};

export default withRouter(PokeCard);
