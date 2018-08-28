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
  captureRate: number;
  evolutionChain: [];
  genderRate: number;
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
  const femaleRate = parseFloat(
    ((props.genderRate * 100) / 8).toFixed(2)
  ).toString();
  const maleRate = parseFloat(
    (100 - parseFloat(femaleRate)).toFixed(2)
  ).toString();
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
            {props.types.map((type: any, index: number) => (
              <div
                key={index}
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
          <div className="details-profile">
            <div>
              <div>Height: {Math.round(props.height * 10) / 100}m</div>
              <div>
                Weight: {Math.round(props.weight * 10) / 100}
                kg
              </div>
              <div>
                Abilities:{" "}
                {props.abilities
                  .map((ability: any) => ability.ability.name)
                  .join(", ")}
              </div>
            </div>
            <div>
              <div>
                Capture rate:{" "}
                {parseFloat(
                  ((props.captureRate * 100) / 255).toFixed(2)
                ).toString()}
                %
              </div>
              <div>
                Gender rate:{" "}
                <span className="one-liner">
                  {femaleRate}% {"\u2640"}
                </span>{" "}
                <span className="one-liner">
                  {maleRate}% {"\u2642"}
                </span>
              </div>
            </div>
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
            {props.moves.map((move: any, index: number) => (
              <div key={index} className="poke-move-detail">
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
