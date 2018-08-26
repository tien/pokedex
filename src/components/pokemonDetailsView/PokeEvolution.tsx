import * as React from "react";
import "../../styles/PokeEvolution.css";

interface IPokeEvolutionProps {
  evolutionChain: any;
  color: string;
}

const RecursivePokeEvolution = (currGen: any) => {
  if (currGen.children.length === 0) {
    return (
      <div className="poke-evo-children-group">
        <img src={currGen.imageUrl} />
        {currGen.name}
      </div>
    );
  } else {
    const children: JSX.Element[] = [];
    for (const child of currGen.children) {
      children.push(
        <div className="poke-evo-wrapper">
          <div className="poke-evo-parent">
            <img src={currGen.imageUrl} />
            {currGen.name}
          </div>
          ---->
          <div className="poke-evo-children-group">
            {RecursivePokeEvolution(child)}
          </div>
        </div>
      );
    }
    return children;
  }
};

const PokeEvolution = (props: IPokeEvolutionProps) => (
  <div>{RecursivePokeEvolution(props.evolutionChain)}</div>
);

export default PokeEvolution;
