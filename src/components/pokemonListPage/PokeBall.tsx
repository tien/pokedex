import "../../styles/PokeBall.css";

import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

interface IPokeCardProps {
  idNum: number;
  name: string;
  imageUrl: string;
}

const PokeCard = (props: IPokeCardProps) => {
  const history = useHistory();

  const goToPokemonRoute = useCallback(
    () => history.push(`/browse/${props.name}`),
    [history, props.name]
  );

  return (
    <div className="poke-ball" onClick={goToPokemonRoute}>
      <div className="poke-ball-top">
        <h3 className="poke-ball-name">{props.name}</h3>
        <h6>{props.idNum}</h6>
      </div>
      <div className="ava-wrapper">
        <img className="poke-ava" src={props.imageUrl} alt="pokemon avatar" />
      </div>
      <div className="poke-ball-bottom" />
    </div>
  );
};

export default PokeCard;
