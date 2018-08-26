import * as React from "react";
import "../../styles/PokeEvolution.css"

interface IPokeEvolutionProps {
  chain: any;
  color: string;
}

const RecursivePokeEvolution = (currGen: any) => {
  if (currGen.children.length === 0) {
    return <div>{currGen.name}</div>;
  } else {
    const children: JSX.Element[] = [];
    for (const child of currGen.children) {
      children.push(
        <div className="poke-evo-parent">
          <img src="" />{currGen.name} -> <div className="poke-evo-children-group">{RecursivePokeEvolution(child)}</div>
        </div>
      );
    }
    return children;
  }
};

const PokeEvolution = (props: IPokeEvolutionProps) => (
  <div>{RecursivePokeEvolution(props.chain)}</div>
);

export default PokeEvolution;
