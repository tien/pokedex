import "../../styles/PokeDetails.css";

import Color from "color";
import React from "react";
import { Helmet } from "react-helmet";

import MovesList from "../../assets/moves.json";
import PokemonTypeColors, {
  PokemonTypeColorAlias
} from "../../assets/PokemonTypeColors";
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
  flavourText: string;
  types: any[];
  sprites: any;
  stats: [];
  weight: number;
}

const PokeDetails = (props: IPokeDetailsProps) => {
  const lightColor =
    PokemonTypeColors[
      props.types[0].type.name as keyof typeof PokemonTypeColors
    ];

  const darkColor = Color(lightColor)
    .darken(0.35)
    .hex();

  let genderRate;
  switch (props.genderRate) {
    case -1:
      genderRate = "N/A";
      break;
    case 0:
      genderRate = "0%\u2640 100%\u2642";
      break;
    default:
      const female = Math.round(props.genderRate * 1250) / 100;
      const male = 100 - female;
      genderRate = `${female}%\u2640 ${male}%\u2642`;
  }

  return (
    <>
      <Helmet>
        <title>
          {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
        </title>
        <meta name="theme-color" content={lightColor} />
      </Helmet>
      <article
        className="poke-details-container"
        style={{ borderColor: darkColor }}
      >
        <header
          className="details-modal-header"
          style={{
            backgroundColor: darkColor
          }}
        >
          <h2>{props.name}</h2>
        </header>
        <section className="details-modal-content">
          <section className="details-overview-and-stats">
            <figure className="details-profile-overview">
              <img src={props.sprites.front_default} alt="pokemon avatar" />
              <figcaption className="poke-number-details">
                Number: #{props.id}
              </figcaption>
              <figcaption className="poke-types-details">
                {props.types.map((type: any, index: number) => (
                  <span
                    key={index}
                    style={{
                      color:
                        PokemonTypeColors[
                          type.type.name as PokemonTypeColorAlias
                        ]
                    }}
                    className="poke-type"
                  >
                    {type.type.name}
                  </span>
                ))}
              </figcaption>
            </figure>
            <PokeStats
              className="details-stats"
              stats={props.stats}
              color={lightColor}
            />
          </section>
          <section
            className="poke-bio"
            style={{
              fontFamily: "Montserrat",
              textAlign: "justify",
              padding: "0 10px"
            }}
          >
            <p>{props.flavourText}</p>
          </section>
          <section>
            <header
              className="details-section-header"
              style={{ backgroundColor: darkColor }}
            >
              Profile
            </header>
            <section className="details-profile">
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
                  Capture rate: {Math.round(props.captureRate * 100) / 100}%
                </div>
                <div>
                  Gender rate: <span className="one-liner">{genderRate}</span>
                </div>
              </div>
            </section>
          </section>
          <section>
            <header
              className="details-section-header"
              style={{ backgroundColor: darkColor }}
            >
              Evolution
            </header>
            <PokeEvolution
              evolutionChain={props.evolutionChain}
              color={darkColor}
            />
          </section>
          <section>
            <header
              className="details-section-header"
              style={{ backgroundColor: darkColor }}
            >
              Moves
            </header>
            <ul className="poke-moves-detail-list">
              {props.moves.map((move: any, index: number) => (
                <li key={index} className="poke-move-detail">
                  <div className="poke-move-name">{move.move.name}</div>
                  <PokeTypeCard
                    //@ts-ignore
                    type={
                      MovesList[move.move.name as keyof typeof MovesList].type
                    }
                    style={{ flexBasis: "25%", marginRight: "2px" }}
                  />
                  <PokeTypeCard
                    category={
                      MovesList[move.move.name as keyof typeof MovesList]
                        .category as "physical" | "special" | "status"
                    }
                    style={{ flexBasis: "25%" }}
                  />
                </li>
              ))}
            </ul>
          </section>
        </section>
      </article>
    </>
  );
};

export default PokeDetails;
