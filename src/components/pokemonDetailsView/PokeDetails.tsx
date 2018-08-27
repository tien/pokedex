import * as Color from "color";
import * as React from "react";
import * as MovesList from "../../assets/moves.json";
import PokemonTypeColors from "../../assets/PokemonTypeColors";
import "../../styles/PokeDetails.css";
import PokeEvolution from "./PokeEvolution";
import PokeStats from "./PokeStats";
import PokeTypeCard from "./PokeTypeCard";

interface IPokeDetailsProps {
  abilities: [];
  evolutionChain: [];
  height: number;
  id: number;
  moves: [];
  name: string;
  types: any[];
  sprites: any;
  stats: [];
  weight: number;
}

const PokeDetails = (props: IPokeDetailsProps) => {
  const lightColor = PokemonTypeColors[props.types[0].type.name];
  const darkColor = Color(lightColor)
    .darken(0.35)
    .string();
  return (
    <div className="poke-details-container" style={{ borderColor: darkColor }}>
      <div
        className="details-modal-header"
        style={{
          backgroundColor: darkColor
        }}>
        <h2>{props.name}</h2>
      </div>
      <div className="details-modal-content">
        <div className="details-1st-child">
          <img src={props.sprites.front_default} />
          <div className="poke-number-details">Number: #{props.id}</div>
          <div className="poke-types-details">
            {props.types.map((type: any) => (
              <div
                style={{ color: PokemonTypeColors[type.type.name] }}
                className="poke-type">
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
        <div className="details-2nd-child">
          <PokeStats stats={props.stats} color={lightColor} />
        </div>
        <div className="details-3rd-child">
          <div
            className="details-section-header"
            style={{ backgroundColor: darkColor }}>
            Profile
          </div>
          <div>Height: {props.height}m</div>
          <div>
            Weight: {props.weight}
            kg
          </div>
          <div
            className="details-section-header"
            style={{ backgroundColor: darkColor }}>
            Evolution
          </div>
          <PokeEvolution
            evolutionChain={props.evolutionChain}
            color={darkColor}
          />
          <div
            className="details-section-header"
            style={{ backgroundColor: darkColor }}>
            Moves
          </div>
          <div className="poke-moves-detail-list">
            {props.moves.map((move: any) => (
              <div className="poke-move-detail">
                <div className="poke-move-name">{move.move.name}</div>
                <PokeTypeCard
                  type={MovesList[move.move.name].type}
                  style={{ flexBasis: "25%", marginRight: "2px" }}
                />
                <PokeTypeCard
                  category={MovesList[move.move.name].category}
                  style={{ flexBasis: "25%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeDetails;
