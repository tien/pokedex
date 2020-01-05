import "../../styles/PokeEvolution.css";

import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface IPokeEvolutionProps extends RouteComponentProps {
  evolutionChain: any;
  color: string;
}

const Arrow = (props: any) => (
  <svg
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
  >
    <path d="M24 16V8l16 16-16 16v-8H8V16z" />
  </svg>
);

const RecursivePokeEvolution = (
  currGen: any,
  color: string,
  key: number,
  callback: (id: number | string) => void
) => {
  const onClick = () => callback(currGen.id);
  if (currGen.children.length === 0) {
    return (
      <div key={key} className="poke-evo-parent" onClick={onClick}>
        <img src={currGen.imageUrl} />
        {currGen.name}
      </div>
    );
  } else {
    return (
      <div key={key} className="poke-evo-wrapper">
        <div className="poke-evo-parent" onClick={onClick}>
          <img src={currGen.imageUrl} />
          {currGen.name}
        </div>
        <Arrow style={{ fill: color, stroke: color }} />
        <div className="poke-evo-children-group">
          {currGen.children.map((child: any) =>
            RecursivePokeEvolution(child, color, key + 1, callback)
          )}
        </div>
      </div>
    );
  }
};

const PokeEvolution = (props: IPokeEvolutionProps) => {
  const goToPokemonRoute = (id: number | string) =>
    props.history.replace(String(id));

  return (
    <div className="poke-evo-tree">
      {RecursivePokeEvolution(
        props.evolutionChain,
        props.color,
        0,
        goToPokemonRoute
      )}
    </div>
  );
};

export default withRouter(PokeEvolution);
