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
    <figure
      className="poke-ball"
      role="button"
      tabIndex={0}
      onClick={goToPokemonRoute}
      onKeyPress={goToPokemonRoute}
    >
      <figcaption className="poke-ball-top">
        <h1 className="poke-ball-name">{props.name}</h1>
        <h2 className="poke-ball-number">{props.idNum}</h2>
      </figcaption>
      <div className="ava-wrapper">
        <img className="poke-ava" src={props.imageUrl} alt="pokemon avatar" />
      </div>
      <div className="poke-ball-bottom" />
    </figure>
  );
};

export default PokeCard;
