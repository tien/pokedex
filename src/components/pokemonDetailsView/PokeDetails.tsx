import * as React from "react";
import "../../styles/PokeDetails.css";
import PokeStats from "./PokeStats";

enum pokemonTypeColors {
  normal = "A8A77A",
  fire = "#EE8130",
  water = "#6390F0",
  electric = "#F7D02C",
  grass = "#7AC74C",
  ice = "#96D9D6",
  fighting = "#C22E28",
  poison = "#A33EA1",
  ground = "#E2BF65",
  flying = "#A98FF3",
  psychic = "#F95587",
  bug = "#A6B91A",
  rock = "#B6A136",
  ghost = "#735797",
  dragon = "#6F35FC",
  dark = "#705746",
  steel = "#B7B7CE",
  fairy = "#D685AD"
}

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

const PokeDetails = (props: IPokeDetailsProps) => (
  <div className="poke-details-container">
    <div
      className="details-modal-header"
      style={{ backgroundColor: pokemonTypeColors[props.types[0].type.name] }}>
      <h2>{props.name}</h2>
    </div>
    <div className="details-modal-content">
      <div className="details-header">
        <img src={props.sprites.front_default} />
        {props.types.map((type: any) => (
          <div
            style={{ color: pokemonTypeColors[type.type.name] }}
            className={`${type.type.name}-type`}>
            {type.type.name}
          </div>
        ))}
        <div>{props.id}</div>
        <PokeStats stats={props.stats} />
      </div>
      <div>{props.height}</div>
      <div>{props.weight}</div>
      <div>{props.name}</div>
      {/* <div>{this.state.evolutionChain}</div> */}
      {/* <div>{this.state.moves}</div> */}
    </div>
  </div>
);

export default PokeDetails;
