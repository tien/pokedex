import * as React from "react";
import PokemonTypeColors from "../../assets/PokemonTypeColors";
import "../../styles/PokeTypeCard.css";

interface IPokeTypeCardProps {
  type: string;
  style?: any;
}

const PokeTypeCard = (props: IPokeTypeCardProps) => (
  <div
    className="poke-type-card"
    style={{
      backgroundColor: PokemonTypeColors[props.type],
      ...props.style
    }}>
    {props.type}
  </div>
);

export default PokeTypeCard;
